import { useId, type ReactElement } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { setLang, type Lang } from "@/i18n";

/* ── Flags (inline SVG, crisp at any size) ───────────────────────────── */

function FlagDE({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 5 3" className={className} preserveAspectRatio="none" aria-hidden>
      <rect width="5" height="3" fill="#000000" />
      <rect width="5" height="2" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

function FlagEN({ className = "" }: { className?: string }) {
  const raw = useId();
  const id = raw.replace(/[:]/g, "");
  const clip = `clip-${id}`;
  const tri = `tri-${id}`;
  return (
    <svg viewBox="0 0 60 30" className={className} preserveAspectRatio="none" aria-hidden>
      <clipPath id={clip}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={tri}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath={`url(#${tri})`}
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

/* ── Language options ────────────────────────────────────────────────── */

type LangOption = {
  code: Lang;
  short: string;
  name: string;
  Flag: (p: { className?: string }) => ReactElement;
};

const LANGS: LangOption[] = [
  { code: "en", short: "EN", name: "English", Flag: FlagEN },
  { code: "de", short: "DE", name: "Deutsch", Flag: FlagDE },
];

/* ── Modern sliding segmented switcher ───────────────────────────────── */

export function LanguageSwitcher({
  dark = false,
  size = "sm",
}: {
  dark?: boolean;
  size?: "sm" | "lg";
}) {
  const { i18n } = useTranslation();
  const current: Lang = i18n.language?.toLowerCase().startsWith("de") ? "de" : "en";

  const pillId = useId();
  const lg = size === "lg";

  const seg = lg ? "gap-2 px-3.5 py-2.5 text-[13px]" : "gap-1 px-1.5 py-0.5 text-[9px]";
  const flagBox = lg ? "h-[15px] w-[22px]" : "h-2 w-[13px]";

  const trackBg = dark
    ? "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.18)]"
    : "bg-[rgba(15,15,15,0.04)] border-[rgba(15,15,15,0.12)]";
  const pillBg = dark ? "bg-[#ffffff]" : "bg-[#0f0f0f]";

  return (
    <div
      role="group"
      aria-label="Language"
      data-testid="language-switcher"
      className={`relative inline-flex items-center rounded-full border p-0.5 backdrop-blur-sm ${trackBg}`}
    >
      {LANGS.map((l) => {
        const isActive = l.code === current;
        const activeText = dark ? "text-[#0f0f0f]" : "text-[#f4efe3]";
        const idleText = dark
          ? "text-[rgba(255,255,255,0.65)] hover:text-[#ffffff]"
          : "text-[rgba(15,15,15,0.5)] hover:text-[#0f0f0f]";
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={isActive}
            data-testid={`lang-${l.code}`}
            className={`relative inline-flex items-center rounded-full font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${seg} ${
              isActive ? activeText : idleText
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={`lang-pill-${pillId}`}
                className={`absolute inset-0 rounded-full ${pillBg}`}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span
                className={`relative ${flagBox} shrink-0 overflow-hidden rounded-[2px] ring-1 ${
                  isActive ? "ring-black/10" : dark ? "ring-white/20" : "ring-black/10"
                }`}
              >
                <l.Flag className="absolute inset-0 h-full w-full" />
              </span>
              {l.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}
