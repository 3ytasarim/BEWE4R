import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { AnimatedSection, fadeUp } from "./AnimatedSection";

const Spline = lazy(() => import("@splinetool/react-spline"));

// Cheap static gradient shown on mobile, before mount, or whenever the 3D
// scene can't render (e.g. no WebGL context in sandboxed/headless browsers).
function StaticBackdrop() {
  return (
    <div
      className="absolute inset-0 bg-black"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 70% 40%, rgba(0,0,0,0.08), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,0,0,0.04), transparent 55%)",
      }}
    />
  );
}

// Spline throws (not just rejects) when WebGL is unavailable; Suspense only
// handles loading, so this boundary keeps that failure from crashing the page.
class SplineErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function SplineSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  // Only mount the heavy WebGL Spline scene when the section nears viewport
  // and only on devices that can comfortably handle it
  useEffect(() => {
    const isLowPower =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)").matches;
    if (isLowPower) return; // never mount Spline on mobile / reduced motion

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex items-end overflow-hidden bg-black border-y border-white/10"
    >
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {shouldMount ? (
          <SplineErrorBoundary fallback={<StaticBackdrop />}>
            <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
              <Spline
                scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
                className="w-full h-full"
              />
            </Suspense>
          </SplineErrorBoundary>
        ) : (
          <StaticBackdrop />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent pointer-events-none z-[1]" />

      <div className="absolute top-8 left-0 right-0 z-[2] pointer-events-none flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 px-5 py-2 bg-black/60 backdrop-blur-md border border-white/15"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/80">
            {t("Live · 3D Production Preview")}
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-14 pt-16 pointer-events-none">
        <AnimatedSection>
          <motion.p
            variants={fadeUp}
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 mb-6 flex items-center gap-3"
          >
            <span className="block w-10 h-px bg-white/40" />
            {t("Tech · Studio · Innovation")}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-white uppercase mb-4 md:mb-6 max-w-4xl"
          >
            {t("Production in")}
            <br />
            <span className="text-white/40">{t("real time.")}</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/70 text-[clamp(1rem,1.4vw,1.25rem)] font-light max-w-xl mb-8 md:mb-10 leading-relaxed"
          >
            {t(
              "Classic craftsmanship meets modern technology. Every order runs through digitized workflows — from the techpack to the final quality control.",
            )}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pointer-events-auto">
            <Link href="/contact" data-testid="spline-cta-primary">
              <span className="inline-flex items-center gap-2 px-7 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white/90 transition-colors cursor-pointer">
                {t("Start a project")}
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2.5 6h7m-3-3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <Link href="/about" data-testid="spline-cta-secondary">
              <span className="inline-block px-7 py-4 border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:border-white/60 hover:bg-white/5 transition-colors cursor-pointer">
                {t("Discover the studio")}
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl"
          >
            {[
              { v: "24/7", l: "Production" },
              { v: "100%", l: "Tracking" },
              { v: "ISO", l: "Quality" },
              { v: "DACH", l: "Shipping" },
            ].map((s) => (
              <div key={s.l} className="border-l border-white/20 pl-4">
                <p className="font-display text-3xl md:text-4xl text-white leading-none">{s.v}</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mt-2">{t(s.l)}</p>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
