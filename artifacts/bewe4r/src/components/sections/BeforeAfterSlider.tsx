import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import compareBlank from "@/assets/hoodie-blank.png";
import comparePrinted from "@/assets/hoodie-printed.png";
import { SectionHeading } from "@/components/sections/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export function BeforeAfterSlider() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
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
    <section className="py-16 bg-[#0f0f0f] text-[#ffffff]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <SectionHeading
            kicker={t("Before · After")}
            title={t("From blank\nto branded product.")}
            description={t("Drag the slider to see how a premium blank becomes your finished product — with print, embroidery and your label.")}
            watermark={t("Compare")}
            size="xl"
            className="mb-12 max-w-4xl"
          />

          <motion.div variants={fadeUp}>
            <div
              ref={containerRef}
              role="slider"
              aria-label={t("Compare blank with printed product")}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              tabIndex={0}
              className="relative w-full aspect-[16/10] bg-white border border-white/10 overflow-hidden select-none cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-white/40"
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
              data-testid="compare-slider"
            >
              {/* Printed (after) — full background */}
              <img
                src={comparePrinted}
                alt={t("Printed product")}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                draggable={false}
              />

              {/* Blank (before) — clipped via clip-path so layout matches the after image perfectly */}
              <img
                src={compareBlank}
                alt={t("Blank product")}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                draggable={false}
              />

              {/* Labels — text-white maps to ink so labels stay dark on the light shirt photos */}
              <div className="absolute top-6 left-6 text-xs uppercase tracking-widest text-white/60 font-medium pointer-events-none">
                {t("Blank")}
              </div>
              <div className="absolute top-6 right-6 text-xs uppercase tracking-widest text-white/60 font-medium pointer-events-none">
                {t("Stitching & Print")}
              </div>

              {/* Divider line + handle */}
              <div
                className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] pointer-events-none"
                style={{ left: `${position}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-black/10 text-black flex items-center justify-center shadow-lg pointer-events-none"
                style={{ left: `${position}%` }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                  <polyline points="9 18 3 12 9 6" transform="translate(12 0)" />
                </svg>
              </div>
            </div>

            <p className="text-white/30 text-xs uppercase tracking-widest text-center mt-6">
              {t("← Drag to compare →")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
