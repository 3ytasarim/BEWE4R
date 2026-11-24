import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { ChevronDown, Cookie, X } from "lucide-react";
import { ACCEPT_ALL, REJECT_ALL, showsBannerOn, type ConsentCategory, type ConsentChoice } from "@/lib/consent";
import { OPEN_SETTINGS_EVENT, consumeOpenRequest, saveConsent, useConsent } from "@/lib/consentStore";

type Copy = {
  title: string;
  intro: string;
  privacy: string;
  acceptAll: string;
  onlyNecessary: string;
  settings: string;
  save: string;
  close: string;
  alwaysOn: string;
  necessary: [string, string];
  statistics: [string, string];
  replay: [string, string];
  assistant: [string, string];
};

const COPY: Record<"en" | "de", Copy> = {
  en: {
    title: "Your privacy",
    intro:
      "We use strictly necessary cookies. If you agree, we also analyze how you use our website and record your browsing session.",
    privacy: "Privacy policy",
    acceptAll: "Accept all",
    onlyNecessary: "Necessary only",
    settings: "Settings",
    save: "Save selection",
    close: "Close",
    alwaysOn: "Always on",
    necessary: ["Necessary", "Your language setting and this cookie choice, stored in your browser."],
    statistics: ["Statistics", "Counts page views so we can see which content is used. No cookies, on our own analytics server."],
    replay: ["Session recording", "Records clicks, scrolling and mouse movement so we can improve usability."],
    assistant: ["Voice assistant", "Loads our voice assistant from external servers (unpkg.com, ElevenLabs). Your IP address is sent to them."],
  },
  de: {
    title: "Deine Privatsphäre",
    intro:
      "Wir verwenden ausschließlich notwendige Cookies. Mit deiner Zustimmung analysieren wir außerdem, wie du unsere Website nutzt, und zeichnen deine Browsersitzung auf.",
    privacy: "Datenschutzerklärung",
    acceptAll: "Alle akzeptieren",
    onlyNecessary: "Nur notwendige",
    settings: "Einstellungen",
    save: "Auswahl speichern",
    close: "Schließen",
    alwaysOn: "Immer aktiv",
    necessary: ["Notwendig", "Deine Spracheinstellung und diese Cookie-Auswahl, gespeichert in deinem Browser."],
    statistics: ["Statistik", "Zählt Seitenaufrufe, damit wir sehen, welche Inhalte genutzt werden. Ohne Cookies, auf unserem eigenen Analytics-Server."],
    replay: ["Sitzungsaufzeichnung", "Zeichnet Klicks, Scrollen und Mausbewegungen auf, damit wir die Bedienung verbessern können."],
    assistant: ["Sprachassistent", "Lädt unseren Sprachassistenten von externen Servern (unpkg.com, ElevenLabs). Deine IP-Adresse wird dorthin übertragen."],
  },
};

const ROWS: ConsentCategory[] = ["statistics", "replay", "assistant"];
const BLUE = "bg-[#0047ab] text-[#ffffff] hover:bg-[#003a8c] focus-visible:ring-[#0047ab]";

/**
 * Cookie popup, bottom left. Until the visitor decides, no tracking or third-party script is loaded. "Necessary only"
 * and "Accept all" are equally big and equally easy to reach. The choice can be changed any time via the footer link.
 * Colours follow the bleibsichtbar "newdesign" site (cobalt #0047ab). Literal hex values on purpose: on this site the
 * theme tokens (bg-white, text-black, ...) are inverted.
 */
