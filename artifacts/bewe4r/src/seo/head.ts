import { SITE_LOCALE, SITE_NAME } from "./site";
import type { SeoData } from "./types";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** JSON for a <script> body: "<" is escaped so the data can never close the tag. */
const jsonForScript = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

type MetaEntry = { attr: "name" | "property"; key: string; content: string };

function metaEntries(seo: SeoData): MetaEntry[] {
  const m: MetaEntry[] = [
    { attr: "name", key: "description", content: seo.description },
    { attr: "name", key: "robots", content: seo.robots },
    { attr: "property", key: "og:type", content: seo.ogType },
    { attr: "property", key: "og:site_name", content: SITE_NAME },
    { attr: "property", key: "og:locale", content: SITE_LOCALE },
    { attr: "property", key: "og:title", content: seo.title },
    { attr: "property", key: "og:description", content: seo.description },
    { attr: "property", key: "og:image", content: seo.ogImage.url },
    { attr: "name", key: "twitter:card", content: "summary_large_image" },
    { attr: "name", key: "twitter:title", content: seo.title },
    { attr: "name", key: "twitter:description", content: seo.description },
    { attr: "name", key: "twitter:image", content: seo.ogImage.url },
  ];
  if (seo.canonical) m.push({ attr: "property", key: "og:url", content: seo.canonical });
  if (seo.ogImage.width) m.push({ attr: "property", key: "og:image:width", content: String(seo.ogImage.width) });
  if (seo.ogImage.height) m.push({ attr: "property", key: "og:image:height", content: String(seo.ogImage.height) });
  if (seo.ogImage.alt) {
    m.push({ attr: "property", key: "og:image:alt", content: seo.ogImage.alt });
    m.push({ attr: "name", key: "twitter:image:alt", content: seo.ogImage.alt });
  }
  return m;
}

/** Server side: the tags that go into <head> of the first HTML response. */
export function headTags(seo: SeoData): string {
  const lines = [`<title>${esc(seo.title)}</title>`];
  for (const e of metaEntries(seo)) lines.push(`<meta ${e.attr}="${e.key}" content="${esc(e.content)}" />`);
  if (seo.canonical) lines.push(`<link rel="canonical" href="${esc(seo.canonical)}" />`);
  for (const ld of seo.jsonLd) lines.push(`<script type="application/ld+json" data-seo-ld>${jsonForScript(ld)}</script>`);
  return lines.join("\n    ");
}

/** Client side: keeps the head in sync after in-app navigation (same values as the server wrote). */
export function applySeoToDocument(seo: SeoData) {
  if (typeof document === "undefined") return;
  document.title = seo.title;

  for (const e of metaEntries(seo)) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${e.attr}="${e.key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(e.attr, e.key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", e.content);
  }

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (seo.canonical) {
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = seo.canonical;
  } else if (link) {
    link.remove();
  }

  document.head.querySelectorAll("script[data-seo-ld]").forEach((n) => n.remove());
  for (const ld of seo.jsonLd) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-seo-ld", "");
    s.text = jsonForScript(ld);
    document.head.appendChild(s);
  }
}
