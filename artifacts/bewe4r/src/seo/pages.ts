import type { SeoData } from "./types";
import { DEFAULT_OG_IMAGE, LOGO_URL, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

/**
 * Single source of truth for every static public URL: its SEO texts, sitemap settings and the source file
 * used for the sitemap's <lastmod>. Blog posts are derived from src/data/blogPosts.ts (see blogSeo.ts).
 */
export interface PageSeo {
  title: string;
  description: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  /** File whose last git commit date is used as <lastmod> (relative to the app root). */
  source: string;
}

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Clothing Manufacturer in Istanbul for Fashion Brands | BEWE4R",
    description:
      "Clothing manufacturer in Istanbul for streetwear and fashion brands: samples, print, embroidery, labels, packaging and worldwide delivery from one partner.",
    changefreq: "weekly",
    priority: 1.0,
    source: "src/pages/Home.tsx",
  },
  "/your-brand/print": {
    title: "Custom Printing & Embroidery for Clothing | BEWE4R",
    description:
      "Screen print, DTF, DTG, embroidery, 3D patches and embossing for your clothing brand, produced in Istanbul with consistent premium quality.",
    changefreq: "monthly",
    priority: 0.8,
    source: "src/pages/deine-brand/Print.tsx",
  },
  "/your-brand/label": {
    title: "Custom Clothing Labels & Hang Tags | BEWE4R",
    description:
      "Hang tags, design tags, neck tags and jeans tags for your clothing brand. Custom labels that make your garments look and feel like a finished brand.",
    changefreq: "monthly",
    priority: 0.8,
    source: "src/pages/deine-brand/Label.tsx",
  },
  "/your-brand/sample": {
    title: "Clothing Sample Production Process | BEWE4R",
    description:
      "Send your techpack, receive a custom offer and approve your sample before bulk production. See how the BEWE4R sample process works, step by step.",
    changefreq: "monthly",
    priority: 0.9,
    source: "src/pages/deine-brand/Sample.tsx",
  },
  "/your-brand/moq": {
    title: "Minimum Order Quantities (MOQ) for Clothing | BEWE4R",
    description:
      "Minimum order quantities for T-shirts, hoodies, crewnecks, caps, shorts and joggers. Mix sizes freely and get volume discounts from 100 pieces.",
    changefreq: "monthly",
    priority: 0.8,
    source: "src/pages/deine-brand/Moq.tsx",
  },
  "/your-brand/pre-order": {
    title: "Pre-Order Production for Clothing Drops | BEWE4R",
    description:
      "Produce when you have orders. Learn how pre-order production works for your clothing drop, from announcement to delivery to your customers.",
    changefreq: "monthly",
    priority: 0.7,
    source: "src/pages/deine-brand/PreOrder.tsx",
  },
  "/your-brand/storage": {
    title: "Storage & Fulfilment for Clothing Brands | BEWE4R",
    description:
      "Store your products with us at favourable rates: flexible, secure and ready to ship instantly. Warehousing for clothing brands from BEWE4R.",
    changefreq: "monthly",
    priority: 0.7,
    source: "src/pages/deine-brand/Lager.tsx",
  },
  "/your-brand/delivery": {
    title: "Worldwide Delivery & Weekly Shipping | BEWE4R",
    description:
      "Weekly shipping from Istanbul with DDP delivery to Germany, Austria, Switzerland, the EU and the UK. See delivery times and express options.",
    changefreq: "monthly",
    priority: 0.7,
    source: "src/pages/deine-brand/Lieferung.tsx",
  },
  "/brand-essentials": {
    title: "Packaging & Brand Essentials for Clothing | BEWE4R",
    description:
      "From packaging to branded extras: zip bags, boxes, thank-you cards, stickers and customer gifts that turn your clothing brand into an experience.",
    changefreq: "monthly",
    priority: 0.7,
    source: "src/pages/weitere-produkte/Index.tsx",
  },
  "/brand-essentials/zip-bags": {
    title: "Custom Zip Bags & Shipping Bags | BEWE4R",
    description:
      "Custom zip bags and shipping bags for your clothing brand in any size, colour and finish. Branded packaging that protects and presents your products.",
    changefreq: "monthly",
    priority: 0.6,
    source: "src/pages/weitere-produkte/ZipBags.tsx",
  },
  "/brand-essentials/boxes": {
    title: "Custom Boxes & Cartons for Brands | BEWE4R",
    description:
      "Custom boxes built to your requirements in any shape, size and colour. From a simple print to a 3D design with special openings.",
    changefreq: "monthly",
    priority: 0.6,
    source: "src/pages/weitere-produkte/Kartonagen.tsx",
  },
  "/brand-essentials/marketing-essentials": {
    title: "Thank-You Cards, Stickers & Customer Gifts | BEWE4R",
    description:
      "Thank-you cards, flyers, stickers and customer gifts that make every order feel personal. Marketing essentials for clothing brands.",
    changefreq: "monthly",
    priority: 0.6,
    source: "src/pages/weitere-produkte/MarketingEssentials.tsx",
  },
  "/blog": {
    title: "Fashion Brand Guides: Clothing Production Blog | BEWE4R",
    description:
      "Practical answers on sampling, minimum quantities, production time and everything else you need to launch your own clothing brand.",
    changefreq: "weekly",
    priority: 0.8,
    source: "src/data/blogPosts.ts",
  },
  "/e-catalog": {
    title: "E-Catalog: What You Can Produce | BEWE4R",
    description:
      "Browse what BEWE4R can produce for your brand: T-shirts, hoodies, crewnecks, caps, shorts and more, ready for your print, embroidery and label.",
    changefreq: "monthly",
    priority: 0.8,
    source: "src/pages/Katalog.tsx",
  },
  "/about": {
    title: "About BEWE4R: Clothing Production Studio in Istanbul",
    description:
      "Meet the team behind BEWE4R, a clothing production partner in Istanbul that supports brands from the first idea and techpack to sampling, production and delivery.",
    changefreq: "monthly",
    priority: 0.6,
    source: "src/pages/UeberUns.tsx",
  },
  "/about/prices-shipping": {
    title: "Prices & Shipping: What Affects Production Cost | BEWE4R",
    description:
      "Understand what affects your production cost and how shipping works: DDP with customs included, express in 4-5 business days, standard in 7-15.",
    changefreq: "monthly",
    priority: 0.7,
    source: "src/pages/PricesShipping.tsx",
  },
  "/contact": {
    title: "Contact BEWE4R: Start Your Clothing Project",
    description:
      "Tell us about your project: product, quantity and timeline. Reach BEWE4R by contact form, email or WhatsApp and get a reply within 24 hours.",
    changefreq: "monthly",
    priority: 0.8,
    source: "src/pages/Kontakt.tsx",
  },
  "/privacy": {
    title: "Privacy Policy | BEWE4R",
    description: "How BEWE4R collects, uses and protects your personal data when you visit our website or contact us.",
    changefreq: "yearly",
    priority: 0.2,
    source: "src/pages/PrivacyPolicy.tsx",
  },
  "/legal-notice": {
    title: "Legal Notice | BEWE4R",
    description: "Legal notice and company information of BEWE4R.",
    changefreq: "yearly",
    priority: 0.2,
    source: "src/pages/LegalNotice.tsx",
  },
  "/terms": {
    title: "Terms and Conditions | BEWE4R",
    description: "General terms and conditions for orders and services at BEWE4R.",
    changefreq: "yearly",
    priority: 0.2,
    source: "src/pages/Terms.tsx",
  },
};

