import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import showcaseHoodie from "@/assets/showcase-hoodie.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

type Hotspot = {
  id: string;
  x: number; // %
  y: number; // %
  title: string;
  detail: string;
};

const hotspots: Hotspot[] = [
  { id: "fabric", x: 28, y: 38, title: "Fabrics, cuts & colors", detail: "450 GSM heavyweight cotton fleece — your choice." },
  { id: "print", x: 52, y: 50, title: "Print & embroidery", detail: "Screen printing, DTG, DTF, embroidery — all under one roof." },
  { id: "label", x: 70, y: 28, title: "Your own label", detail: "Necktag, woven label, hangtag — your brand, everywhere." },
  { id: "price", x: 75, y: 70, title: "From €14–18", detail: "Per piece — depending on material and finishing." },
];

export function ProductShowcase() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<string | null>("fabric");

  return (
    <section className="py-16 border-t border-white/10 bg-white/2" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="order-2 lg:order-1">
            <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-4">{t("Create your product")}</p>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-none">
              {t("Every detail.")}<br />{t("Your decision.")}
            </h2>
            <p className="text-white/50 leading-relaxed mb-8 max-w-md">
              {t("From fabric choice to the final stitch — you decide how your product looks, feels and performs. We make it happen.")}
            </p>

            {/* Hotspot list */}
            <div className="space-y-2 mb-10">
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  onMouseEnter={() => setActive(h.id)}
                  onClick={() => setActive(h.id)}
                  className={`w-full text-left flex items-center gap-4 px-4 py-3 border transition-all ${
                    active === h.id
                      ? "border-white/40 bg-white/5"
                      : "border-white/10 bg-transparent hover:border-white/20"
                  }`}
                  data-testid={`showcase-hotspot-${h.id}`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs ${
                      active === h.id ? "border-white text-white bg-white/10" : "border-white/30 text-white/50"
                    }`}
                  >
                    {h.id === "price" ? "€" : "+"}
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm transition-colors ${active === h.id ? "text-white" : "text-white/70"}`}>
                      {t(h.title)}
                    </p>
                    {active === h.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-white/40 text-xs mt-1"
                      >
                        {t(h.detail)}
                      </motion.p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <Link href="/e-catalog" data-testid="showcase-cta">
              <span className="inline-block px-8 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
                {t("BEWE4R Services")}
              </span>
            </Link>
          </motion.div>

          {/* Image with annotation pins */}
          <motion.div variants={fadeUp} className="order-1 lg:order-2 relative">
            <div className="relative aspect-square bg-gradient-to-br from-white/5 to-white/2 border border-white/10 overflow-hidden">
              <img
                src={showcaseHoodie}
                alt={t("Custom Hoodie Showcase")}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {hotspots.map((h) => {
                const isActive = active === h.id;
                return (
                  <button
                    key={h.id}
                    onMouseEnter={() => setActive(h.id)}
                    onFocus={() => setActive(h.id)}
                    onClick={() => setActive(h.id)}
                    aria-label={t(h.title)}
                    className="absolute z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
                    style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
                    data-testid={`showcase-pin-${h.id}`}
                  >
                    {/* Pulsing ring */}
                    <span
                      className={`absolute inset-0 m-auto w-10 h-10 rounded-full border ${
                        isActive ? "border-white/60 animate-ping" : "border-white/30"
                      }`}
                      style={{ animationDuration: "2s" }}
                    />
                    {/* Pin */}
                    <span
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                        isActive ? "bg-white text-black scale-110" : "bg-black/80 text-white border border-white/40"
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {h.id === "price" ? "€" : "+"}
                      </span>
                    </span>

                    {/* Tooltip */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 top-full mt-3 -translate-x-1/2 bg-black border border-white/20 px-3 py-2 whitespace-nowrap pointer-events-none z-20"
                      >
                        <p className="text-white text-xs font-medium">{t(h.title)}</p>
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
