import { useEffect, useState } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Same as framer-motion's `useReducedMotion`, but it reports `null` (like on the server) until the page has
 * hydrated. Otherwise a visitor with "reduce motion" enabled would render different markup than the prerendered
 * HTML on the first client render and trigger a hydration mismatch.
 */
export function useReducedMotion(): boolean | null {
  const real = useFramerReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? real : null;
}
