import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import compareBlank from "@/assets/hoodie-blank.png";
import comparePrinted from "@/assets/hoodie-printed.png";
import showcaseHoodieDetail from "@/assets/showcase-hoodie-detail.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

type Hotspot = { id: string; x: number; y: number; kicker: string; title: string; detail: string };

const hotspots: Hotspot[] = [
  { id: "label", x: 50, y: 18, kicker: "Material", title: "Choose Your Fabric", detail: "Premium heavyweight cotton, fleece, terry & more — pick your base." },
  { id: "fabric", x: 33, y: 39, kicker: "Finishing", title: "Choose Your Print Style", detail: "Screen print, DTG, DTF, embroidery & appliqué." },
  { id: "print", x: 50, y: 53, kicker: "Weight", title: "Choose Your GSM", detail: "From lightweight to 450 GSM heavyweight — set the weight." },
  { id: "price", x: 62, y: 72, kicker: "Customization", title: "Choose Every Detail", detail: "Fit, label, hangtag, finishing — every detail is yours." },
];

function BlankToBrandCard() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const onTouch = (e: TouchEvent) => e.touches[0] && updateFromClientX(e.touches[0].clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging]);

  return (
    <motion.div variants={fadeUp} className="flex flex-col">
      <div className="mb-6 min-h-[3rem] md:min-h-[3.75rem] flex flex-col justify-end items-center text-center">
        <h3
          className="font-display leading-none bg-clip-text text-transparent whitespace-nowrap"
          style={{
            fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)",
            backgroundImage:
              "linear-gradient(100deg, #0f0f0f 0%, #0f0f0f 42%, #7d7d7d 50%, #0f0f0f 58%, #0f0f0f 100%)",
            backgroundSize: "300% 100%",
            animation: "shine-sweep 3s linear infinite",
          }}
        >
          {t("From Blank to Brand")}
        </h3>
      </div>

      <div
        ref={containerRef}
        role="slider"
        aria-label={t("Compare blank with printed product")}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        className="relative w-full aspect-square bg-white border border-white/10 overflow-hidden select-none cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-white/40"
        onMouseDown={(e) => {
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          setDragging(true);
          if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); setPosition((p) => Math.max(0, p - 5)); }
          if (e.key === "ArrowRight") { e.preventDefault(); setPosition((p) => Math.min(100, p + 5)); }
          if (e.key === "Home") { e.preventDefault(); setPosition(0); }
          if (e.key === "End") { e.preventDefault(); setPosition(100); }
        }}
        data-testid="duo-compare-slider"
      >
        <img
          src={comparePrinted}
          alt={t("Finished BEWE4R hoodie")}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        <img
          src={compareBlank}
          alt={t("Concept sketch")}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          draggable={false}
        />

        <div className="absolute top-5 left-5 text-[11px] uppercase tracking-widest text-white/60 font-medium pointer-events-none">
          {t("Concept")}
        </div>
        <div className="absolute top-5 right-5 text-[11px] uppercase tracking-widest text-white/60 font-medium pointer-events-none">
          {t("Finished")}
        </div>

        <div
          className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] pointer-events-none"
          style={{ left: `${position}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white border-2 border-black/10 text-black flex items-center justify-center shadow-lg pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" transform="translate(12 0)" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function EveryDetailCard() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string>("label");
  const [paused, setPaused] = useState(false);

  // Auto-cycle through the hotspots so the card feels alive — pauses on interaction.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((cur) => {
        const i = hotspots.findIndex((h) => h.id === cur);
        return hotspots[(i + 1) % hotspots.length].id;
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  return (
    <motion.div variants={fadeUp} className="flex flex-col">
      <div className="mb-6 min-h-[3rem] md:min-h-[3.75rem] flex flex-col justify-end items-center text-center">
        <h3
          className="font-display leading-none bg-clip-text text-transparent whitespace-nowrap"
          style={{
            fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)",
            backgroundImage:
              "linear-gradient(100deg, #0f0f0f 0%, #0f0f0f 42%, #7d7d7d 50%, #0f0f0f 58%, #0f0f0f 100%)",
            backgroundSize: "300% 100%",
            animation: "shine-sweep 3s linear infinite",
          }}
        >
          {t("Every Detail. Your Decision.")}
        </h3>
      </div>

      <div
        className="relative aspect-square overflow-hidden bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
        onMouseLeave={() => setPaused(false)}
      >
        {/* Soft spotlight + faint grid backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(255,255,255,0.07), transparent 72%)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
          }}
        />

        {/* Floating layer holds the garment AND the pins so they move together */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: 1.12 }}
          animate={reduceMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={showcaseHoodieDetail}
            alt="Custom distressed hoodie"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />

          {hotspots.map((h) => {
            const isActive = active === h.id;
            const below = h.y < 55;
            return (
              <div
                key={h.id}
                className="absolute z-10"
                style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <button
                  onMouseEnter={() => { setActive(h.id); setPaused(true); }}
                  onFocus={() => { setActive(h.id); setPaused(true); }}
                  onBlur={() => setPaused(false)}
                  onClick={() => { setActive(h.id); setPaused(true); }}
                  aria-label={`${t(h.title)} — ${t(h.detail)}`}
                  className="relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(244,239,227,0.9)] rounded-full"
                  data-testid={`duo-pin-${h.id}`}
                >
                  {/* Soft glow — white at rest, brighter when active */}
                  <span
                    aria-hidden
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full pointer-events-none transition-all duration-300"
                    style={{
                      boxShadow: isActive
                        ? "0 0 26px 5px rgba(255,255,255,0.28)"
                        : "0 0 16px 3px rgba(255,255,255,0.18)",
                    }}
                  />
                  {/* Pulsing ring — always blinking for a modern, live feel */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 m-auto w-9 h-9 rounded-full border animate-ping ${
                      isActive ? "border-[rgba(255,255,255,0.8)]" : "border-[rgba(255,255,255,0.45)]"
                    }`}
                    style={{ animationDuration: "2s" }}
                  />
                  {/* Steady ring so a ring stays visible between ping pulses */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 m-auto w-9 h-9 rounded-full border pointer-events-none ${
                      isActive ? "border-[rgba(255,255,255,0.5)]" : "border-[rgba(255,255,255,0.25)]"
                    }`}
                  />
                  {/* Core */}
                  <span
                    className={`relative flex items-center justify-center w-9 h-9 rounded-full border backdrop-blur-sm transition-all duration-300 ${
                      isActive
                        ? "bg-[#f4efe3] border-[#f4efe3] scale-110"
                        : "bg-[rgba(15,15,15,0.5)] border-[rgba(255,255,255,0.55)]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke={isActive ? "#0f0f0f" : "#ffffff"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`transition-transform duration-300 ${isActive ? "rotate-45" : ""}`}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                {/* Info card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: below ? -8 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: below ? -8 : 8 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-[rgba(13,13,13,0.85)] backdrop-blur-md border border-[rgba(255,255,255,0.18)] px-3 py-1.5 pointer-events-none z-20 ${
                        below ? "top-full mt-5" : "bottom-full mb-5"
                      }`}
                    >
                      <span
                        className="font-display uppercase text-[12px] tracking-[0.12em] bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(100deg, #ffffff 0%, #ffffff 42%, rgba(255,255,255,0.45) 50%, #ffffff 58%, #ffffff 100%)",
                          backgroundSize: "300% 100%",
                          animation: "shine-sweep 3s linear infinite",
                        }}
                      >
                        {t(h.title)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProductDuo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 border-t border-white/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start"
        >
          <BlankToBrandCard />
          <EveryDetailCard />
        </motion.div>
      </div>
    </section>
  );
}
