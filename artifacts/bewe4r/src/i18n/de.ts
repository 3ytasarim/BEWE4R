import { common } from "./locales/common";
import { home } from "./locales/home";
import { pages } from "./locales/pages";
import { yourBrand } from "./locales/your-brand";
import { brandEssentials } from "./locales/brand-essentials";

// Merge all area dictionaries into a single German translation map.
// Keys are the exact English source strings.
export const de: Record<string, string> = {
  ...common,
  ...home,
  ...pages,
  ...yourBrand,
  ...brandEssentials,
};
