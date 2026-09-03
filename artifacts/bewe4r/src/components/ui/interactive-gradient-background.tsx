import { useEffect, useRef } from "react";

type InteractiveGradientBackgroundProps = {
  className?: string;
  /** cursor-follow strength (0..1.5) */
  intensity?: number;
  /** enable pointer interaction */
  interactive?: boolean;
};

/**
 * Monochrome interactive gradient background.
 *
 * Renders an absolute-fill, pointer-events:none layer inside a `relative` parent
 * (a dark-island section) and drifts a set of GRAYSCALE radial blobs toward the
 * cursor. Adapted from an attached colorful interactive-gradient reference —
 * recolored to pure grayscale to respect the site's strict monochrome rule.
 * Meant to sit BEHIND white text on a `#0f0f0f` section.
 *
 * Pointer is tracked on `window` (not the layer) so pointer-events can stay
 * `none` — buttons above it remain clickable. Position writes are rAF-throttled
 * and reduced-motion aware.
 */
export default function InteractiveGradientBackground({
  className = "",
  intensity = 1,
  interactive = true,
}: InteractiveGradientBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    host.style.setProperty("--posX", "0");
    host.style.setProperty("--posY", "0");

    if (!interactive) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const k = (prefersReduced ? 0.15 : intensity) * 0.1;

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = ref.current;
        const p = pendingRef.current;
        if (!el || !p) return;
        const rect = el.getBoundingClientRect();
        const px = p.x - rect.left - rect.width / 2;
        const py = p.y - rect.top - rect.height / 2;
        el.style.setProperty("--posX", String(px * k));
        el.style.setProperty("--posY", String(py * k));
      });
    };

    const onPointer = (e: PointerEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      schedule();
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive, intensity]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={
        {
          "--posX": "0",
          "--posY": "0",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(115deg, rgb(40 40 40), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(150 150 150), rgb(10 10 10)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(110 110 110), rgb(14 14 14)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(70 70 70), rgb(4 4 4)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(120 120 120), rgb(20 20 20)),
            linear-gradient(60deg, rgb(28 28 28), rgb(64 64 64))
          `,
          backgroundBlendMode:
            "overlay, overlay, difference, difference, difference, normal",
        }}
      />
    </div>
  );
}

export { InteractiveGradientBackground };
