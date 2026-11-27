import { use } from "react";
import type { ContentLang } from "./categories";

/** One article file (src/content/blog/articles/<lang>/<slug>.json). The body is sanitised HTML made at conversion time. */
export interface BlogArticle {
  slug: string;
  lang: ContentLang;
  title: string;
  /** Text of <title> without the site name */
  seoTitle: string;
  description: string;
  date: string;
  author: string;
  intro: string;
  tocLabel: string;
  toc: Array<{ id: string; text: string }>;
  /** Only h2, p, ul, ol, li, a, table parts, div.table-wrap and blockquote; links are internal paths or https URLs */
  bodyHtml: string;
  relatedLabel: string;
  related: Array<{ href: string; text: string }>;
  ctaText: string;
  ctaHref: string;
  alt?: Partial<Record<ContentLang, string>>;
}

// Every article is its own chunk: opening one post never downloads the texts of the others.
const loaders = import.meta.glob<BlogArticle>("./articles/*/*.json", { import: "default" });

const cache = new Map<string, BlogArticle | null>();
const pending = new Map<string, Promise<BlogArticle | null>>();
const keyOf = (lang: ContentLang, slug: string) => `${lang}/${slug}`;

export function loadArticle(lang: ContentLang, slug: string): Promise<BlogArticle | null> {
  const key = keyOf(lang, slug);
  if (cache.has(key)) return Promise.resolve(cache.get(key)!);
  let promise = pending.get(key);
  if (!promise) {
    const loader = loaders[`./articles/${lang}/${slug}.json`];
    promise = (loader ? loader() : Promise.resolve(null)).then((article) => {
      cache.set(key, article);
      pending.delete(key);
      return article;
    });
    pending.set(key, promise);
  }
  return promise;
}

/**
 * The article, or null if it does not exist. Suspends until the file has arrived; after loadArticle() it returns
 * synchronously (the client entry and the prerender both preload the article of the page they render).
 */
export function useArticle(lang: ContentLang, slug: string): BlogArticle | null {
  const key = keyOf(lang, slug);
  if (cache.has(key)) return cache.get(key)!;
  return use(loadArticle(lang, slug));
}
