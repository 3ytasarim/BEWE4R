import type { ContentLang } from "./categories";

/**
 * Texts around an article. They are chosen by the article's own language (not by the interface language), so a
 * German or Dutch article is complete on its own page and the prerendered HTML matches what the browser renders.
 */
export const BLOG_UI: Record<
  ContentLang,
  { home: string; blog: string; breadcrumb: string; minRead: string; readMore: string; moreArticles: string; languages: string; languageNames: Record<ContentLang, string> }
> = {
  en: { home: "Home", blog: "Blog", breadcrumb: "Breadcrumb", minRead: "min read", readMore: "Read more", moreArticles: "Related articles", languages: "Languages", languageNames: { en: "English", de: "Deutsch", nl: "Nederlands" } },
  de: { home: "Startseite", blog: "Blog", breadcrumb: "Brotkrümelnavigation", minRead: "Min. Lesezeit", readMore: "Weiterlesen", moreArticles: "Ähnliche Artikel", languages: "Sprachen", languageNames: { en: "English", de: "Deutsch", nl: "Nederlands" } },
  nl: { home: "Home", blog: "Blog", breadcrumb: "Kruimelpad", minRead: "min leestijd", readMore: "Lees verder", moreArticles: "Gerelateerde artikelen", languages: "Talen", languageNames: { en: "English", de: "Deutsch", nl: "Nederlands" } },
};
