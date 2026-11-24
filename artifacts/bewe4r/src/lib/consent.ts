/**
 * Consent logic (pure, no browser access).
 *
 * Only the scripts a visitor agreed to may be loaded:
 *   - "statistics": Umami page-view counter, cookieless
 *   - "replay":     Umami session recording (clicks, scrolling, mouse movement)
 *   - "assistant":  ElevenLabs voice assistant widget (loaded from unpkg.com, talks to ElevenLabs)
 * "Necessary" (language setting and this choice itself) needs no consent and is not listed here.
 */

export const CONSENT_KEY = "bewe4r-consent";
/** Raise whenever the categories change in substance: older choices then no longer count. */
export const CONSENT_VERSION = 1;

const UMAMI_HOST = "https://analytics.bleibsichtbar.com";
const UMAMI_WEBSITE_ID = "51febfdf-41cf-464b-9ed1-4890faf0772a";

export type ConsentCategory = "statistics" | "replay" | "assistant";

export interface ConsentChoice {
  statistics: boolean;
  replay: boolean;
  assistant: boolean;
}

export interface Consent extends ConsentChoice {
  v: number;
  /** ISO time of the decision (proof of consent). */
  at: string;
}

export interface ScriptSpec {
  src: string;
  attrs?: Record<string, string>;
}

export const ACCEPT_ALL: ConsentChoice = { statistics: true, replay: true, assistant: true };
export const REJECT_ALL: ConsentChoice = { statistics: false, replay: false, assistant: false };

export const CATEGORY_SCRIPTS: Record<ConsentCategory, ScriptSpec> = {
  statistics: { src: `${UMAMI_HOST}/script.js`, attrs: { "data-website-id": UMAMI_WEBSITE_ID } },
  replay: { src: `${UMAMI_HOST}/recorder.js`, attrs: { "data-website-id": UMAMI_WEBSITE_ID } },
  assistant: { src: "https://unpkg.com/@elevenlabs/convai-widget-embed" },
};

const CATEGORIES = Object.keys(CATEGORY_SCRIPTS) as ConsentCategory[];

export function makeConsent(choice: ConsentChoice, now: Date = new Date()): Consent {
  return {
    v: CONSENT_VERSION,
    statistics: choice.statistics === true,
    replay: choice.replay === true,
    assistant: choice.assistant === true,
    at: now.toISOString(),
  };
}

/** Reads a stored value. Anything that does not match exactly (broken, other version) counts as "not decided yet". */
export function parseConsent(raw: string | null | undefined): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Consent> | null;
    if (!value || typeof value !== "object" || value.v !== CONSENT_VERSION) return null;
    if (CATEGORIES.some((c) => typeof value[c] !== "boolean") || typeof value.at !== "string") return null;
    return {
      v: value.v,
      statistics: value.statistics as boolean,
      replay: value.replay as boolean,
      assistant: value.assistant as boolean,
      at: value.at,
    };
  } catch {
    return null;
  }
}

/** The scripts that may be loaded for this state. Without a decision: none. */
export function allowedScripts(consent: Consent | null): ScriptSpec[] {
  if (!consent) return [];
  return CATEGORIES.filter((c) => consent[c]).map((c) => CATEGORY_SCRIPTS[c]);
}

/** A script that is already running cannot be unloaded: when something is withdrawn the page has to reload. */
export function needsReload(previous: Consent | null, next: ConsentChoice): boolean {
  if (!previous) return false;
  return CATEGORIES.some((c) => previous[c] && !next[c]);
}

/** The popup belongs on the public website, not in the admin area. */
export function showsBannerOn(pathname: string): boolean {
  const path = pathname.toLowerCase();
  return !(path === "/admin" || path.startsWith("/admin/"));
}