export default function CookieBanner() {
  const { i18n } = useTranslation();
  const copy = COPY[i18n.language?.toLowerCase().startsWith("de") ? "de" : "en"];
  const consent = useConsent();
  const [location] = useLocation();

  const [ready, setReady] = useState(false);
  const [reopened, setReopened] = useState(false);
  const [details, setDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>(REJECT_ALL);
  const cardRef = useRef<HTMLDivElement>(null);

  // Shown shortly after load: does not disturb the first impression or the load-time measurement.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  const consentRef = useRef(consent);
  consentRef.current = consent;

  // "Cookie settings" in the footer opens the popup with the current state.
  useEffect(() => {
    const open = () => {
      consumeOpenRequest();
      const c = consentRef.current;
      setDraft(c ? { statistics: c.statistics, replay: c.replay, assistant: c.assistant } : REJECT_ALL);
      setDetails(true);
      setReopened(true);
    };
    if (consumeOpenRequest()) open();
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const visible = reopened || (ready && consent === null && showsBannerOn(location));

  // Reopened by the visitor: move focus into the popup, Escape closes it.
  useEffect(() => {
    if (!reopened) return;
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setReopened(false);
        setDetails(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reopened]);

  if (!visible) return null;

  const decide = (choice: ConsentChoice) => {
    saveConsent(choice);
    setReopened(false);
    setDetails(false);
  };

  const toggleDetails = () => {
    if (!details) setDraft(consent ? { statistics: consent.statistics, replay: consent.replay, assistant: consent.assistant } : REJECT_ALL);
    setDetails((d) => !d);
  };

  return (
    <div
      ref={cardRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-intro"
      data-testid="cookie-banner"
      className="fixed bottom-2.5 left-2.5 right-2.5 z-[90] font-sans normal-case outline-none animate-in fade-in slide-in-from-bottom-3 duration-500 motion-reduce:animate-none sm:bottom-4 sm:left-4 sm:right-auto sm:w-[340px]"
    >
      <div className="max-h-[calc(100svh-1.25rem)] overflow-y-auto rounded-2xl border border-[#dbe4f3] bg-[#ffffff] p-4 text-[#111111] shadow-[0_18px_44px_-16px_rgba(0,40,110,0.35)]">
        <div className="flex items-start gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#0047ab]/10 text-[#0047ab]" aria-hidden="true">
            <Cookie className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="cookie-title" className="font-display text-[22px] leading-none tracking-wide text-[#0a1b3d]">
              {copy.title}
            </h2>
            <p id="cookie-intro" className="mt-1.5 text-[12.5px] leading-[1.45] text-[#4a5568]">
              {copy.intro}{" "}
              <Link href="/privacy" className="whitespace-nowrap font-medium text-[#0047ab] underline-offset-2 hover:underline">
                {copy.privacy}
              </Link>
            </p>
          </div>
          {reopened && (
            <button
              type="button"
              onClick={() => {
                setReopened(false);
                setDetails(false);
              }}
              aria-label={copy.close}
              className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#4a5568] transition-colors hover:bg-[#0047ab]/10 hover:text-[#0047ab] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047ab]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Settings: the height eases open (grid-rows), no layout jump */}
        <div className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${details ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden" aria-hidden={!details} inert={!details}>
            <ul className="mt-3 divide-y divide-[#e8edf6] rounded-xl border border-[#e8edf6] bg-[#f7f9fd]">
              <Row id="necessary" title={copy.necessary[0]} text={copy.necessary[1]} locked lockedLabel={copy.alwaysOn} />
              {ROWS.map((key) => (
                <Row
                  key={key}
                  id={key}
                  title={copy[key][0]}
                  text={copy[key][1]}
                  checked={draft[key]}
                  onChange={(v) => setDraft((d) => ({ ...d, [key]: v }))}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => decide(REJECT_ALL)}
            className="h-10 rounded-full border border-[#0047ab]/30 px-3 text-[13px] font-semibold text-[#0a1b3d] transition-colors hover:bg-[#0047ab]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047ab]"
          >
            {copy.onlyNecessary}
          </button>
          <button
            type="button"
            onClick={() => decide(ACCEPT_ALL)}
            className={`h-10 rounded-full px-3 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${BLUE}`}
          >
            {copy.acceptAll}
          </button>
        </div>

        <div className="mt-1.5 flex items-center justify-between">
          <button
            type="button"
            onClick={toggleDetails}
            aria-expanded={details}
            className="inline-flex h-8 items-center gap-1 rounded-full px-2 text-[12.5px] font-medium text-[#0047ab] transition-colors hover:bg-[#0047ab]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047ab]"
          >
            {copy.settings}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${details ? "rotate-180" : ""}`} />
          </button>
          {details && (
            <button
              type="button"
              onClick={() => decide(draft)}
              className="h-8 rounded-full px-3 text-[12.5px] font-semibold text-[#0047ab] transition-colors hover:bg-[#0047ab]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047ab]"
            >
              {copy.save}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  id,
  title,
  text,
  checked = true,
  onChange,
  locked,
  lockedLabel,
}: {
  id: string;
  title: string;
  text: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  locked?: boolean;
  lockedLabel?: string;
}) {
  const labelId = `cookie-${id}-label`;
  return (
    <li className="flex items-start gap-3 px-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p id={labelId} className="text-[12.5px] font-semibold text-[#0a1b3d]">
          {title}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-snug text-[#5b6577]">{text}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={labelId}
          disabled={locked}
          onClick={() => onChange?.(!checked)}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047ab] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
            checked ? "bg-[#0047ab]" : "bg-[#c5cede]"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-[#ffffff] shadow transition-transform motion-reduce:transition-none ${checked ? "translate-x-4" : "translate-x-0"}`}
          />
        </button>
        {locked && <span className="text-[11px] text-[#5b6577]">{lockedLabel}</span>}
      </div>
    </li>
  );
}
