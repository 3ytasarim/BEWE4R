import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { PrimaryCTA } from "@/components/ui/cta-button";

const INK = "#0f0f0f";
const BONE = "#ffffff";

type Step = { n: string; label: string; x: number; y: number };

/* Node points lie exactly on the arc:
   circle center (500, 491.06), r = 421.1, apex (500, 70) */
const STEPS: Step[] = [
  { n: "1", label: "Send your Request", x: 130, y: 290 },
  { n: "2", label: "Consultation", x: 259, y: 146 },
  { n: "3", label: "Sample / Bulk", x: 741, y: 146 },
  { n: "4", label: "Logistics & Shipping", x: 870, y: 290 },
];

/* Shorter labels for the mobile arc so they stay legible and never overflow
   the arc's narrow ends when the SVG is scaled down to a phone width. */
const STEPS_SHORT: Step[] = [
  { n: "1", label: "Request", x: 130, y: 290 },
  { n: "2", label: "Consult", x: 259, y: 146 },
  { n: "3", label: "Sample", x: 741, y: 146 },
  { n: "4", label: "Shipping", x: 870, y: 290 },
];

const ARC_D = "M130 290 A 421.1 421.1 0 0 1 870 290";
/* Wider, flatter arc for desktop — reaches closer to the frame edges so the
   ellipse spans more horizontally (same apex height, larger radius). */
const ARC_D_WIDE = "M40 290 A 605 605 0 0 1 960 290";
const TRAVEL_DUR = 12; // seconds for one full left -> right pass

type ArcSvgProps = {
  steps: Step[];
  arcId: string;
  arcD: string;
  numFont: number;
  labelFont: number;
  radius: number;
  labelDy: number;
  inView: boolean;
  reduceMotion: boolean | null;
};

function ArcSvg({ steps, arcId, arcD, numFont, labelFont, radius, labelDy, inView, reduceMotion }: ArcSvgProps) {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 1000 340" className="w-full h-auto overflow-visible" role="img" aria-label={t("How to start — four step process")}>
      {/* base arc (draws in on view) */}
      <motion.path
        id={arcId}
        d={arcD}
        fill="none"
        stroke={INK}
        strokeOpacity={0.18}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* numbered nodes continuously travel left -> right along the arc,
         evenly phase-offset, each carrying its label upright */}
      {steps.map((s, i) => {
        const begin = `${-(TRAVEL_DUR / steps.length) * i}s`;
        return (
          <g
            key={s.n}
            transform={reduceMotion ? `translate(${s.x} ${s.y})` : undefined}
          >
            {!reduceMotion && (
              <>
                <animateMotion
                  dur={`${TRAVEL_DUR}s`}
                  begin={begin}
                  repeatCount="indefinite"
                  calcMode="linear"
                  rotate="0"
                >
                  <mpath href={`#${arcId}`} xlinkHref={`#${arcId}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  dur={`${TRAVEL_DUR}s`}
                  begin={begin}
                  repeatCount="indefinite"
                  values="0;1;1;1;0"
                  keyTimes="0;0.08;0.5;0.92;1"
                />
              </>
            )}

            {/* tick from node up to label */}
            <line x1={0} y1={-(radius + 2)} x2={0} y2={labelDy + 6} stroke={INK} strokeOpacity={0.35} strokeWidth={1} />
            <circle cx={0} cy={0} r={radius} fill={BONE} stroke={INK} strokeWidth={1.5} />
            <text
              x={0}
              y={1}
              textAnchor="middle"
              dominantBaseline="central"
              fill={INK}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: `${numFont}px`, letterSpacing: "0.04em" }}
            >
              {s.n}
            </text>
            <text
              x={0}
              y={labelDy}
              textAnchor="middle"
              fill={INK}
              fillOpacity={0.7}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: `${labelFont}px`, fontWeight: 500, letterSpacing: "0.04em" }}
            >
              {t(s.label)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function HowToStart() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section className="pt-24 md:pt-44 pb-24 md:pb-[220px] border-t border-white/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* DESKTOP — animated half-moon arc with the content nestled in the arch */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          <ArcSvg
            steps={STEPS}
            arcId="htsArc"
            arcD={ARC_D_WIDE}
            numFont={30}
            labelFont={15}
            radius={26}
            labelDy={-54}
            inView={inView}
            reduceMotion={reduceMotion}
          />

          {/* centred content inside the arch opening */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 text-center w-full"
          >
            <h2 className="font-display text-5xl lg:text-6xl text-white leading-none">
              <span className="text-shine">{t("How to Start")}</span>
            </h2>
            <p className="text-white/50 text-sm uppercase tracking-[0.25em] mt-5 mb-10">{t("From Idea to Production")}</p>
            <div className="flex justify-center">
              <PrimaryCTA href="/contact" size="md" testId="hts-contact">{t("Contact Us")}</PrimaryCTA>
            </div>
          </motion.div>
        </div>

        {/* MOBILE — same animated arc motif (larger type) with content stacked beneath the dome */}
        <div className="md:hidden">
          <div className="relative max-w-md mx-auto">
            <ArcSvg
              steps={STEPS_SHORT}
              arcId="htsArcMobile"
              arcD={ARC_D}
              numFont={34}
              labelFont={30}
              radius={28}
              labelDy={-54}
              inView={inView}
              reduceMotion={reduceMotion}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center -mt-2"
          >
            <h2 className="font-display text-4xl text-white leading-none">
              <span className="text-shine">{t("How to Start")}</span>
            </h2>
            <p className="text-white/50 text-xs uppercase tracking-[0.25em] mt-3 mb-8">{t("From Idea to Production")}</p>
            <div className="flex justify-center">
              <PrimaryCTA href="/contact" size="md" testId="hts-contact-mobile">{t("Contact Us")}</PrimaryCTA>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
