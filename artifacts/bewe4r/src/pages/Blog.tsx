import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BlogHero } from "@/components/blog/BlogHero";
import { Blog7 } from "@/components/blog/Blog7";
import { toCard } from "@/components/blog/blogCards";
import { getSortedBlogPosts, type BlogLang } from "@/data/blogPosts";

/** Hero + the card grid. Single posts are on /blog/:slug (BlogPost.tsx). Head tags: see seo/blogSeo.ts. */
export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const lang: BlogLang = i18n.language === "de" ? "de" : "en";

  const cards = useMemo(() => getSortedBlogPosts().map((p) => toCard(p, lang, t("Read more"))), [lang, t]);

  return (
    <div className="bg-[#ffffff] text-[#0f0f0f]">
      <BlogHero />
      <Blog7 posts={cards} />
    </div>
  );
}
