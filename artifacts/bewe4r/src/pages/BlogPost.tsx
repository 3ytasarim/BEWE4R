import { useMemo } from "react";
import { useRoute } from "wouter";
import { useTranslation } from "react-i18next";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { BlogBreadcrumb } from "@/components/blog/BlogBreadcrumb";
import { Blog7 } from "@/components/blog/Blog7";
import { toCard } from "@/components/blog/blogCards";
import NotFound from "@/pages/not-found";
import { formatBlogDate, getBlogPost, getSortedBlogPosts, readingMinutes, type BlogLang } from "@/data/blogPosts";

/** One article. Head tags (title, canonical, Open Graph, BlogPosting + BreadcrumbList JSON-LD): see seo/blogSeo.ts. */
export default function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const lang: BlogLang = i18n.language === "de" ? "de" : "en";
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getBlogPost(params.slug) : undefined;
  const text = post?.[lang];

  const related = useMemo(
    () =>
      post
        ? getSortedBlogPosts()
            .filter((p) => p.slug !== post.slug)
            .slice(0, 3)
            .map((p) => toCard(p, lang, t("Read more")))
        : [],
    [post, lang, t],
  );

  if (!post || !text) return <NotFound />;

  return (
    <div className="bg-[#ffffff] text-[#0f0f0f]">
      <article className="bg-[#ffffff] pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <BlogBreadcrumb
            className="mb-10"
            items={[{ label: t("Home"), href: "/" }, { label: t("Blog"), href: "/blog" }, { label: text.title }]}
          />

          <header className="mb-12">
            <span className="mb-5 inline-block rounded-full border border-[#0f0f0f]/30 bg-[#0f0f0f]/5 px-4 py-1 text-xs font-bold uppercase tracking-[1.2px] text-[#0f0f0f]">
              {text.category}
            </span>
            <h1 className="mb-6 font-display text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.05] text-[#0f0f0f]">{text.title}</h1>
            <div className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#6b7280]">
              <span className="font-semibold text-[#4b5563]">{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, lang)}</time>
              <span aria-hidden>·</span>
              <span>
                {readingMinutes(text.content)} {t("min read")}
              </span>
            </div>
            <p className="text-xl leading-relaxed text-[#6b7280]">{text.excerpt}</p>
          </header>

          <figure className="mb-14 overflow-hidden rounded-3xl border border-border shadow-lg">
            <img
              src={post.image}
              alt={text.title}
              width={post.imageWidth}
              height={post.imageHeight}
              fetchPriority="high"
              decoding="async"
              className="h-auto max-h-[500px] w-full object-cover"
            />
          </figure>

          <BlogMarkdown content={text.content} />

          {text.tags.length > 0 && (
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-gray-100 pt-8" aria-label={t("Topics")}>
              {text.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-gray-200 bg-gray-50 px-[10px] py-1 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[0.275px] text-[#6b7280]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex items-center space-x-4 border-t border-gray-100 pt-8">
            <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f0f0f] font-display text-xl text-[#ffffff]">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-[#0f0f0f]">{post.author}</div>
              <div className="text-sm text-[#6b7280]">BEWE4R</div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-articles" className="border-t border-gray-100 pt-16">
          <h2 id="related-articles" className="mx-auto max-w-[1280px] px-6 font-display text-3xl lg:text-4xl">
            {t("Related articles")}
          </h2>
          <Blog7 posts={related} headingLevel="h3" className="pt-8" />
        </section>
      )}
    </div>
  );
}
