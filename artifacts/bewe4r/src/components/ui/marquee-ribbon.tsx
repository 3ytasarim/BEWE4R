import { useTranslation } from "react-i18next";

const DEFAULT_ITEMS = ["PREMIUM QUALITY", "TEXTILE MANUFACTURER", "PREMIUM QUALITY"];

type BandProps = {
  items: string[];
  variant: "ink" | "bone";
  direction: "left" | "right";
  durationSec: number;
  t: (s: string) => string;
};

function Band({ items, variant, direction, durationSec, t }: BandProps) {
  const loop = [...items, ...items, ...items, ...items];
  const ink = variant === "ink";

  const bg = ink ? "bg-[#0f0f0f]" : "bg-[#e5e5e5]";
  const text = ink ? "text-[#f4efe3]" : "text-[#0f0f0f]";
  const dot = ink ? "bg-[#f4efe3]/50" : "bg-[#0f0f0f]/40";
  const anim = direction === "left" ? "animate-ribbon-left" : "animate-ribbon-right";

  return (
    <div className={`${bg} py-3.5 md:py-4 overflow-hidden`}>
      <div
        className={`flex w-max whitespace-nowrap ${anim}`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {loop.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span
              className={`font-display text-2xl md:text-3xl leading-none uppercase tracking-[0.06em] ${text}`}
            >
              {t(item)}
            </span>
            <span className={`mx-6 md:mx-8 h-1.5 w-1.5 shrink-0 rotate-45 ${dot}`} aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarqueeRibbon({
  items = DEFAULT_ITEMS,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  const { t } = useTranslation();

  const durationSec = Math.max(items.length, 1) * 8;

  return (
    <section
      aria-hidden
      className={`relative overflow-hidden py-8 md:py-12 bg-[#ffffff] ${className}`}
    >
      <div className="-rotate-2 scale-110">
        <Band items={items} variant="ink" direction="left" durationSec={durationSec} t={t} />
        <div className="-mt-px">
          <Band items={items} variant="bone" direction="right" durationSec={durationSec} t={t} />
        </div>
      </div>
    </section>
  );
}
