import { Link } from "wouter";
import type { ReactNode, MouseEvent } from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface PrimaryCTAProps {
  href: string;
  children: ReactNode;
  testId?: string;
  size?: "md" | "lg";
  /** Force literal white pill / black text — use on dark sections that bypass the bone theme. */
  onDark?: boolean;
}

/**
 * Magnetic primary CTA — white pill with split-flap label swap and arrow translate.
 * Uses a subtle magnetic pull on hover for a premium feel.
 */
export function PrimaryCTA({ href, children, testId, size = "lg", onDark = false }: PrimaryCTAProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMove(e: MouseEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    setPos({ x, y });
  }

  function onLeave() {
    setPos({ x: 0, y: 0 });
  }

  const sizeCls = size === "lg" ? "px-9 py-4 text-sm" : "px-6 py-3 text-xs";

  // On dark sections we use literal hex via arbitrary values so the bone-theme
  // token swap (bg-white → ink, text-black → bone) does NOT apply here.
  const baseBg = onDark ? "bg-[#ffffff]" : "bg-white";
  const baseText = onDark ? "text-[#000000]" : "text-black";
  const washBg = onDark ? "bg-[#000000]" : "bg-black";
  const hoverText = onDark ? "text-[#ffffff]" : "text-white";
  // Pre-built `group-hover:` variants — Tailwind JIT cannot detect dynamic class composition
  // like `group-hover:${hoverText}`, so we write the full class string out for both branches.
  const arrowHoverColor = onDark ? "group-hover:text-[#ffffff]" : "group-hover:text-white";

  return (
    <Link href={href} data-testid={testId}>
      <motion.span
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        animate={{ x: pos.x, y: pos.y }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.3 }}
        className={`group relative inline-flex items-center gap-3 ${sizeCls} ${baseBg} ${baseText} rounded-full uppercase tracking-[0.18em] font-semibold cursor-pointer overflow-hidden shadow-[0_8px_30px_-8px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_14px_44px_-8px_rgba(255,255,255,0.45)]`}
      >
        {/* sliding wash */}
        <span
          aria-hidden
          className={`absolute inset-0 ${washBg} translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`}
        />

        {/* sheen sweep */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
          }}
        />

        {/* Label - stays in place, color flips as the wash rises */}
        <span className={`relative z-10 transition-colors duration-300 ease-out ${arrowHoverColor}`}>
          {children}
        </span>

        {/* arrow — moves on hover, switches color */}
        <span className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 ${arrowHoverColor}`}>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M3 8h10m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.span>
    </Link>
  );
}

/**
 * Secondary outline CTA — animated border + slide-in fill.
 */
export function SecondaryCTA({ href, children, testId, size = "lg", onDark = false }: PrimaryCTAProps) {
  const sizeCls = size === "lg" ? "px-9 py-4 text-sm" : "px-6 py-3 text-xs";

  const baseText = onDark ? "text-[#ffffff]" : "text-white";
  const borderIdle = onDark ? "border-[rgba(255,255,255,0.3)]" : "border-white/30";
  const borderHover = onDark ? "hover:border-[#ffffff]" : "hover:border-white";
  const idleBg = onDark ? "bg-[rgba(255,255,255,0.06)]" : "bg-white/5";
  const fillBg = onDark ? "bg-[#ffffff]" : "bg-white";
  const hoverText = onDark ? "group-hover:text-[#000000]" : "group-hover:text-black";

  return (
    <Link href={href} data-testid={testId}>
      <motion.span
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.3 }}
        className={`group relative inline-flex items-center gap-3 ${sizeCls} ${baseText} ${idleBg} backdrop-blur-md rounded-full uppercase tracking-[0.18em] font-semibold cursor-pointer overflow-hidden border ${borderIdle} ${borderHover} transition-colors duration-300`}
      >
        <span
          aria-hidden
          className={`absolute inset-0 ${fillBg} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`}
        />
        <span className={`relative z-10 transition-colors duration-200 ${hoverText}`}>
          {children}
        </span>
        <span className={`relative z-10 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 ${hoverText}`}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M3 8h10m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.span>
    </Link>
  );
}
