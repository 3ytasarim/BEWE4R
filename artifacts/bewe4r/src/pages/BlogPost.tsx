import { useLocation } from "wouter";
import { ArticleView } from "@/components/blog/ArticleView";
import { LegacyPostView } from "@/components/blog/LegacyPostView";
import NotFound from "@/pages/not-found";
import { useArticle } from "@/content/blog/articles";
import { parseBlogPath } from "@/content/blog/index";
import { getBlogPost } from "@/data/blogPosts";

/**
 * One article. Routes: /blog/:slug (English; the three first posts and the article files), /de/blog/:slug and
 * /nl/blog/:slug (translations). Head tags (title, canonical, hreflang, Open Graph, JSON-LD): see seo/blogSeo.ts.
 */
export default function BlogPostPage() {
  const [location] = useLocation();
  const target = parseBlogPath(location);
  if (!target) return <NotFound />;
  return <Post lang={target.lang} slug={target.slug} />;
}

function Post({ lang, slug }: { lang: "en" | "de" | "nl"; slug: string }) {
  const legacy = lang === "en" ? getBlogPost(slug) : undefined;
  return legacy ? <LegacyPostView post={legacy} /> : <ArticlePost lang={lang} slug={slug} />;
}

/** An article file: useArticle suspends until it has arrived (the entry and the prerender preload it first). */
function ArticlePost({ lang, slug }: { lang: "en" | "de" | "nl"; slug: string }) {
  const article = useArticle(lang, slug);
  return article ? <ArticleView article={article} /> : <NotFound />;
}
