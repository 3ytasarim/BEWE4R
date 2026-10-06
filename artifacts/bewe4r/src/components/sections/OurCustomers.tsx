import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";

// Every customer logo links here
const CUSTOMER_CTA_HREF = "/your-brand/sample";

type Brand = {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  sortOrder: number | null;
};

// Repeat the row's items enough times to comfortably fill the track, then
// triple it — the CSS animation always moves by exactly 1/3 of the track
// width, so a tripled track loops with no visible seam/snap.
function buildTrack(items: Brand[]) {
  if (items.length === 0) return [];
  const repeats = Math.max(1, Math.ceil(10 / items.length));
  const base = Array.from({ length: repeats }, () => items).flat();
  return [...base, ...base, ...base];
}

function LogoCard({
  brand,
  focusable,
  t,
}: {
  brand: Brand;
  focusable: boolean;
  t: (key: string) => string;
}) {
  return (
    <div
      aria-hidden={focusable ? undefined : true}
      className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center h-20"
      data-testid={`customer-logo-${brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <Link
        href={CUSTOMER_CTA_HREF}
        aria-label={`${brand.name} — ${t("Start your sample")}`}
        tabIndex={focusable ? undefined : -1}
        className="flex items-center justify-center select-none"
      >
        <img
          src={brand.logoUrl}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ height: 68, width: "auto", maxWidth: 210 }}
          className="object-contain grayscale drop-shadow-[0_2px_6px_rgba(10,31,68,0.12)] transition-all duration-300 hover:grayscale-0 hover:drop-shadow-[0_4px_10px_rgba(10,31,68,0.18)]"
        />
      </Link>
    </div>
  );
}

export function OurCustomers() {
  const { t } = useTranslation();
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    let cancelled = false;
    let attempt = 0;
    const MAX_ATTEMPTS = 5;

    const load = async () => {
      try {
        const r = await fetch("/api/brands", { cache: "no-store" });
        const contentType = r.headers.get("content-type") || "";
        if (!r.ok || !contentType.includes("application/json")) {
          throw new Error(`Unexpected response ${r.status} (${contentType})`);
        }
        const data = await r.json();
        if (!cancelled && Array.isArray(data)) setBrands(data);
      } catch (err) {
        if (cancelled) return;
        attempt += 1;
        if (attempt < MAX_ATTEMPTS) {
          setTimeout(load, 1000 * attempt); // retry: 1s, 2s, 3s, 4s
        } else {
          console.error("[OurCustomers] fetch failed after retries:", err);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // No brands in the CMS -> hide the section entirely
  if (brands.length === 0) return null;

  // Sort for row directions: top row asc, bottom row desc
  const sorted = [...brands].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const bottomSorted = [...sorted].reverse();
  const topTrack = buildTrack(sorted);
  const bottomTrack = buildTrack(bottomSorted);

  return (
    <section className="relative py-20 md:py-24 border-t border-black/10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 mb-14 md:mb-20">
        <SectionHeading
          kicker={t("Trusted by")}
          title={t("Our Customer")}
          watermark={t("Clients")}
          align="center"
          size="lg"
        />
      </div>

      <div className="relative flex flex-col gap-1">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#ffffff] via-[#ffffff]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#ffffff] via-[#ffffff]/80 to-transparent z-20 pointer-events-none" />

        {/* Top row: left to right */}
        <div className="relative overflow-hidden group/marquee-top">
          <div className="flex shrink-0 items-center animate-marquee group-hover/marquee-top:[animation-play-state:paused] group-hover/marquee-bottom:[animation-play-state:paused]">
            {topTrack.map((c, i) => (
              <LogoCard key={`top-${c.name}-${i}`} brand={c} focusable={i < sorted.length} t={t} />
            ))}
          </div>
        </div>

        {/* Bottom row: right to left (reverse marquee) */}
        <div className="relative overflow-hidden group/marquee-bottom">
          <div className="flex shrink-0 items-center animate-marquee-reverse group-hover/marquee-top:[animation-play-state:paused] group-hover/marquee-bottom:[animation-play-state:paused]">
            {bottomTrack.map((c, i) => (
              <LogoCard key={`bottom-${c.name}-${i}`} brand={c} focusable={i < bottomSorted.length} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
