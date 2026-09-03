import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PrimaryCTA } from "@/components/ui/cta-button";
import SampleCardRow from "@/components/sections/SampleCardRow";
import SampleProcess from "@/components/sections/SampleProcess";
import SampleFaq from "@/components/sections/SampleFaq";
import FloatingIcons from "@/components/sections/FloatingIcons";
import AmbientGlowBackground from "@/components/sections/AmbientGlowBackground";

export default function SamplePage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      {/* HERO — homepage-style cinematic hero, static sample image behind */}
      <section
        className="relative min-h-[100svh] overflow-hidden flex flex-col"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        {/* Animated ambient glow background (monochrome adaptation) */}
        <AmbientGlowBackground />

        {/* Rising clothing-icon background */}
        <FloatingIcons />

        {/* MAIN CONTENT — centered */}
        <div className="relative z-20 flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center text-center pt-40 md:pt-52 pb-28 md:pb-32">
            {/* Kicker */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] uppercase tracking-[0.3em] mb-6"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {t("Your Brand · Sample")}
            </motion.p>

            {/* Headline — per-word mask reveal */}
            <h1
              className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] tracking-tight mb-8 md:mb-10"
              style={{ color: "#ffffff" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "115%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
                  style={{ color: "#ffffff" }}
                >
                  {t("SAMPLE")}
                </motion.span>
              </span>
            </h1>

            {/* CTA group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            >
              <PrimaryCTA href="/contact" testId="sample-hero-cta-contact" onDark>
                {t("Contact Us now")}
              </PrimaryCTA>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.45 }}
              className="mt-7 md:mt-9 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {t("Built to bring your vision to life")}
            </motion.p>
          </div>
        </div>
      </section>

      <SampleCardRow />
      <SampleProcess />
      <SampleFaq />
    </div>
  );
}
