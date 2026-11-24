import { useSyncExternalStore } from "react";
import {
  CONSENT_KEY,
  allowedScripts,
  makeConsent,
  needsReload,
  parseConsent,
  type Consent,
  type ConsentChoice,
  type ScriptSpec,
} from "./consent";

/** Browser side of the consent: store it, announce changes, load scripts only after consent. */

export const OPEN_SETTINGS_EVENT = "bewe4r-cookie-settings";

let current: Consent | null | undefined; // undefined = not read yet
let openRequested = false;
const listeners = new Set<() => void>();

function readStored(): Consent | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY));
  } catch {
    return null; // e.g. private mode: the choice then only counts for this visit
  }
}

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  if (current === undefined) current = readStored();
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function loadScript({ src, attrs }: ScriptSpec) {
  if (document.querySelector(`script[data-consent-src="${src}"]`)) return;
  // The voice widget is re-branded by a small script in index.html; start its fast watcher before the widget renders.
  if (src.includes("convai-widget-embed")) (window as Window & { __rebrandWidget?: () => void }).__rebrandWidget?.();
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.setAttribute("data-consent-src", src);
  for (const [name, value] of Object.entries(attrs ?? {})) script.setAttribute(name, value);
  document.body.appendChild(script);
}

/** Loads exactly the scripts the stored choice allows (no decision: none). */
export function applyConsent(consent: Consent | null = getConsent()) {
  if (typeof document === "undefined") return;
  for (const spec of allowedScripts(consent)) loadScript(spec);
}

/**
 * Returning visitors: the allowed scripts start on the first interaction, so they never compete with the first
 * paint, LCP or hydration. Real visitors trigger this within moments.
 */
export function applyConsentOnFirstInteraction() {
  if (!getConsent()) return;
  const events = ["pointerdown", "keydown", "touchstart", "scroll", "mousemove"] as const;
  const start = () => {
    events.forEach((e) => window.removeEventListener(e, start));
    applyConsent();
  };
  events.forEach((e) => window.addEventListener(e, start, { passive: true }));
}

export function saveConsent(choice: ConsentChoice): Consent {
  const previous = getConsent();
  const next = makeConsent(choice);
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
  } catch {
    // cannot be stored: counts for this visit
  }
  current = next;
  listeners.forEach((l) => l());
  // A script that is already running cannot be unloaded: reload when something is withdrawn.
  if (needsReload(previous, next)) window.location.reload();
  else applyConsent(next);
  return next;
}

export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, getConsent, () => null);
}

/** Opens the popup with the settings (e.g. from the footer link) so the choice can be changed any time. */
export function openCookieSettings() {
  openRequested = true;
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/** True once if the settings were requested before the popup finished loading. */
export function consumeOpenRequest(): boolean {
  const requested = openRequested;
  openRequested = false;
  return requested;
}
