import { motion, useInView } from "framer-motion";
import { useRef, useId } from "react";
import { useTranslation } from "react-i18next";

const INK = "#0f0f0f";
const BONE = "#ffffff";

type Step = { n: string; label: string; x: number; y: number };

/* Five nodes lying on the desktop arc (M40 290 A 605 605 0 0 1 960 290),
   center (500, 682.97), r = 605, apex (500, 78). */
const STEPS: Step[] = [
  { n: "1", label: "Send us your Techpack", x: 40, y: 290 },
  { n: "2", label: "We Review your Requirements", x: 247, y: 134 },
  { n: "3", label: "Receive Your Custom Offer", x: 500, y: 78 },
  { n: "4", label: "Final Approval", x: 753, y: 134 },
  { n: "5", label: "Sample Production", x: 960, y: 290 },
];

/* Shorter labels for the mobile arc (M130 290 A 421.1 421.1 0 0 1 870 290),
   center (500, 491.06), r = 421.1, apex (500, 70). */
const STEPS_SHORT: Step[] = [
  { n: "1", label: "Techpack", x: 130, y: 290 },
  { n: "2", label: "Review", x: 284, y: 129 },
  { n: "3", label: "Offer", x: 500, y: 70 },
  { n: "4", label: "Approval", x: 716, y: 129 },
  { n: "5", label: "Production", x: 870, y: 290 },
];

const ARC_D = "M130 290 A 421.1 421.1 0 0 1 870 290";
const ARC_D_WIDE = "M40 290 A 605 605 0 0 1 960 290";

type ArcSvgProps = {
  steps: Step[];
  arcId: string;
  arcD: string;
  numFont: number;
  labelFont: number;
  radius: number;
  labelDy: number;
  inView: boolean;
};

function ArcSvg({ steps, arcId, arcD, numFont, labelFont, radius, labelDy, inView }: ArcSvgProps) {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 1000 340" className="w-full h-auto overflow-visible" role="img" aria-label="How to create your sample — five step process">
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

      {/* Fixed, non-moving nodes anchored on the arc */}
      {steps.map((s) => (
        <g key={s.n} transform={`translate(${s.x} ${s.y})`}>
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
      ))}
    </svg>
  );
}

/* Flat circular text seal — every letter is always upright and readable; the
   whole ring rotates in a single direction at a steady, calm speed. textLength
   forces the label to fill the full circle evenly. */
function SpinRing({ text }: { text: string }) {
  const rawId = useId();
  const pathId = `spinpath-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const ring = `${text.split(" ").join(" · ")} · `;
  return (
    <div className="spin-flat" aria-label={text}>
      <svg viewBox="0 0 200 200" className="spin-flat-svg" aria-hidden="true">
        <defs>
          <path id={pathId} fill="none" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="spin-flat-text">
          <textPath href={`#${pathId}`} startOffset="0" textLength={452} lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default function SampleProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section id="sample-process" className="bg-black text-white py-20 md:py-28 border-t border-white/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-center text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight text-white mb-10 md:mb-12"
        >
          {t("How to Create Your Sample")}
        </motion.h2>

        {/* DESKTOP — wide arc lifted higher, spinning ring nestled lower in the arch */}
        <div className="hidden md:block relative max-w-6xl mx-auto md:-mt-4">
          <ArcSvg
            steps={STEPS}
            arcId="sampleArc"
            arcD={ARC_D_WIDE}
            numFont={30}
            labelFont={15}
            radius={26}
            labelDy={-54}
            inView={inView}
          />
          <div className="absolute left-1/2 top-[72%] -translate-x-1/2 -translate-y-1/2">
            <SpinRing text="BEWE4R SAMPLE" />
          </div>
        </div>

        {/* MOBILE — shallow arc, spinning ring centered lower in the dome */}
        <div className="md:hidden">
          <div className="relative max-w-md mx-auto -mt-2">
            <ArcSvg
              steps={STEPS_SHORT}
              arcId="sampleArcMobile"
              arcD={ARC_D}
              numFont={34}
              labelFont={26}
              radius={28}
              labelDy={-50}
              inView={inView}
            />
            <div className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2">
              <SpinRing text="BEWE4R SAMPLE" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
