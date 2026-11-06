import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";
import "./i18n";
import { BLOG_POSTS } from "./data/blogPosts";
import { preloadPath } from "./router/pages";
import { ALIASES, PAGE_SEO } from "./seo/pages";
import { headTags } from "./seo/head";
import { resolveSeo } from "./seo/resolve";
import { SITE_URL } from "./seo/site";

/** Used by scripts/prerender.mjs (build time only; never part of the browser bundle). */
export { preloadPath, resolveSeo, headTags, ALIASES, SITE_URL };

/**
 * Renders a route to a complete HTML string. Any error thrown while rendering fails the build instead of being
 * swallowed into a Suspense fallback (which would silently ship an empty page).
 */
export function render(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const errors: unknown[] = [];
    let html = "";
    const { pipe } = renderToPipeableStream(<App ssrPath={path} />, {
      onAllReady() {
        pipe(
          new Writable({
            write(chunk, _enc, cb) {
              html += chunk.toString();
              cb();
            },
            final(cb) {
              if (errors.length) reject(errors[0]);
              else resolve(html);
              cb();
            },
          }),
        );
      },
      onShellError: reject,
      onError(err) {
        errors.push(err);
      },
    });
  });
}

export interface SitemapEntry {
  path: string;
  changefreq: string;
  priority: number;
  /** ISO date, or a source file whose last git commit date the script looks up */
  lastmod?: string;
  source?: string;
}

/** Every indexable URL: static pages plus one URL per blog post. */
export function getSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = Object.entries(PAGE_SEO).map(([path, p]) => ({
    path,
    changefreq: p.changefreq,
    priority: p.priority,
    source: p.source,
  }));
  const blogList = entries.find((e) => e.path === "/blog");
  const newest = BLOG_POSTS.map((p) => p.updatedAt).sort().pop();
  if (blogList && newest) {
    blogList.lastmod = newest;
    delete blogList.source;
  }
  for (const post of BLOG_POSTS) {
    entries.push({ path: `/blog/${post.slug}`, changefreq: "monthly", priority: 0.7, lastmod: post.updatedAt });
  }
  return entries;
}
