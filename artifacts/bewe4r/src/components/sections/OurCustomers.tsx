import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { useInView } from "framer-motion";
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

// Light/white logos that need a dark plate on the white background
const LIGHT_LOGOS = ["voidwear", "twtu", "blackmoneyclo", "quels"];
function isLightLogo(name: string) {
  return LIGHT_LOGOS.includes(name.toLowerCase().replace(/\s+/g, ""));
}

export function OurCustomers() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch("/api/brands", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Brand[]) => setBrands(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("[OurCustomers] fetch failed:", err);
        setBrands([]);
      });
  }, []);

  // Fallback so logos always render while DB fetch is in flight
  const displayBrands = brands.length > 0 ? brands : [
    { id: 1, name: "Aryan", logoUrl: "/brands/aryan.png", website: null, sortOrder: 1 },
    { id: 2, name: "Black Money Clo", logoUrl: "/brands/black-money-clo.png", website: null, sortOrder: 2 },
    { id: 3, name: "Voidwear", logoUrl: "/brands/voidwear.png", website: null, sortOrder: 3 },
    { id: 4, name: "TWTU", logoUrl: "/brands/twtu.png", website: null, sortOrder: 4 },
    { id: 5, name: "Quels", logoUrl: "/brands/quels.png", website: null, sortOrder: 5 },
  ];

  // Sort for row directions: top row asc, bottom row desc
  const sorted = [...displayBrands].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const topRow = [...sorted, ...sorted];
  const bottomRow = [...sorted].reverse();
  const bottomLoop = [...bottomRow, ...bottomRow];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 border-t border-black/10 overflow-hidden"
    >
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
        <div
          className={`flex w-full overflow-hidden group/marquee-top transition-opacity duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
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
                  className={`flex items-center justify-center transition-transform duration-500 ease-out group-hover/logo:scale-110 ${
                    isLightLogo(c.name)
                      ? "bg-[#0f0f0f] rounded-[2px] px-8 py-6"
                      : ""
                  }`}
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
        <div
          className={`flex w-full overflow-hidden group/marquee-bottom transition-opacity duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
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
                  className={`flex items-center justify-center transition-transform duration-500 ease-out group-hover/logo:scale-110 ${
                    isLightLogo(c.name)
                      ? "bg-[#0f0f0f] rounded-[2px] px-8 py-6"
                      : ""
                  }`}
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
