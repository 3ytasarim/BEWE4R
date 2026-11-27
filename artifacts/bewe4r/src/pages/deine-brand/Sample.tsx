import { useTranslation } from "react-i18next";
import { PrimaryCTA } from "@/components/ui/cta-button";
import SampleCardRow from "@/components/sections/SampleCardRow";
import SampleProcess from "@/components/sections/SampleProcess";
import SampleFaq from "@/components/sections/SampleFaq";
import FloatingIcons from "@/components/sections/FloatingIcons";
import AmbientGlowBackground from "@/components/sections/AmbientGlowBackground";
import { reveal } from "@/lib/reveal";

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
            <p className="hero-fade-up text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(255,255,255,0.5)", ...reveal(0, 12) }}>
              {t("Your Brand · Sample")}
            </p>

            {/* Headline — per-word mask reveal */}
            <h1
              className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] tracking-tight mb-8 md:mb-10"
              style={{ color: "#ffffff" }}
            >
              <span className="block overflow-hidden">
                <span className="hero-word-rise block" style={{ color: "#ffffff", ...reveal(0.15) }}>
                  {t("SAMPLE")}
                </span>
              </span>
            </h1>

            {/* CTA group */}
            <div className="hero-fade-up flex flex-wrap items-center justify-center gap-3 md:gap-4" style={reveal(0.45, 20)}>
              <PrimaryCTA href="/contact" testId="sample-hero-cta-contact" onDark>
                {t("Contact Us now")}
              </PrimaryCTA>
            </div>

            {/* Tagline */}
            <p className="hero-fade-up mt-7 md:mt-9 text-[11px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.45)", ...reveal(0.6, 12) }}>
              {t("Built to bring your vision to life")}
            </p>
          </div>
        </div>
      </section>

      <SampleCardRow />
      <SampleProcess />
      <SampleFaq />
    </div>
  );
}