/**
 * Old/duplicate URLs that show the same page as another URL. They answer with a 301 on the server
 * (nginx include generated at build time) and are never listed in the sitemap.
 */
export const ALIASES: Record<string, string> = {
  "/brand-essentials/mailer-bags": "/brand-essentials/zip-bags",
  "/brand-essentials/thank-you-cards": "/brand-essentials/marketing-essentials",
  "/brand-essentials/stickers": "/brand-essentials/marketing-essentials",
  "/brand-essentials/customer-gifts": "/brand-essentials/marketing-essentials",
};

export const NOT_FOUND_SEO: SeoData = {
  title: `Page not found | ${SITE_NAME}`,
  description: "The page you are looking for does not exist or has moved.",
  robots: "noindex, nofollow",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: [],
};

export const ADMIN_SEO: SeoData = {
  title: `Admin | ${SITE_NAME}`,
  description: "BEWE4R administration.",
  robots: "noindex, nofollow",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: [],
};

const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: LOGO_URL },
  email: "info@bewe4r.com",
  sameAs: ["https://instagram.com/bewe4r"],
  address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
};

export const ORGANIZATION_REF = { "@id": `${SITE_URL}/#organization` };

export function staticSeo(path: string): SeoData | null {
  const page = PAGE_SEO[path];
  if (!page) return null;
  const jsonLd: SeoData["jsonLd"] = [];
  if (path === "/") {
    jsonLd.push(
      { "@context": "https://schema.org", ...ORGANIZATION },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: "en",
        publisher: ORGANIZATION_REF,
      },
    );
  }
  return {
    title: page.title,
    description: page.description,
    canonical: absoluteUrl(path),
    robots: "index, follow, max-image-preview:large",
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd,
  };
}
