import type { CSSProperties } from "react";

/**
 * Start delay (and slide distance) of the CSS entrance animations in index.css (.hero-fade-up, .hero-word-rise, ...).
 * The hero text is then visible from the prerendered HTML without waiting for JavaScript, which keeps the
 * largest-content paint (LCP) early.
 */
export const reveal = (delay: number, shift?: number) =>
  ({ "--hero-delay": `${delay}s`, ...(shift !== undefined ? { "--hero-shift": `${shift}px` } : {}) }) as CSSProperties;
