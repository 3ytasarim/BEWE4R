import { ADMIN_SEO, ALIASES, NOT_FOUND_SEO, staticSeo } from "./pages";
import { normalizePath } from "./site";
import type { SeoData } from "./types";

/**
 * SEO data for any URL. Blog data is loaded lazily so the blog texts stay out of the main bundle on the client
 * (the blog route chunk loads the same module anyway).
 */
export async function resolveSeo(rawPath: string): Promise<SeoData> {
  const path = normalizePath(rawPath);

  if (path === "/admin" || path.startsWith("/admin/")) return ADMIN_SEO;

  if (path === "/blog" || path.startsWith("/blog/")) {
    const { getBlogSeo } = await import("./blogSeo");
    return getBlogSeo(path) ?? NOT_FOUND_SEO;
  }

  // A duplicate URL shows the same page as its target; its canonical points at the target.
  return staticSeo(ALIASES[path] ?? path) ?? NOT_FOUND_SEO;
}
