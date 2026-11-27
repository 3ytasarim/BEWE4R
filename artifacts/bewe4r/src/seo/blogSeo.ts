import { getBlogPost } from "@/data/blogPosts";
import { CATEGORY_LABELS } from "@/content/blog/categories";
import { loadArticle } from "@/content/blog/articles";
import { articlePath, findArticleMeta, parseBlogPath } from "@/content/blog/index";
import { getAllEnglishPosts } from "@/content/blog/list";
import { BLOG_UI } from "@/content/blog/ui";
import { ORGANIZATION_REF, PAGE_SEO } from "./pages";
import { DEFAULT_OG_IMAGE, LOGO_URL, SITE_NAME, SITE_URL, absoluteUrl } from "./site";
import type { SeoData } from "./types";

const ROBOTS = "index, follow, max-image-preview:large";

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

const publisher = { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, logo: { "@type": "ImageObject", url: LOGO_URL } };
const author = { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/about` };
// The blog posts have no pictures: they share the site's default Open Graph image.
const ogImage = { url: DEFAULT_OG_IMAGE.url, width: DEFAULT_OG_IMAGE.width, height: DEFAULT_OG_IMAGE.height, alt: DEFAULT_OG_IMAGE.alt };

/** SEO for /blog, /blog/:slug, /de/blog/:slug and /nl/blog/:slug. */
export async function getBlogSeo(path: string): Promise<SeoData | null> {
  const base = PAGE_SEO["/blog"]!;

  if (path === "/blog") {
    const posts = getAllEnglishPosts();
    return {
      title: base.title,
      description: base.description,
      canonical: absoluteUrl("/blog"),
      robots: ROBOTS,
      ogType: "website",
      ogImage,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE_NAME} Blog: Fashion Brand Guides`,
          description: base.description,
          url: absoluteUrl("/blog"),
          inLanguage: "en",
          publisher: ORGANIZATION_REF,
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.date,
          })),
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ],
    };
  }

  const target = parseBlogPath(path);
  if (!target) return null;
  const { lang, slug } = target;

  // The three first posts (Markdown, English page; the German text shows with the German interface)
  const legacy = lang === "en" ? getBlogPost(slug) : undefined;
  if (legacy) {
    const url = absoluteUrl(`/blog/${legacy.slug}`);
    return {
      title: `${legacy.en.seoTitle ?? legacy.en.title} | ${SITE_NAME}`,
      description: legacy.en.description,
      canonical: url,
      robots: ROBOTS,
      ogType: "article",
      ogImage,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: legacy.en.title,
          description: legacy.en.description,
          image: [ogImage.url],
          datePublished: legacy.publishedAt,
          dateModified: legacy.updatedAt,
          author,
          publisher,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
          inLanguage: "en",
          articleSection: CATEGORY_LABELS[legacy.categoryId].en,
          keywords: legacy.en.keywords,
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: legacy.en.title, path: `/blog/${legacy.slug}` },
        ]),
      ],
    };
  }

  // An article file
  const article = await loadArticle(lang, slug);
  if (!article) return null;
  const category = findArticleMeta(lang, slug)?.category;
  const url = absoluteUrl(articlePath(lang, slug));
  const ui = BLOG_UI[lang];

  const alternates = article.alt
    ? [
        ...(Object.entries(article.alt) as Array<["en" | "de" | "nl", string]>).map(([l, s]) => ({ hreflang: l, href: absoluteUrl(articlePath(l, s)) })),
        ...(article.alt.en ? [{ hreflang: "x-default", href: absoluteUrl(articlePath("en", article.alt.en)) }] : []),
      ]
    : undefined;

  return {
    lang,
    alternates,
    title: `${article.seoTitle} | ${SITE_NAME}`,
    description: article.description,
    canonical: url,
    robots: ROBOTS,
    ogType: "article",
    ogImage,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: [ogImage.url],
        datePublished: article.date,
        dateModified: article.date,
        author,
        publisher,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        inLanguage: lang,
        ...(category ? { articleSection: CATEGORY_LABELS[category].en } : {}),
      },
      breadcrumb([
        { name: ui.home, path: "/" },
        { name: ui.blog, path: "/blog" },
        { name: article.title, path: articlePath(lang, slug) },
      ]),
    ],
  };
}
