import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/cta-button";
import heroCinematic from "@/assets/hero-video-poster.jpg";
import heroLoop from "@/assets/hero-video.mp4";

const HEADLINE = ["PREMIUM CLOTHING", "MANUFACTURER"];

export function HeroCinematic() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[82svh] overflow-hidden flex flex-col"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
      {/* Cinematic background image with parallax + slow zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        {/* Looping cinematic background video — sketch image as poster fallback */}
        <video
          src={heroLoop}
          poster={heroCinematic}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-100"
        />
        {/* Deep shadow vignette — lighter edge darkening so the video stays visible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.72) 98%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        {/* Even center scrim so the centered headline & copy stay legible */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.2)" }} />
      </motion.div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* MAIN CONTENT — centered */}
      <motion.div
        className="relative z-20 flex-1 flex items-center justify-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center text-center pt-28 md:pt-36 pb-16 md:pb-20">
          {/* Headline — per-word mask reveal */}
          <h1
            className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] tracking-tight mb-6 md:mb-8"
            style={{ color: "#ffffff" }}
          >
            <span className="sr-only">{t("Premium Clothing Manufacturer")}</span>
            <span aria-hidden="true" className="block">
              {HEADLINE.map((word, wi) => (
                <span key={wi} className="block overflow-hidden">
                  <motion.span
                    className="block whitespace-nowrap"
                    initial={{ y: "115%", rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.15 + wi * 0.07,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    style={{ color: "#ffffff" }}
                  >
                    {t(word)}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="text-lg md:text-2xl max-w-2xl md:max-w-none md:whitespace-nowrap mb-4 leading-snug font-light"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {t("Creating high-quality garments for modern brands worldwide.")}
          </motion.p>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="text-sm md:text-base max-w-xl md:max-w-none md:whitespace-nowrap mb-9 md:mb-11 leading-relaxed font-light"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {t("From the first sample to the finished collection — print, label, cut & sew, all crafted in our Istanbul manufacture.")}
          </motion.p>

          {/* CTA group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
          >
            <PrimaryCTA href="/contact" testId="hero-cta-primary" onDark>
              {t("Develop your Sample")}
            </PrimaryCTA>
            <SecondaryCTA href="/contact" testId="hero-cta-contact" onDark>
              {t("Scale Your Production")}
            </SecondaryCTA>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.45 }}
            className="mt-7 md:mt-9 text-[11px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {t("Built to bring your vision to life")}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
