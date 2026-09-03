import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/cta-button";
import { SpotlightImageCard } from "@/components/ui/spotlight-card";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import { ImageMarquee } from "@/components/sections/ImageMarquee";
import { MarqueeRibbon } from "@/components/ui/marquee-ribbon";
import FloatingIcons from "@/components/sections/FloatingIcons";
import AmbientGlowBackground from "@/components/sections/AmbientGlowBackground";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

/* Label images live in src/assets/real/labels-v2/<slug>/, normalized to
   1.JPG / 2.JPG / 3.JPG. One glob, grouped + numerically sorted per slug. */
const galleryImgs = import.meta.glob("@/assets/real/labels-v2/**/*.JPG", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function imgsForSlug(slug: string): string[] {
  return Object.entries(galleryImgs)
    .filter(([path]) => path.includes(`/labels-v2/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}

type Tag = {
  name: string;
  slug: string;
};

const tags: Tag[] = [
  { name: "Neck Tag", slug: "neck-tag" },
  { name: "Design Tag", slug: "design-tag" },
  { name: "Hang Tag", slug: "hang-tag" },
  { name: "Wash Label", slug: "wash-label" },
];

/* Tag names fed to the two-band MarqueeRibbon under the hero. */
const MARQUEE_NAMES = tags.map((t) => t.name);

/* All label sample photos, ordered by tag — fed to the image marquee (real colors). */
const allLabelImgs = tags.flatMap((t) => imgsForSlug(t.slug));

const wordReveal = {
  hidden: { y: "115%", rotate: 4 },
  visible: (i: number) => ({
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function TagHeading({ name }: { name: string }) {
  const words = name.split(" ");
  return (
    <div className="mb-7 md:mb-9">
      <motion.span
        variants={fadeUp}
        className="block h-px w-10 mb-4 bg-white/20"
        aria-hidden="true"
      />
      <h3 className="font-display text-4xl md:text-6xl uppercase leading-[0.95] text-white">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span custom={i} variants={wordReveal} className="inline-block">
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </h3>
    </div>
  );
}

function TagGallery({ imgs, name }: { imgs: string[]; name: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
      {imgs.map((src, idx) => (
        <motion.div
          key={src}
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <SpotlightImageCard src={src} alt={`${name} — ${idx + 1}`} />
        </motion.div>
      ))}
    </div>
  );
}

export default function LabelPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      {/* HERO — homepage-style cinematic hero, static label image behind */}
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
              {t("Your Brand · Label")}
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
                  {t("LABEL")}
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
              <PrimaryCTA href="/contact" testId="label-hero-cta-contact" onDark>
                {t("Contact Us now")}
              </PrimaryCTA>
              <SecondaryCTA href="/your-brand/sample" testId="label-hero-cta-sample" onDark>
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

      {/* TAG MARQUEE — bold two-band ink/bone ribbon of tag names. */}
      <MarqueeRibbon items={MARQUEE_NAMES} />

      {/* IMAGE MARQUEE — scrolling wall of real-color label samples */}
      <ImageMarquee images={allLabelImgs} reverse />

      {/* TAG GALLERIES */}
      {tags.map((tag, ti) => {
        const imgs = imgsForSlug(tag.slug);
        if (imgs.length === 0) return null;
        return (
          <section key={tag.slug} className="border-b border-white/10 overflow-hidden">
            <div className={`max-w-7xl mx-auto px-6 pb-16 md:pb-20 ${ti === 0 ? "pt-12 md:pt-16" : "pt-16 md:pt-20"}`}>
              <AnimatedSection>
                <TagHeading name={t(tag.name)} />
                <TagGallery imgs={imgs} name={t(tag.name)} />
              </AnimatedSection>
            </div>
          </section>
        );
      })}

      {/* CLOSING */}
      <section className="overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center pt-16 md:pt-24 pb-24 md:pb-28">
          <AnimatedSection>
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.4em] text-white/40 mb-6"
            >
              {t("Custom requests")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl xl:text-8xl text-white leading-[0.9] uppercase mb-8"
            >
              {t("And much more.")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/70 text-xl md:text-2xl leading-snug mb-5"
            >
              {t("Didn't find the label type you were looking for?")}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
            >
              {t("No worries — we craft every label exactly the way you want it. Our team is always happy to discuss your ideas, wishes, and custom requests with you. Nothing that fits? Show us an example and we'll make it happen.")}
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" data-testid="label-cta">
                <motion.span
                  whileHover={{ y: -3 }}
                  whileTap={{ y: -1, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-9 py-4 text-xs uppercase tracking-[0.22em] font-semibold text-black shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] transition-shadow duration-300 hover:shadow-[0_16px_44px_-10px_rgba(0,0,0,0.45)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full bg-black/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                  />
                  <span className="relative">{t("Contact Us")}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M3 8h10m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </Link>
              <WhatsAppButton
                variant="solid"
                size="lg"
                testId="label-whatsapp"
                className="rounded-full px-9 transition-transform duration-300 hover:-translate-y-[3px]"
              >
                WhatsApp
              </WhatsAppButton>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
