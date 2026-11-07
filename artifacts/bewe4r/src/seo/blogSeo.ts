import { BLOG_POSTS, getBlogPost } from "@/data/blogPosts";
import { ORGANIZATION_REF, PAGE_SEO } from "./pages";
import { LOGO_URL, SITE_NAME, SITE_URL, absoluteUrl } from "./site";
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

/** SEO for /blog and /blog/:slug. English only: the indexed pages are the English ones. */
export function getBlogSeo(path: string): SeoData | null {
  const base = PAGE_SEO["/blog"]!;

  if (path === "/blog") {
    return {
      title: base.title,
      description: base.description,
      canonical: absoluteUrl("/blog"),
      robots: ROBOTS,
      ogType: "website",
      ogImage: { url: absoluteUrl(BLOG_POSTS[0]!.image), alt: BLOG_POSTS[0]!.en.title },
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE_NAME} Blog: Fashion Brand Guides`,
          description: base.description,
          url: absoluteUrl("/blog"),
          inLanguage: "en",
          publisher: ORGANIZATION_REF,
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.en.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.publishedAt,
          })),
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ],
    };
  }

  const slug = path.replace(/^\/blog\//, "");
  const post = getBlogPost(slug);
  if (!post) return null;

  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = absoluteUrl(post.image);
  return {
    title: `${post.en.seoTitle ?? post.en.title} | ${SITE_NAME}`,
    description: post.en.description,
    canonical: url,
    robots: ROBOTS,
    ogType: "article",
    ogImage: { url: image, width: post.imageWidth, height: post.imageHeight, alt: post.en.title },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.en.title,
        description: post.en.description,
        image: [image],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
        publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, logo: { "@type": "ImageObject", url: LOGO_URL } },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        inLanguage: "en",
        keywords: post.en.keywords,
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.en.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };
}
