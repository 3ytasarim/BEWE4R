import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import heroCinematic from "@/assets/hero-cinematic.png";

function ShinyText({ children }: { children: string }) {
  return (
    <span
      className="inline-block bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(100deg, #0f0f0f 0%, #0f0f0f 35%, #0f0f0f 45%, #64CEFB 55%, #0f0f0f 65%, #0f0f0f 100%)",
        backgroundSize: "300% 100%",
        animation: "shine-sweep 3s linear infinite",
      }}
    >
      {children}
    </span>
  );
}

export function ShinyCTABand() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden border-t border-white/10 bg-black">
      {/* Animated background image (Ken Burns) */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 18, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src={heroCinematic}
          alt=""
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </motion.div>

      {/* Vertical grid lines */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05]">
        <div className="max-w-7xl h-full mx-auto px-6 grid grid-cols-12 gap-0">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className="border-l border-white/40 h-full" />
          ))}
        </div>
      </div>

      {/* Top split text row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-14 grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
          {t(
            "We deliver transformative production that gives ambitious brands the tools to grow worldwide — from the first sample to the final stitch.",
          )}
        </p>
        <p className="text-white/70 text-sm md:text-base lg:text-right font-medium">
          {t("120+ brands launched · 250K+ pieces / year")}
        </p>
      </motion.div>

      {/* Center heading + CTA */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/70 mb-8"
        >
          {t("Slots for the next production open soon")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
          className="font-display text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-tight text-white mb-12"
        >
          <span className="block">{t("Become the")}</span>
          <span className="block">
            <ShinyText>{t("next brand.")}</ShinyText>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link href="/contact" data-testid="shiny-cta">
            <span className="group inline-flex items-center gap-3 px-7 md:px-9 py-3.5 md:py-4 bg-black border border-white/20 hover:border-white/60 hover:bg-white/5 rounded-full text-white text-sm uppercase tracking-widest transition-all duration-300">
              {t("Request your project now")}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom band — small detail row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-20 border-t border-white/10 bg-black/40 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40">
          <span>{t("● Production active · Istanbul")}</span>
          <span>{t("Reply within 24h")}</span>
          <span>{t("MOQ from 30 pieces")}</span>
        </div>
      </motion.div>
    </section>
  );
}
