export type PageLang = "en" | "de" | "nl";

export interface SeoData {
  /** Language of the page's content (default "en"): <html lang>, og:locale */
  lang?: PageLang;
  /** hreflang alternates, including the page itself and "x-default" */
  alternates?: Array<{ hreflang: string; href: string }>;
  title: string;
  description: string;
  /** Absolute canonical URL. Omitted for pages that must not be indexed (404, admin). */
  canonical?: string;
  /** e.g. "index, follow, max-image-preview:large" or "noindex, nofollow" */
  robots: string;
  ogType: "website" | "article";
  ogImage: { url: string; width?: number; height?: number; alt?: string };
  /** JSON-LD objects, rendered as <script type="application/ld+json"> in the first HTML. */
  jsonLd: Array<Record<string, unknown>>;
}
