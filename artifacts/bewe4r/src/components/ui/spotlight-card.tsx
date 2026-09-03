import { useEffect, type ReactNode, type CSSProperties } from "react";

/* Monochrome "spotlight" card adapted from a shadcn GlowCard reference. The
   original produced rainbow HSL glows + colored variants; this version is forced
   to a single INK glow (saturation 0) so it fits the strictly-monochrome BEWE4R
   theme, and reads on the WHITE page background of the deine-brand /
   brand-essentials galleries. Sharp 2px corners per the design system.

   The glow is driven by --x/--y/--xp/--yp CSS variables set on :root by ONE
   shared pointermove listener (ref-counted). Every card inherits them and, via
   `background-attachment: fixed`, only lights up the region under the cursor. */

type SpotlightCardProps = {
  children?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
} as const;

const STYLE_ID = "spotlight-card-glow";

const GLOW_CSS = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    -webkit-mask-clip: padding-box, border-box;
    -webkit-mask-composite: source-in;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }
  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(0 0% 8% / var(--border-spot-opacity, 0.9)), transparent 100%
    );
  }
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(0 0% 28% / var(--border-light-opacity, 0.6)), transparent 100%
    );
  }
  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }
  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

let pointerRefs = 0;
let pointerInstalled = false;

const handlePointer = (e: PointerEvent) => {
  const root = document.documentElement.style;
  root.setProperty("--x", e.clientX.toFixed(2));
  root.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
  root.setProperty("--y", e.clientY.toFixed(2));
  root.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
};

const ensureStyle = () => {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = GLOW_CSS;
  document.head.appendChild(el);
};

const acquirePointer = () => {
  ensureStyle();
  pointerRefs += 1;
  if (!pointerInstalled) {
    document.addEventListener("pointermove", handlePointer);
    pointerInstalled = true;
  }
};

const releasePointer = () => {
  pointerRefs -= 1;
  if (pointerRefs <= 0 && pointerInstalled) {
    document.removeEventListener("pointermove", handlePointer);
    pointerInstalled = false;
    pointerRefs = 0;
  }
};

export function SpotlightCard({
  children,
  className = "",
  size = "md",
  width,
  height,
  customSize = false,
}: SpotlightCardProps) {
  useEffect(() => {
    acquirePointer();
    return releasePointer;
  }, []);

  const style: CSSProperties = {
    ["--radius" as string]: "2",
    ["--border" as string]: "2",
    ["--backdrop" as string]: "hsl(0 0% 0% / 0.02)",
    ["--backup-border" as string]: "hsl(0 0% 0% / 0.12)",
    ["--size" as string]: "260",
    ["--outer" as string]: "0.85",
    ["--border-size" as string]: "calc(var(--border, 2) * 1px)",
    ["--spotlight-size" as string]: "calc(var(--size, 150) * 1px)",
    backgroundColor: "var(--backdrop, transparent)",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
  };
  if (width !== undefined) style.width = typeof width === "number" ? `${width}px` : width;
  if (height !== undefined) style.height = typeof height === "number" ? `${height}px` : height;

  const sizeClasses = customSize ? "" : sizeMap[size];

  return (
    <div
      data-glow
      style={style}
      className={`${sizeClasses} ${!customSize ? "aspect-[3/4]" : ""} relative rounded-[2px] shadow-[0_1rem_2rem_-1rem_rgba(0,0,0,0.45)] ${className}`}
    >
      <div data-glow />
      {children}
    </div>
  );
}

/* Convenience wrapper: an image that fills a SpotlightCard (full-bleed, clipped
   to the sharp 2px corners). Used across the Print / Label / Marketing galleries. */
export function SpotlightImageCard({
  src,
  alt = "",
  aspect = "aspect-[4/5]",
  className = "",
}: {
  src: string;
  alt?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <SpotlightCard customSize className={`${aspect} w-full ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-[2px]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </SpotlightCard>
  );
}
