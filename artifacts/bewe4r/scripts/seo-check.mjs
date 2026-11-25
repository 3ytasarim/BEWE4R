// Validates the prerendered HTML in dist/public WITHOUT running any JavaScript.
// Run after a build:  pnpm --filter @workspace/bewe4r test:seo
// Exits with code 1 when any check fails.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://www.bewe4r.com";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist/public");
if (!fs.existsSync(root)) {
  console.error(`No build output at ${root}. Run the build first.`);
  process.exit(1);
}

// route -> html
const pages = {};
(function walk(dir, rel) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name !== "assets") walk(full, `${rel}/${name}`);
    } else if (name.endsWith(".html")) {
      pages[`${rel}/${name}`.replace(/\/index\.html$/, "") || "/"] = fs.readFileSync(full, "utf8");
    }
  }
})(root, "");

const publicRoutes = Object.keys(pages).filter((p) => !["/404.html", "/admin"].includes(p));
const results = [];
const check = (name, ok, detail = "") => results.push({ name, ok, detail });
const first = (s, re) => (s.match(re) || [])[1];
const count = (s, re) => (s.match(re) || []).length;

const titles = {};
const descs = {};
const issues = { h1: [], canon: [], og: [], lang: [], ld: [], robots: [], viewport: [], alt: [], dims: [], mixed: [], ogimg: [], title: [], desc: [] };

for (const p of publicRoutes) {
  const html = pages[p];
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  const expected = SITE + (p === "/" ? "/" : p);

  const title = first(head, /<title>([^<]*)<\/title>/);
  const desc = first(head, /<meta name="description" content="([^"]*)"/);
  (titles[title] ||= []).push(p);
  (descs[desc] ||= []).push(p);
  if (!title || title.length > 70) issues.title.push(`${p}:${(title || "").length}`);
  if (!desc || desc.length < 40 || desc.length > 175) issues.desc.push(`${p}:${(desc || "").length}`);

  if (first(head, /rel="canonical" href="([^"]*)"/) !== expected) issues.canon.push(p);
  if (first(head, /property="og:url" content="([^"]*)"/) !== expected) issues.og.push(`${p} og:url`);
  if (!/^https:\/\//.test(first(head, /property="og:image" content="([^"]*)"/) || "")) issues.ogimg.push(p);
  for (const k of ["og:title", "og:description", "og:type"]) if (!head.includes(`property="${k}"`)) issues.og.push(`${p} ${k}`);
  for (const k of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) if (!head.includes(`name="${k}"`)) issues.og.push(`${p} ${k}`);

  if (!/<html lang="en"/.test(html)) issues.lang.push(p);
  if (!/<meta name="robots" content="index, follow/.test(head)) issues.robots.push(p);
  if (/maximum-scale|user-scalable=no/i.test(head)) issues.viewport.push(p);

  const h1 = count(body, /<h1[\s>]/g);
  const mains = count(body, /<main[\s>]/g);
  if (h1 !== 1 || mains !== 1) issues.h1.push(`${p} h1=${h1} main=${mains}`);
  if (/<article[\s\S]*<article/.test(body)) issues.h1.push(`${p} nested article`);

  const blocks = [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!blocks.length && (p === "/" || p.startsWith("/blog"))) issues.ld.push(`${p} none`);
  for (const m of blocks) {
    try {
      JSON.parse(m[1]);
    } catch {
      issues.ld.push(`${p} invalid json`);
    }
  }

  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt=/.test(m[0])) issues.alt.push(p);
    if (!(/\swidth=/.test(m[0]) && /\sheight=/.test(m[0]))) issues.dims.push(p);
  }
  if (/(src|href)="http:\/\//.test(html)) issues.mixed.push(p);
}

const dupTitles = Object.values(titles).filter((v) => v.length > 1);
const dupDescs = Object.values(descs).filter((v) => v.length > 1);
const uniq = (a) => [...new Set(a)].join(", ");

check(`Real HTML on every public route, no empty root (${publicRoutes.length} routes)`, publicRoutes.every((p) => pages[p].length > 20000 && !/<div id="root"><\/div>/.test(pages[p])));
check("Exactly one <h1> and one <main>, no nested <article>", !issues.h1.length, issues.h1.join("; "));
check("Unique <title> (max 70 chars)", !dupTitles.length && !issues.title.length, JSON.stringify(dupTitles) + issues.title.join(","));
check("Unique meta description (40-175 chars)", !dupDescs.length && !issues.desc.length, issues.desc.join(",") + JSON.stringify(dupDescs));
check("Self-referencing canonical and matching og:url, full OG + Twitter tags", !issues.canon.length && !issues.og.length, issues.canon.concat(issues.og).slice(0, 5).join("; "));
check("OG images are absolute HTTPS", !issues.ogimg.length, issues.ogimg.join(","));
check('<html lang="en">', !issues.lang.length, issues.lang.join(","));
check("Public pages are index,follow", !issues.robots.length, issues.robots.join(","));
check("Viewport does not block zoom", !issues.viewport.length, issues.viewport.join(","));
check("JSON-LD present in the first HTML and valid JSON", !issues.ld.length, issues.ld.join(","));
check("Every <img> has an alt attribute", !issues.alt.length, uniq(issues.alt));
check("Every <img> has width and height", !issues.dims.length, uniq(issues.dims));
check("No http:// (mixed content) references", !issues.mixed.length, issues.mixed.join(","));

