import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { formatBlogDate } from "@/data/blogPosts";
import { CATEGORY_LABELS, type ContentLang } from "@/content/blog/categories";
import { ARTICLE_INDEX, articlePath, findArticleMeta } from "@/content/blog/index";
import { getBlogList, getRelatedItems } from "@/content/blog/list";
import { BLOG_UI } from "@/content/blog/ui";
import type { BlogArticle } from "@/content/blog/articles";
import { BlogBreadcrumb } from "./BlogBreadcrumb";
import { BlogCardGrid } from "./BlogCards";
import { ArticleBody } from "./ArticleBody";

const CTA_CLASS =
  "inline-flex h-12 items-center gap-2 rounded-full bg-[#0f0f0f] px-7 text-[15px] font-semibold text-[#ffffff] transition-colors hover:bg-[#2b2b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f] focus-visible:ring-offset-2";

/** One article file: header, language switch, table of contents, text, related guides and call to action. */
export function ArticleView({ article }: { article: BlogArticle }) {
  const lang: ContentLang = article.lang;
  const ui = BLOG_UI[lang];
  const meta = findArticleMeta(lang, article.slug);
  const category = meta?.category;

  const related = useMemo(() => {
    // The English page suggests three more guides; German and Dutch pages already link their few siblings below.
    if (lang !== "en" || !category) return [];
    return getRelatedItems(getBlogList("en"), { id: article.slug, category });
  }, [lang, category, article.slug]);

  const translations = (Object.keys(article.alt ?? {}) as ContentLang[]).filter((l) => ARTICLE_INDEX.some((a) => a.lang === l && a.slug === article.alt![l]));

  return (
    <div className="bg-[#ffffff] text-[#0f0f0f]">
      <article lang={lang} className="bg-[#ffffff] pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <BlogBreadcrumb
            className="mb-10"
            ariaLabel={ui.breadcrumb}
            items={[{ label: ui.home, href: "/" }, { label: ui.blog, href: "/blog" }, { label: article.title }]}
          />

          <header className="mb-10">
            {category && (
              <span className="mb-5 inline-block rounded-full border border-[#0f0f0f]/25 bg-[#0f0f0f]/5 px-4 py-1 text-xs font-bold uppercase tracking-[1.2px] text-[#0f0f0f]">
                {CATEGORY_LABELS[category][lang]}
              </span>
            )}
            <h1 className="mb-6 font-display text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.05] text-[#0f0f0f]">{article.title}</h1>
            <p className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#6b7280]">
              <Link href="/about" className="font-semibold text-[#4b5563] underline-offset-4 hover:underline">
                {article.author}
              </Link>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{formatBlogDate(article.date, lang)}</time>
              {meta && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    {meta.minutes} {ui.minRead}
                  </span>
                </>
              )}
            </p>

            {translations.length > 0 && (
              <nav aria-label={ui.languages} className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                {(["en", "de", "nl"] as ContentLang[])
                  .filter((l) => l === lang || translations.includes(l))
                  .map((l, i) => (
                    <span key={l} className="inline-flex items-center gap-3">
                      {i > 0 && (
                        <span aria-hidden="true" className="text-[#0f0f0f]/30">
                          ·
                        </span>
                      )}
                      {l === lang ? (
                        <span aria-current="page" lang={l} className="font-semibold text-[#0f0f0f]">
                          {ui.languageNames[l]}
                        </span>
                      ) : (
                        <Link href={articlePath(l, article.alt![l]!)} hrefLang={l} lang={l} className="text-[#6b7280] underline-offset-4 hover:text-[#0f0f0f] hover:underline">
                          {ui.languageNames[l]}
                        </Link>
                      )}
                    </span>
                  ))}
              </nav>
            )}

            <p className="text-xl leading-relaxed text-[#374151]">{article.intro}</p>
          </header>

          {article.toc.length > 0 && (
            <details className="group mb-10 rounded-2xl border border-[#e5e7eb] bg-[#f7f7f5]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-[#0f0f0f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f] [&::-webkit-details-marker]:hidden">
                {article.tocLabel}
                <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ol className="list-decimal space-y-2 px-5 pb-5 pl-10 text-[15px] leading-snug text-[#374151] marker:font-semibold marker:text-[#0f0f0f]">
                {article.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="underline-offset-4 hover:text-[#0f0f0f] hover:underline">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <ArticleBody html={article.bodyHtml} />

          {article.related.length > 0 && (
            <nav aria-label={article.relatedLabel} className="mt-14 border-t border-[#e5e7eb] pt-8">
              <h2 className="mb-4 font-display text-2xl text-[#0f0f0f]">{article.relatedLabel}</h2>
              <ul className="space-y-2">
                {article.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="inline-flex items-start gap-1.5 text-[16px] font-medium text-[#0f0f0f] underline underline-offset-4 decoration-[#0f0f0f]/30 transition-colors hover:decoration-[#0f0f0f]">
                      {r.text}
                      <ArrowUpRight className="mt-1 size-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="mt-10">
            <Link href={article.ctaHref} className={CTA_CLASS}>
              {article.ctaText}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-articles" className="border-t border-[#e5e7eb] pb-24 pt-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <h2 id="related-articles" className="mb-8 font-display text-3xl text-[#0f0f0f] lg:text-4xl">
              {ui.moreArticles}
            </h2>
            <BlogCardGrid items={related} cta={ui.readMore} headingLevel="h3" />
          </div>
        </section>
      )}
    </div>
  );
}
