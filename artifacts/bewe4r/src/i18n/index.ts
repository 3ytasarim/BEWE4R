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

const initialLng = readStoredLang();

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
