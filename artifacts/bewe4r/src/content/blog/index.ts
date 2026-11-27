import raw from "./index.json";
import type { CategoryId, ContentLang } from "./categories";

/**
 * Metadata of the article files in ./articles (one JSON file per language and post, loaded on demand).
 * index.json is the only list of them: adding an article file plus its line here creates its page and sitemap entry.
 */
export interface ArticleMeta {
  slug: string;
  lang: ContentLang;
  category: CategoryId;
  /** ISO date */
  date: string;
  author: string;
  title: string;
  /** Plain-text teaser for the cards */
  excerpt: string;
  minutes: number;
  /** The same article in the other languages (slug per language), when a translation exists */
  alt?: Partial<Record<ContentLang, string>>;
}

export const ARTICLE_INDEX = raw as ArticleMeta[];

/** URL path of an article: English lives at /blog/:slug, the translations at /de/blog/:slug and /nl/blog/:slug. */
export function articlePath(lang: ContentLang, slug: string): string {
  return lang === "en" ? `/blog/${slug}` : `/${lang}/blog/${slug}`;
}

export function findArticleMeta(lang: ContentLang, slug: string): ArticleMeta | undefined {
  return ARTICLE_INDEX.find((a) => a.lang === lang && a.slug === slug);
}

/** "/de/blog/x" -> { lang: "de", slug: "x" }, "/blog/x" -> { lang: "en", slug: "x" }, anything else -> null */
export function parseBlogPath(path: string): { lang: ContentLang; slug: string } | null {
  const m = path.split(/[?#]/)[0]!.replace(/\/+$/, "").match(/^\/(?:(de|nl)\/)?blog\/([^/]+)$/);
  return m ? { lang: (m[1] as ContentLang | undefined) ?? "en", slug: m[2]! } : null;
}
