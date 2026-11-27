import { BLOG_POSTS } from "@/data/blogPosts";
import { ARTICLE_INDEX, articlePath, findArticleMeta } from "./index";
import type { CategoryId } from "./categories";

/** One card of the blog page. The three older posts (Markdown, src/data/blogPosts.ts) and the article files share it. */
export interface BlogListItem {
  id: string;
  category: CategoryId;
  /** ISO date */
  date: string;
  author: string;
  title: string;
  excerpt: string;
  href: string;
  /** Language of the text on the card (and of the page behind href) */
  lang: "en" | "de";
}

/**
 * Newest first, in the publishing order of the guides on the same day.
 * With the German interface a post is shown in German where a German version exists.
 */
export function getBlogList(ui: "en" | "de"): BlogListItem[] {
  const items: BlogListItem[] = [];

  for (const a of ARTICLE_INDEX) {
    if (a.lang !== "en") continue;
    const de = ui === "de" && a.alt?.de ? findArticleMeta("de", a.alt.de) : undefined;
    const shown = de ?? a;
    items.push({
      id: a.slug,
      category: a.category,
      date: a.date,
      author: shown.author,
      title: shown.title,
      excerpt: shown.excerpt,
      href: articlePath(shown.lang, shown.slug),
      lang: shown.lang === "de" ? "de" : "en",
    });
  }

  for (const p of BLOG_POSTS) {
    const text = p[ui];
    items.push({ id: p.slug, category: p.categoryId, date: p.publishedAt, author: p.author, title: text.title, excerpt: text.excerpt, href: `/blog/${p.slug}`, lang: ui });
  }

  return items.sort((x, y) => y.date.localeCompare(x.date));
}

/** The posts to suggest below an article: the same category first, then the newest of the rest. */
export function getRelatedItems(items: BlogListItem[], current: { id: string; category: CategoryId }, count = 3): BlogListItem[] {
  const others = items.filter((i) => i.id !== current.id);
  return [...others.filter((i) => i.category === current.category), ...others.filter((i) => i.category !== current.category)].slice(0, count);
}

/** All English posts: the 30 article files and the three older ones. */
export function getAllEnglishPosts(): Array<{ slug: string; date: string; title: string; category: CategoryId; legacy: boolean }> {
  const fromFiles = ARTICLE_INDEX.filter((a) => a.lang === "en").map((a) => ({ slug: a.slug, date: a.date, title: a.title, category: a.category, legacy: false }));
  const legacy = BLOG_POSTS.map((p) => ({ slug: p.slug, date: p.publishedAt, title: p.en.title, category: p.categoryId, legacy: true }));
  return [...fromFiles, ...legacy];
}
