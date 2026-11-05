import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BlogHero } from "@/components/blog/BlogHero";
import { Blog7, type BlogCardPost } from "@/components/blog/Blog7";
import { useSeo } from "@/hooks/useSeo";
import { formatBlogDate, getSortedBlogPosts, type BlogLang } from "@/data/blogPosts";

/** Hero + the card grid. Single posts are on /blog/:slug (BlogPost.tsx). */
export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const lang: BlogLang = i18n.language === "de" ? "de" : "en";

  useSeo(
    t("Blog"),
    t("Practical answers on sampling, minimum quantities, production time and everything else you need to launch your own clothing brand."),
    "clothing production blog, start a clothing brand, techpack, MOQ, sampling, fashion brand guides",
  );

  const cards = useMemo<BlogCardPost[]>(
    () =>
      getSortedBlogPosts().map((p) => ({
        id: p.slug,
        title: p[lang].title,
        summary: p[lang].excerpt,
        href: `/blog/${p.slug}`,
        image: { src: p.image, alt: p[lang].title },
        category: p[lang].category,
        date: formatBlogDate(p.publishedAt, lang),
        author: p.author,
        cta: t("Read more"),
      })),
    [lang, t],
  );

  return (
    <div className="bg-[#ffffff] text-[#0f0f0f]">
      <BlogHero />
      <Blog7 posts={cards} />
    </div>
  );
}
