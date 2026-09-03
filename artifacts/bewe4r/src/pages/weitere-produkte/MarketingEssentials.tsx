import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/cta-button";
import { SpotlightImageCard } from "@/components/ui/spotlight-card";
import { InteractiveGradientBackground } from "@/components/ui/interactive-gradient-background";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import { type TiltedSlide } from "@/components/sections/TiltedCarousel";
import AmbientGlowBackground from "@/components/sections/AmbientGlowBackground";
import FloatingIcons from "@/components/sections/FloatingIcons";

/* Section titles — also fed into the scrolling marquee band below the hero. */
const MARQUEE_TITLES = ["Thank You Cards", "Stickers", "Custom Gifts"];

/* Per-section image sets — sharp corners, full color (grayscale disabled). */
const toSlides = (mods: Record<string, string>): TiltedSlide[] =>
  Object.keys(mods)
    .sort()
    .map((key) => ({ src: mods[key] }));

const thankYouImgs = import.meta.glob(
  "../../assets/marketing/thank-you-cards/*.{jpg,jpeg,webp,png}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;
const stickerImgs = import.meta.glob(
  "../../assets/marketing/stickers/*.{jpg,jpeg,webp,png}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;
const giftImgs = import.meta.glob(
  "../../assets/marketing/custom-gifts/*.{jpg,jpeg,webp,png}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const SECTIONS = [
  { index: "01", title: "Thank You Cards", slides: toSlides(thankYouImgs) },
  { index: "02", title: "Stickers", slides: toSlides(stickerImgs) },
  { index: "03", title: "Custom Gifts", slides: toSlides(giftImgs) },
];

export default function MarketingEssentialsPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      {/* HERO — cinematic, mirrors the Print / Zip Bags hero exactly */}
      <section
        className="relative min-h-[100svh] overflow-hidden flex flex-col"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        {/* Animated ambient glow background (monochrome adaptation) */}
        <AmbientGlowBackground />

        {/* Rising clothing-icon background */}
        <FloatingIcons />

        {/* Centered content */}
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
              {t("Brand Essentials · Marketing")}
            </motion.p>

            {/* Headline — per-line mask reveal */}
            <h1
              className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.9] tracking-tight mb-8 md:mb-10"
              style={{ color: "#ffffff" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "115%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
                  style={{ color: "#ffffff" }}
                >
                  {t("Marketing")}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "115%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                  style={{ color: "#ffffff" }}
                >
                  {t("Essentials")}
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
              <PrimaryCTA href="/contact" testId="marketing-hero-cta-contact" onDark>
                {t("Contact Us now")}
              </PrimaryCTA>
              <SecondaryCTA href="/your-brand/sample" testId="marketing-hero-cta-sample" onDark>
                {t("Develop your Sample")}
              </SecondaryCTA>
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

      {/* Section marquee — canonical .animate-marquee (tripled + -33.33%),
          white page-bg edge fades, pause on hover — matches ImageMarquee. */}
      <div className="group relative overflow-hidden border-b border-white/10 py-5 md:py-6">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32"
          style={{ background: "linear-gradient(to right, #ffffff, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32"
          style={{ background: "linear-gradient(to left, #ffffff, transparent)" }}
        />
        <div className="animate-marquee flex w-max whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...MARQUEE_TITLES, ...MARQUEE_TITLES, ...MARQUEE_TITLES].map((name, i) => (
            <span
              key={i}
              className="flex items-center text-white/40 text-[11px] md:text-xs uppercase tracking-[0.35em] font-medium"
            >
              {t(name)}
              <span className="mx-6 md:mx-9 text-white/20" aria-hidden="true">
                *
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Per-section image carousels — sharp corners, full color */}
      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="py-16 md:py-24 border-b border-white/10 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="mb-10 md:mb-14">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">
                {section.index}
              </p>
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-tight text-white">
                {t(section.title)}
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {section.slides.map((slide, i) => (
                  <motion.div
                    key={slide.src}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <SpotlightImageCard
                      src={slide.src}
                      alt={`${t(section.title)} — ${i + 1}`}
                      aspect="aspect-[3/4]"
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      ))}

      {/* Closing statement + Contact CTA — dark island w/ interactive monochrome gradient */}
      <section
        className="relative overflow-hidden py-24 md:py-36"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <InteractiveGradientBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2
              className="font-display uppercase text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.9] tracking-tight mb-8"
              style={{ color: "#ffffff" }}
            >
              {t("Create a Lasting")}
              <br />
              {t("Brand Experience")}
            </h2>
            <p
              className="text-lg md:text-2xl leading-snug max-w-2xl mx-auto mb-5"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {t("The strongest brands are built through attention to detail. Custom thank you cards, branded stickers, and thoughtful customer gifts transform a simple delivery into a memorable brand experience.")}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {t("Build stronger customer loyalty and make your brand unforgettable with custom-designed brand essentials.")}
            </p>
            <div className="flex justify-center">
              <PrimaryCTA
                href="/contact"
                testId="marketing-essentials-cta-contact"
                onDark
              >
                {t("Contact Us")}
              </PrimaryCTA>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