const types = (p) => [...pages[p].matchAll(/"@type":"(\w+)"/g)].map((m) => m[1]);
const posts = publicRoutes.filter((p) => p.startsWith("/blog/"));
check("Home: Organization + WebSite schema", ["Organization", "WebSite"].every((t) => types("/").includes(t)));
check("/blog: Blog + BreadcrumbList schema", ["Blog", "BreadcrumbList"].every((t) => types("/blog").includes(t)));
check(`Blog posts (${posts.length}): BlogPosting + BreadcrumbList`, posts.length > 0 && posts.every((p) => ["BlogPosting", "BreadcrumbList"].every((t) => types(p).includes(t))));
const required = ["headline", "description", "image", "datePublished", "dateModified", "author", "publisher", "mainEntityOfPage", "url", "inLanguage"];
const missingFields = posts.flatMap((p) => {
  const m = pages[p].match(/<script type="application\/ld\+json"[^>]*>(\{[^<]*"@type":"BlogPosting"[^<]*)<\/script>/);
  const data = m ? JSON.parse(m[1]) : {};
  return required.filter((k) => !data[k]).concat(data.publisher?.logo ? [] : ["publisher.logo"]).map((k) => `${p}:${k}`);
});
check("BlogPosting has all required fields and a publisher logo", !missingFields.length, missingFields.join(","));
check("Blog dates use <time datetime>", posts.every((p) => /<time datetime="|<time dateTime="/.test(pages[p])));
check("Blog posts have a visible breadcrumb and Related articles", posts.every((p) => /aria-label="Breadcrumb"/.test(pages[p]) && /id="related-articles"/.test(pages[p])));

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const smPaths = locs.map((l) => l.replace(SITE, "") || "/");
check(`Sitemap is a valid urlset with absolute HTTPS URLs (${locs.length})`, /<urlset/.test(sitemap) && locs.every((l) => l.startsWith(SITE)));
check("Sitemap lists only real pages, no duplicates", smPaths.every((p) => pages[p]) && new Set(locs).size === locs.length, smPaths.filter((p) => !pages[p]).join(","));
check("Sitemap lists every public page, valid lastmod", publicRoutes.every((p) => smPaths.includes(p)) && [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].every((m) => /^\d{4}-\d{2}-\d{2}$/.test(m[1])), publicRoutes.filter((p) => !smPaths.includes(p)).join(","));

const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
const bots = ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "Claude-SearchBot", "Claude-User", "ClaudeBot", "Google-Extended", "Googlebot"];
check("robots.txt names the AI/search bots and points to the sitemap", bots.every((b) => robots.includes(`User-agent: ${b}`)) && robots.includes(`Sitemap: ${SITE}/sitemap.xml`), bots.filter((b) => !robots.includes(b)).join(","));
check("robots.txt disallows /admin", /Disallow: \/admin/.test(robots));
check("404.html is noindex, has no canonical, has an <h1>", /noindex/.test(pages["/404.html"]) && !/rel="canonical"/.test(pages["/404.html"]) && /<h1/.test(pages["/404.html"]));
check("Admin shell is noindex with an empty root (no private content)", /noindex/.test(pages["/admin"]) && /<div id="root"><\/div>/.test(pages["/admin"]));

// Internal links: no broken links, no orphans
const out = {};
for (const p of publicRoutes) {
  const body = pages[p].slice(pages[p].indexOf("<body"));
  out[p] = new Set([...body.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)].map((m) => m[1].split(/[#?]/)[0].replace(/\/+$/, "") || "/").filter((t) => t !== p && !t.startsWith("/assets")));
}
const broken = new Set();
for (const set of Object.values(out)) for (const t of set) if (!pages[t] && t !== "/admin" && !/\.(xml|txt)$/.test(t)) broken.add(t);
const reach = new Set(["/"]);
for (const queue = ["/"]; queue.length; ) for (const t of out[queue.shift()] || []) if (pages[t] && !reach.has(t)) (reach.add(t), queue.push(t));
check("No broken internal links", !broken.size, [...broken].join(","));
// Pages that are deliberately not linked from anywhere (still reachable by direct URL). Keep this list short.
const UNLINKED_ON_PURPOSE = ["/e-catalog"];
const orphans = publicRoutes.filter((p) => !reach.has(p) && !UNLINKED_ON_PURPOSE.includes(p));
check("Every public page is reachable from the home page", !orphans.length, orphans.join(","));

for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : `\n      -> ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
