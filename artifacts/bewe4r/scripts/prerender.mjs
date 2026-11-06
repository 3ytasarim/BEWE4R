/**
 * Static site generation. Runs after `vite build` (client -> dist/public) and `vite build --ssr` (dist/server):
 * renders every public route with the same React app and writes real HTML files:
 *
 *   dist/public/index.html, dist/public/<route>/index.html   pages with content, head tags and JSON-LD
 *   dist/public/404.html                                      real 404 page (noindex)
 *   dist/public/admin/index.html                              empty SPA shell for the admin panel (noindex)
 *   dist/public/sitemap.xml                                   generated from the route list
 *   dist/redirects.nginx.conf                                 301s for duplicate URLs (include it in nginx)
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const appRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(appRoot, "dist/public");
const serverEntry = path.join(appRoot, "dist/server/entry-server.js");

if (!fs.existsSync(serverEntry)) throw new Error(`Missing ${serverEntry}. Run "vite build --ssr src/entry-server.tsx --outDir dist/server" first.`);

const { render, preloadPath, resolveSeo, headTags, getSitemapEntries, ALIASES, SITE_URL } = await import(pathToFileURL(serverEntry).href);

const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
for (const marker of ["<!--seo-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) throw new Error(`index.html template is missing ${marker}`);
}

const problems = [];

function writeFile(relFile, content) {
  const file = path.join(outDir, relFile);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/** Width/height of a PNG, JPEG or WebP from its header (no image library needed). */
function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      i += m === 0xd8 || (m >= 0xd0 && m <= 0xd7) || m === 0x01 || m === 0xff ? 2 : 2 + buf.readUInt16BE(i + 2);
    }
    return null;
  }
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (kind === "VP8L") { const b = buf.readUInt32LE(21); return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 }; }
    if (kind === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
  }
  return null;
}

const sizeCache = new Map();
function sizeOfSrc(src) {
  if (sizeCache.has(src)) return sizeCache.get(src);
  let size = null;
  try {
    if (src.startsWith("data:image/")) size = imageSize(Buffer.from(src.slice(src.indexOf(",") + 1), "base64"));
    else if (src.startsWith("/")) size = imageSize(fs.readFileSync(path.join(outDir, src.split(/[?#]/)[0])));
  } catch {
    /* missing file or unsupported format: leave the tag as it is */
  }
  sizeCache.set(src, size);
  return size;
}

/** Adds intrinsic width/height to every <img> that lacks them, so images never shift the layout while loading. */
function addImageDimensions(html) {
  return html.replace(/<img\b[^>]*>/g, (tag) => {
    if (/\swidth=/.test(tag) && /\sheight=/.test(tag)) return tag;
    const src = (tag.match(/\ssrc="([^"]*)"/) || [])[1];
    const size = src && sizeOfSrc(src);
    return size ? tag.replace("<img", `<img width="${size.w}" height="${size.h}"`) : tag;
  });
}

function pageHtml(appHtml, seo) {
  return addImageDimensions(template.replace("<!--seo-head-->", () => headTags(seo)).replace("<!--app-html-->", () => appHtml));
}

async function renderRoute(urlPath) {
  await preloadPath(urlPath);
  const appHtml = await render(urlPath);
  const seo = await resolveSeo(urlPath);
  const h1 = (appHtml.match(/<h1[\s>]/g) || []).length;
  const mains = (appHtml.match(/<main[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${urlPath}: expected 1 <h1>, found ${h1}`);
  if (mains > 1) problems.push(`${urlPath}: found ${mains} <main> elements`);
  return { appHtml, seo, h1 };
}

const entries = getSitemapEntries();
const rows = [];

for (const entry of entries) {
  const { appHtml, seo } = await renderRoute(entry.path);
  if (!seo.canonical) problems.push(`${entry.path}: no canonical (page would be treated as not found)`);
  const relFile = entry.path === "/" ? "index.html" : path.join(entry.path.slice(1), "index.html");
  writeFile(relFile, pageHtml(appHtml, seo));
  rows.push([entry.path, seo.title.length, seo.description.length, Math.round(appHtml.length / 1024) + " KB"]);
}

// Real 404 page: the app's NotFound route, noindex, no canonical.
{
  const { appHtml, seo } = await renderRoute("/__not-found__");
  writeFile("404.html", pageHtml(appHtml, seo));
}

// Admin: no prerendered content, the SPA takes over. Not indexable.
{
  const seo = await resolveSeo("/admin");
  writeFile(path.join("admin", "index.html"), pageHtml("", seo));
}

// sitemap.xml
function lastmodFor(entry) {
  if (entry.lastmod) return entry.lastmod;
  if (entry.source) {
    try {
      const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", entry.source], { cwd: appRoot, encoding: "utf8" }).trim();
      if (out) return out;
    } catch {
      /* not a git checkout: fall back below */
    }
  }
  return new Date().toISOString().slice(0, 10);
}
const urls = entries
  .map((e) => `  <url><loc>${SITE_URL}${e.path === "/" ? "/" : e.path}</loc><lastmod>${lastmodFor(e)}</lastmod></url>`)
  .join("\n");
writeFile("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

// nginx include: one permanent redirect per duplicate URL
const redirects = Object.entries(ALIASES)
  .map(([from, to]) => `location = ${from} { return 301 ${to}; }`)
  .join("\n");
fs.writeFileSync(path.join(appRoot, "dist", "redirects.nginx.conf"), `# generated by scripts/prerender.mjs\n${redirects}\n`);

console.log("\nPrerendered pages:");
console.log("path".padEnd(42), "title".padEnd(6), "desc".padEnd(6), "html");
for (const [p, t, d, s] of rows) console.log(p.padEnd(42), String(t).padEnd(6), String(d).padEnd(6), s);
console.log(`\n+ 404.html, admin/index.html, sitemap.xml (${entries.length} URLs), redirects.nginx.conf (${Object.keys(ALIASES).length} redirects)`);

if (problems.length) {
  console.error("\nSEO build problems:\n - " + problems.join("\n - "));
  process.exit(1);
}
