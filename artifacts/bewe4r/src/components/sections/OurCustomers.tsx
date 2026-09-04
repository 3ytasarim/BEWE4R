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
  const topRow = [...sorted, ...sorted];
  const bottomRow = [...sorted].reverse();
  const bottomLoop = [...bottomRow, ...bottomRow];

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

      <div className="relative space-y-10">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#ffffff] via-[#ffffff]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#ffffff] via-[#ffffff]/80 to-transparent z-20 pointer-events-none" />

        {/* Top row: left to right */}
        <div className="flex w-full overflow-hidden group/marquee-top">
          <div className="flex shrink-0 items-center animate-marquee group-hover/marquee-top:[animation-play-state:paused] group-hover/marquee-bottom:[animation-play-state:paused] gap-16 md:gap-24 px-8">
            {topRow.map((c, i) => (
              <div
                key={`top-${c.name}-${i}`}
                aria-hidden={i >= sorted.length || undefined}
                className="group/logo flex-shrink-0 flex items-center justify-center"
                style={{ width: "clamp(200px, 22vw, 280px)" }}
                data-testid={`customer-logo-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <Link
                  href={CUSTOMER_CTA_HREF}
                  aria-label={`${c.name} — ${t("Start your sample")}`}
                  tabIndex={i >= sorted.length ? -1 : undefined}
                  className="flex items-center justify-center transition-transform duration-500 ease-out group-hover/logo:scale-110"
                >
                  <img
                    src={c.logoUrl}
                    alt={c.name}
                    loading="lazy"
                    draggable={false}
                    className="max-w-full max-h-[110px] md:max-h-[140px] object-contain select-none"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: right to left (reverse marquee) */}
        <div className="flex w-full overflow-hidden group/marquee-bottom">
          <div className="flex shrink-0 items-center animate-marquee-reverse group-hover/marquee-top:[animation-play-state:paused] group-hover/marquee-bottom:[animation-play-state:paused] gap-16 md:gap-24 px-8">
            {bottomLoop.map((c, i) => (
              <div
                key={`bottom-${c.name}-${i}`}
                aria-hidden={i >= bottomRow.length || undefined}
                className="group/logo flex-shrink-0 flex items-center justify-center"
                style={{ width: "clamp(200px, 22vw, 280px)" }}
              >
                <Link
                  href={CUSTOMER_CTA_HREF}
                  aria-label={`${c.name} — ${t("Start your sample")}`}
                  tabIndex={i >= bottomRow.length ? -1 : undefined}
                  className="flex items-center justify-center transition-transform duration-500 ease-out group-hover/logo:scale-110"
                >
                  <img
                    src={c.logoUrl}
                    alt={c.name}
                    loading="lazy"
                    draggable={false}
                    className="max-w-full max-h-[110px] md:max-h-[140px] object-contain select-none"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
