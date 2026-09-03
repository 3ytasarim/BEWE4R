import { motion, useReducedMotion } from "framer-motion";

/**
 * Monochrome adaptation of an attached colorful "Foxy" hero background.
 * The original purple ambient glows / light beams / twinkling star particles
 * are recolored to pure white/gray at low opacity so they read as soft light
 * on a dark island (#000000 / #0f0f0f) — strictly monochrome, no accents.
 *
 * Renders a background-only `absolute inset-0 pointer-events-none` layer.
 * Drop it inside a `relative overflow-hidden` dark section at z-0, with content
 * above it (z-20). No grid lines (deliberately omitted — the homepage hero grid
 * was removed for being distracting).
 */

type Star = { left: number; top: number; size: number; delay: number; dur: number };

// Deterministic scatter (percent-based so it stays responsive).
const STARS: Star[] = [
  { left: 76, top: 12, size: 2, delay: 0.0, dur: 2.6 },
  { left: 82, top: 28, size: 3, delay: 0.8, dur: 3.2 },
  { left: 68, top: 20, size: 2, delay: 1.4, dur: 2.9 },
  { left: 88, top: 40, size: 2, delay: 0.5, dur: 3.6 },
  { left: 72, top: 46, size: 3, delay: 1.9, dur: 2.4 },
  { left: 60, top: 34, size: 2, delay: 1.1, dur: 3.1 },
  { left: 92, top: 18, size: 2, delay: 2.3, dur: 2.7 },
  { left: 64, top: 58, size: 2, delay: 0.3, dur: 3.4 },
  { left: 18, top: 62, size: 2, delay: 1.6, dur: 2.8 },
  { left: 26, top: 74, size: 3, delay: 0.9, dur: 3.3 },
  { left: 12, top: 52, size: 2, delay: 2.1, dur: 2.5 },
  { left: 34, top: 68, size: 2, delay: 0.6, dur: 3.0 },
  { left: 22, top: 84, size: 2, delay: 1.3, dur: 2.9 },
  { left: 40, top: 78, size: 3, delay: 2.5, dur: 2.6 },
  { left: 8, top: 72, size: 2, delay: 0.2, dur: 3.5 },
  { left: 48, top: 88, size: 2, delay: 1.8, dur: 2.7 },
  { left: 54, top: 24, size: 2, delay: 1.0, dur: 3.2 },
  { left: 30, top: 16, size: 2, delay: 2.0, dur: 2.8 },
];

const BEAMS = [
  { left: "52%", top: "-8%", rotate: 13.4, dur: 3, delay: 0 },
  { left: "62%", top: "-6%", rotate: 13.3, dur: 3.5, delay: 0.5 },
  { left: "58%", top: "-4%", rotate: 6, dur: 4, delay: 1 },
];

export default function AmbientGlowBackground({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Large soft ambient light */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "90%",
          height: "100%",
          left: "8%",
          top: "-10%",
          background: "rgba(255,255,255,0.05)",
          filter: "blur(250px)",
        }}
        animate={reduced ? undefined : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Light beams (top) */}
      {BEAMS.map((b, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute"
          style={{
            width: "180px",
            height: "50%",
            left: b.left,
            top: b.top,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)",
            mixBlendMode: "plus-lighter",
            filter: "blur(11px)",
            transform: `rotate(${b.rotate}deg)`,
          }}
          animate={reduced ? undefined : { opacity: [0.35, 0.75, 0.35], scale: [1, 1.05, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        />
      ))}

      {/* Concentrated glow ellipse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "26%",
          height: "45%",
          left: "56%",
          top: "-6%",
          background: "rgba(255,255,255,0.10)",
          filter: "blur(125px)",
          transform: "rotate(37deg)",
        }}
        animate={reduced ? undefined : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Twinkling star particles */}
      {STARS.map((s, i) => (
        <motion.span
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 0 4px rgba(255,255,255,0.7)",
          }}
          animate={reduced ? { opacity: 0.4 } : { opacity: [0.25, 1, 0.25], scale: [1, 1.9, 1] }}
          transition={
            reduced
              ? undefined
              : { duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }
          }
        />
      ))}
    </div>
  );
}
