import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";

type Brand = {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  sortOrder: number | null;
};

// Lightweight light-logo heuristic (same as before: white logos need dark plate)
const LIGHT_LOGOS = ["voidwear", "twtu"];
function isLightLogo(name: string) {
  return LIGHT_LOGOS.includes(name.toLowerCase().replace(/\s+/g, ""));
}

export function BrandReferences() {
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
        console.error("[BrandReferences] fetch failed:", err);
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

  // Triple the array for seamless loop (paired with -33.33% translate)
  const loopBrands = [...displayBrands, ...displayBrands, ...displayBrands];

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-12 border-t border-white/10 overflow-hidden bg-black"
    >
      {/* === LIGHTWEIGHT BACKGROUND === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Static layered radial gradients — no animation, no blur filter */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 800px 600px at 15% 20%, rgba(0,0,0,0.05), transparent 60%), radial-gradient(ellipse 700px 500px at 85% 70%, rgba(0,0,0,0.04), transparent 60%), radial-gradient(ellipse 500px 400px at 50% 100%, rgba(0,0,0,0.03), transparent 55%)",
          }}
        />

        {/* Static mesh dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top + bottom hairlines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* === HEADER === */}
      <div className="relative max-w-7xl mx-auto px-6 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
          <div className="md:col-span-7">
            <SectionHeading
              kicker={t("Trusted by")}
              title={t("Brands that\nproduce with us.")}
              watermark={t("Brands")}
              size="xl"
            />
          </div>
          <div className="md:col-span-5 md:pb-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 backdrop-blur-sm"
            >
              {[
                { v: "30+", l: "Brands" },
                { v: "120k", l: "Pieces" },
                { v: "2019", l: "Since" },
              ].map((s) => (
                <div key={s.l} className="bg-black/80 backdrop-blur-md p-4 text-center">
                  <p className="font-display text-2xl md:text-3xl text-white leading-none">
                    {s.v}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mt-2 font-mono">
                    {t(s.l)}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* === MARQUEE === */}
      <div className="relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-56 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-56 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        <div
          className="relative flex w-full overflow-hidden group/marquee"
          style={{ height: "clamp(280px, 32vw, 420px)" }}
        >
          <div className="flex shrink-0 items-stretch animate-marquee group-hover/marquee:[animation-play-state:paused] gap-6 md:gap-8 px-6">
            {loopBrands.map((brand, i) => {
              const idx = (i % brands.length) + 1;
              return (
                <div
                  key={`${brand.name}-${i}`}
                  className="group/card relative flex-shrink-0 flex flex-col items-center justify-center transition-all duration-700 hover:-translate-y-1"
                  style={{ width: "clamp(320px, 32vw, 460px)" }}
                  data-testid={`brand-card-${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {/* Frame layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-transparent border border-white/10 group-hover/card:border-white/40 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-white/0 group-hover/card:bg-white/[0.025] transition-colors duration-700" />

                  {/* Inner glow ring on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(0,0,0,0.06), transparent 70%)",
                      }}
                    />
                  </div>

                  {/* Top corner cuts */}
                  <span className="absolute top-3 left-3 w-3.5 h-3.5 border-l border-t border-white/30 group-hover/card:border-white transition-all duration-500 group-hover/card:w-5 group-hover/card:h-5" />
                  <span className="absolute top-3 right-3 w-3.5 h-3.5 border-r border-t border-white/30 group-hover/card:border-white transition-all duration-500 group-hover/card:w-5 group-hover/card:h-5" />
                  <span className="absolute bottom-3 left-3 w-3.5 h-3.5 border-l border-b border-white/30 group-hover/card:border-white transition-all duration-500 group-hover/card:w-5 group-hover/card:h-5" />
                  <span className="absolute bottom-3 right-3 w-3.5 h-3.5 border-r border-b border-white/30 group-hover/card:border-white transition-all duration-500 group-hover/card:w-5 group-hover/card:h-5" />

                  {/* Top meta row */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-mono">
                      {String(idx).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Logo — BIG and clearly visible. Plate + logo share one
                      wrapper so the dark plate scales with the logo on hover
                      and white pixels never bleed onto the bone surface. */}
                  <div className="relative flex items-center justify-center w-full h-full px-6 py-16">
                    <div
                      className={`relative inline-flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-110 ${
                        isLightLogo(brand.name) ? "bg-[#0f0f0f] rounded-[2px] px-10 py-8" : ""
                      }`}
                    >
                      <img
                        src={brand.logoUrl}
                        alt={brand.name}
                        loading="lazy"
                        className="max-w-[260px] max-h-[150px] object-contain"
                        style={{
                          filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.15))",
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom meta row */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-white/70 group-hover/card:text-white transition-colors duration-500 font-mono font-medium">
                      {brand.name}
                    </span>
                  </div>

                  {/* Bottom progress hairline that draws on hover */}
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-white origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* === FOOTER === */}
      <div className="relative max-w-7xl mx-auto px-6 mt-16 md:mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-2xl">
          {t("Young streetwear brands, established labels and premium drops — they all trust our studio in Istanbul. Become part of this list.")}
        </p>
        <div className="flex items-center gap-3">
          <span className="block w-10 h-px bg-white/30" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-mono">
            {t("Pause on hover")}
          </span>
        </div>
      </div>
    </section>
  );
}
