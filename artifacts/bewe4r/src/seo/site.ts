/** Canonical host: every URL, sitemap entry, canonical and Open Graph URL uses this origin. */
export const SITE_URL = "https://www.bewe4r.com";
export const SITE_NAME = "BEWE4R";
export const SITE_LOCALE = "en_US";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/opengraph.jpg`,
  width: 1280,
  height: 720,
  alt: "BEWE4R - premium clothing manufacturing from Istanbul",
};

export const LOGO_URL = `${SITE_URL}/images/bewe4r-logo.png`;

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/** "/blog/" -> "/blog", "/a?b#c" -> "/a", "" -> "/" */
export function normalizePath(raw: string): string {
  const clean = (raw.split(/[?#]/)[0] ?? "").replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}
