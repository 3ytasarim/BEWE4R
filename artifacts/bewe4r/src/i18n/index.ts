import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { de } from "./de";

export const LANG_STORAGE_KEY = "bewe4r-lang";
export type Lang = "en" | "de";

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    return v === "de" ? "de" : "en";
  } catch {
    return "en";
  }
}

// The prerendered HTML (SSG) and the first client render are always English so hydration matches;
// the visitor's saved language is applied right after hydration (see restoreStoredLang).
const initialLng: Lang = "en";

i18n.use(initReactI18next).init({
  // English is the source language — keys ARE the English strings.
  // Only German needs a resource map; missing keys fall back to the key (English).
  resources: {
    en: { translation: {} },
    de: { translation: de },
  },
  lng: initialLng,
  fallbackLng: "en",
  keySeparator: false,
  nsSeparator: false,
  interpolation: { escapeValue: false },
  returnNull: false,
  returnEmptyString: false,
});

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLng;
}

/** Language of a page whose content is fixed by its URL (/de/blog/..., /nl/blog/...), or null. */
export function pageLangOf(pathname: string): "de" | "nl" | null {
  const m = pathname.match(/^\/(de|nl)\//);
  return m ? (m[1] as "de" | "nl") : null;
}

/**
 * Applies the language of the interface after the first render and after every navigation:
 * a German page shows the German interface, a Dutch page the English one (there is no Dutch interface),
 * every other page the language the visitor saved. <html lang> follows the language of the page content.
 * Choosing a language with the toggle (setLang) stays valid until the next navigation.
 */
export function applyPageLanguage(pathname: string) {
  const pageLang = pageLangOf(pathname);
  const target: Lang = pageLang === "de" ? "de" : pageLang === "nl" ? "en" : readStoredLang();
  if (target !== i18n.language) i18n.changeLanguage(target);
  if (typeof document !== "undefined") document.documentElement.lang = pageLang ?? target;
}

export function setLang(lang: Lang) {
  i18n.changeLanguage(lang);
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
  }
}

export default i18n;
