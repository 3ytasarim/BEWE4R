import { useEffect, useMemo } from "react";
import { useRoute, Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { useSeo } from "@/hooks/useSeo";
import { formatBlogDate, getBlogPost, readingMinutes, type BlogLang } from "@/data/blogPosts";

const SITE_URL = "https://www.bewe4r.com";

interface ArticleHead {
  url: string;
  title: string;
  description: string;
  image: string;
  jsonLd: Record<string, unknown>;
}

/** Canonical, Open Graph / Twitter tags and BlogPosting JSON-LD for one article; restored when leaving the page. */
function useArticleHead(head: ArticleHead | null) {
  useEffect(() => {
    if (!head) return;
    const restore: Array<() => void> = [];
    const setAttr = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const prev = el.getAttribute(attr);
      el.setAttribute(attr, value);
      restore.push(() => {
        if (prev !== null) el.setAttribute(attr, prev);
      });
    };

    setAttr('link[rel="canonical"]', "href", head.url);
    setAttr('meta[property="og:type"]', "content", "article");
    setAttr('meta[property="og:title"]', "content", head.title);
    setAttr('meta[property="og:description"]', "content", head.description);
    setAttr('meta[property="og:url"]', "content", head.url);
    setAttr('meta[property="og:image"]', "content", head.image);
    setAttr('meta[name="twitter:title"]', "content", head.title);
    setAttr('meta[name="twitter:description"]', "content", head.description);
    setAttr('meta[name="twitter:image"]', "content", head.image);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(head.jsonLd);
    document.head.appendChild(script);

    return () => {
      restore.forEach((fn) => fn());
      script.remove();
    };
  }, [head]);
}

export default function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const lang: BlogLang = i18n.language === "de" ? "de" : "en";
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getBlogPost(params.slug) : undefined;
  const text = post?.[lang];

  useSeo(text?.title ?? t("Article not found"), text?.description, text?.keywords);

  const head = useMemo<ArticleHead | null>(() => {
    if (!post) return null;
    const t2 = post[lang];
    const image = new URL(post.image, window.location.origin).href;
    const url = `${SITE_URL}/blog/${post.slug}`;
    return {
      url,
      title: t2.title,
      description: t2.description,
      image,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: t2.title,
        description: t2.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: lang,
        keywords: t2.keywords,
        author: { "@type": "Organization", name: post.author },
        publisher: { "@type": "Organization", name: "BEWE4R", url: SITE_URL },
        mainEntityOfPage: url,
        image,
      },
    };
  }, [post, lang]);
  useArticleHead(head);

  if (!post || !text) {
    return (
      <div className="bg-[#ffffff] text-[#0f0f0f]">
        <div className="mx-auto max-w-3xl px-6 py-40 text-center">
          <h1 className="mb-4 font-display text-4xl">{t("Article not found")}</h1>
          <Link href="/blog" className="font-medium underline underline-offset-4 hover:text-[#0f0f0f]/60">
            {t("Back to blog")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] text-[#0f0f0f]">
      <article className="bg-[#ffffff] pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-10 inline-flex items-center text-sm font-semibold text-[#0f0f0f] transition-colors hover:text-[#0f0f0f]/60">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("Back to overview")}
          </Link>

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

          <div className="mb-14 overflow-hidden rounded-3xl border border-border shadow-lg">
            <img src={post.image} alt={text.title} className="h-auto max-h-[500px] w-full object-cover" />
          </div>

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
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f0f0f] font-display text-xl text-[#ffffff]">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-[#0f0f0f]">{post.author}</div>
              <div className="text-sm text-[#6b7280]">BEWE4R</div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
