import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { BlogBreadcrumb } from "@/components/blog/BlogBreadcrumb";
import { BlogCardGrid } from "@/components/blog/BlogCards";
import { CATEGORY_LABELS } from "@/content/blog/categories";
import { getBlogList, getRelatedItems } from "@/content/blog/list";
import { formatBlogDate, readingMinutes, type BlogLang, type BlogPostData } from "@/data/blogPosts";

/** The three first posts (Markdown in src/data/blogPosts.ts, English and German in one record). */
export function LegacyPostView({ post }: { post: BlogPostData }) {
  const { t, i18n } = useTranslation();
  const lang: BlogLang = i18n.language === "de" ? "de" : "en";
  const text = post[lang];

  const related = useMemo(() => getRelatedItems(getBlogList(lang), { id: post.slug, category: post.categoryId }), [lang, post.slug, post.categoryId]);

  return (
    <div className="bg-[#ffffff] text-[#0f0f0f]">
      <article className="bg-[#ffffff] pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <BlogBreadcrumb
            className="mb-10"
            items={[{ label: t("Home"), href: "/" }, { label: t("Blog"), href: "/blog" }, { label: text.title }]}
          />

          <header className="mb-12">
            <span className="mb-5 inline-block rounded-full border border-[#0f0f0f]/25 bg-[#0f0f0f]/5 px-4 py-1 text-xs font-bold uppercase tracking-[1.2px] text-[#0f0f0f]">
              {CATEGORY_LABELS[post.categoryId][lang]}
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

          <BlogMarkdown content={text.content} />

          {text.tags.length > 0 && (
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-[#e5e7eb] pt-8" aria-label={t("Topics")}>
              {text.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-[10px] py-1 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[0.275px] text-[#6b7280]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex items-center space-x-4 border-t border-[#e5e7eb] pt-8">
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
        <section aria-labelledby="related-articles" className="border-t border-[#e5e7eb] pb-24 pt-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <h2 id="related-articles" className="mb-8 font-display text-3xl text-[#0f0f0f] lg:text-4xl">
              {t("Related articles")}
            </h2>
            <BlogCardGrid items={related} cta={t("Read more")} headingLevel="h3" />
          </div>
        </section>
      )}
    </div>
  );
}
