import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";

/* MONOCHROME adaptation of an attached "Cybercore" animated grid/beam background.
   The original used neon cyan + orange; per the strict black & white rule every
   accent was recolored to white/gray at low opacity so it reads as a refined
   DARK background that harmonizes with the #0f0f0f island it sits on. */

export interface CybercoreBackgroundProps {
  /** Number of animated light beams */
  beamCount?: number;
  className?: string;
}

const DEFAULT_BEAM_COUNT = 44;
const STYLE_ID = "cybercore-bg-styles";

const CSS = `
@keyframes cyberRise {
  0% { transform: translateY(100%); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(-25%); opacity: 0; }
}
@keyframes cyberFade {
  0%, 100% { opacity: 0; }
  5%, 85% { opacity: 0.7; }
}
@keyframes cyberFloorGlow {
  0%, 100% { transform: translateX(-50%) scale(0.95); opacity: 0.55; }
  50% { transform: translateX(-50%) scale(1.05); opacity: 0.9; }
}
@keyframes cyberColumnGlow {
  from { opacity: 0.35; }
  to { opacity: 0.6; }
}
@keyframes cyberMoveGrid {
  from { background-position: 0 0; }
  to { background-position: -100px -60px; }
}
.cyber-scene { position: absolute; inset: 0; overflow: hidden; }
.cyber-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center bottom, #000 10%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center bottom, #000 10%, transparent 75%);
  animation: cyberMoveGrid 12s linear infinite;
}
.cyber-column {
  position: absolute; top: 0; left: 50%; height: 100%; width: 44%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 65%);
  filter: blur(24px);
  animation: cyberColumnGlow 4s ease-in-out infinite alternate;
}
.cyber-floor {
  position: absolute; bottom: 0; left: 50%; height: 42%; width: 150%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center bottom, rgba(255,255,255,0.12), transparent 70%);
  animation: cyberFloorGlow 6s ease-in-out infinite;
}
.cyber-beam {
  position: absolute; bottom: 0; height: 45%;
  background: linear-gradient(to top, rgba(255,255,255,0.45), transparent);
  will-change: transform, opacity;
  animation-name: cyberRise, cyberFade;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
}
.cyber-beam.secondary {
  background: linear-gradient(to top, rgba(255,255,255,0.8), transparent);
  box-shadow: 0 0 8px rgba(255,255,255,0.35);
}
@media (prefers-reduced-motion: reduce) {
  .cyber-grid, .cyber-column, .cyber-floor, .cyber-beam { animation: none !important; }
  .cyber-beam { opacity: 0.15; }
}
`;

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

type Beam = { id: number; type: "primary" | "secondary"; style: CSSProperties };

export function CybercoreBackground({
  beamCount = DEFAULT_BEAM_COUNT,
  className = "",
}: CybercoreBackgroundProps) {
  const reduced = useReducedMotion();
  const [beams, setBeams] = useState<Beam[]>([]);

  useEffect(() => {
    ensureStyles();
  }, []);

  useEffect(() => {
    if (reduced) {
      setBeams(
        Array.from({ length: Math.min(beamCount, 20) }).map((_, i) => ({
          id: i,
          type: "primary" as const,
          style: { left: `${(i / 20) * 100}%`, width: "1px" },
        })),
      );
      return;
    }
    const generated: Beam[] = Array.from({ length: beamCount }).map((_, i) => {
      const dur = Math.random() * 3 + 5;
      const type: Beam["type"] = Math.random() < 0.15 ? "secondary" : "primary";
      return {
        id: i,
        type,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${dur}s, ${dur}s`,
        },
      };
    });
    setBeams(generated);
  }, [beamCount, reduced]);

  return (
    <div
      className={`cyber-scene pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="cyber-grid" />
      <div className="cyber-column" />
      <div className="cyber-floor" />
      {beams.map((beam) => (
        <div key={beam.id} className={`cyber-beam ${beam.type}`} style={beam.style} />
      ))}
    </div>
  );
}

export default CybercoreBackground;
