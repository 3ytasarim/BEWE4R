export type ContentLang = "en" | "de" | "nl";

/** Display order of the filter on the blog page. The ids are also stored in index.json and blogPosts.ts. */
export const CATEGORY_IDS = ["sourcing", "development", "merch", "finishing", "labels", "international"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

/** Short names, used for the filter buttons, the card badges and the article's section in the structured data. */
export const CATEGORY_LABELS: Record<CategoryId, Record<ContentLang, string>> = {
  sourcing: { en: "Sourcing & Collection", de: "Beschaffung & Kollektion", nl: "Inkoop & collectie" },
  development: { en: "Development & Samples", de: "Entwicklung & Muster", nl: "Ontwikkeling & samples" },
  merch: { en: "Merch & Workwear", de: "Merch & Workwear", nl: "Merch & werkkleding" },
  finishing: { en: "Print & Finishing", de: "Druck & Veredelung", nl: "Print & afwerking" },
  labels: { en: "Labels & Packaging", de: "Etiketten & Verpackung", nl: "Labels & verpakking" },
  international: { en: "International Sourcing", de: "Internationale Beschaffung", nl: "Internationale inkoop" },
};
