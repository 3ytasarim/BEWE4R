import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/cta-button";
import { CybercoreBackground } from "@/components/ui/cybercore-section-hero";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import OrbitCarousel, { type OrbitSlide } from "@/components/sections/OrbitCarousel";
import AmbientGlowBackground from "@/components/sections/AmbientGlowBackground";
import FloatingIcons from "@/components/sections/FloatingIcons";
import bagPlasticA from "@/assets/icons/bag-plastic-a.png";
import bagPlasticB from "@/assets/icons/bag-plastic-b.png";
import bagZipA from "@/assets/icons/bag-zip-a.png";
import bagZipB from "@/assets/icons/bag-zip-b.png";
import zip1 from "@/assets/products/zipbag/real-1.jpg";
import zip2 from "@/assets/products/zipbag/real-2.jpg";
import zip3 from "@/assets/products/zipbag/real-3.jpg";
import zip4 from "@/assets/products/zipbag/real-4.jpg";
import zip5 from "@/assets/products/zipbag/real-5.jpg";
import ship1 from "@/assets/products/shippingbag/real-1.jpg";
import ship2 from "@/assets/products/shippingbag/real-2.jpg";
import ship3 from "@/assets/products/shippingbag/real-3.jpg";

const zipImgs = [zip1, zip2, zip3, zip4, zip5];
const shipImgs = [ship1, ship2, ship3];

const bagIcons = [bagPlasticA, bagPlasticB, bagZipA, bagZipB];

/* Carousel shows the full real product set — all zip + shipping bags interleaved. */
const carouselSlides: OrbitSlide[] = [
  { src: zip1 },
  { src: ship1 },
  { src: zip2 },
  { src: ship2 },
  { src: zip3 },
  { src: ship3 },
  { src: zip4 },
  { src: zip5 },
];

const wordReveal = {
  hidden: { y: "115%", rotate: 4 },
  visible: (i: number) => ({
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function ProductHeading({ name }: { name: string }) {
  const words = name.split(" ");
  return (
    <div className="mb-5 md:mb-7">
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

function ProductGallery({ imgs, name }: { imgs: string[]; name: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
      {imgs.map((src, idx) => (
        <motion.div
          key={src}
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="group relative overflow-hidden rounded-[2px] bg-white/5 border border-white/10 aspect-[4/5]"
        >
          <img
            src={src}
            alt={`${name} — ${idx + 1}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function ZipBagsPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      {/* HERO — cinematic, mirrors the Print hero exactly */}
      <section
        className="relative min-h-[100svh] overflow-hidden flex flex-col"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        {/* Animated ambient glow background (monochrome adaptation) */}
        <AmbientGlowBackground />

        {/* Floating bag icons rising up the hero */}
        <FloatingIcons icons={bagIcons} />

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
              {t("Your Brand · Zip Bags & Shipping Bags")}
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
                  {t("Zip Bags &")}
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
                  {t("Shipping Bags")}
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
              <PrimaryCTA href="/contact" testId="zipbags-hero-cta-contact" onDark>
                {t("Contact Us now")}
              </PrimaryCTA>
              <SecondaryCTA href="/your-brand/sample" testId="zipbags-hero-cta-sample" onDark>
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

      {/* PRODUCT SECTIONS — mirror the Print technique galleries, colourful shots */}
      <section className="border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-16 md:pb-20">
          <AnimatedSection>
            <ProductHeading name={t("Zip Bags")} />
            <motion.p
              variants={fadeUp}
              className="mb-8 md:mb-10 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed"
            >
              {t("Resealable premium zip pouches that present and protect your garments in style.")}
            </motion.p>
            <ProductGallery imgs={zipImgs} name={t("Zip Bags")} />
          </AnimatedSection>
        </div>
      </section>

      <section className="border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-16 md:pb-20">
          <AnimatedSection>
            <ProductHeading name={t("Shipping Bags")} />
            <motion.p
              variants={fadeUp}
              className="mb-8 md:mb-10 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed"
            >
              {t("Durable branded mailer bags that make every unboxing feel like your brand.")}
            </motion.p>
            <ProductGallery imgs={shipImgs} name={t("Shipping Bags")} />
          </AnimatedSection>
        </div>
      </section>

      {/* Orbit carousel — full colourful product set on an auto-rotating 3D ring */}
      <section className="py-16 md:py-24 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <OrbitCarousel images={carouselSlides} />
        </div>
      </section>

      {/* Statement + CTAs — dark island w/ monochrome rising light-beam bg */}
      <section
        className="relative overflow-hidden py-24 md:py-36"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <CybercoreBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-10 h-px w-16"
              style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            />
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02]"
              style={{ color: "#ffffff" }}
            >
              {t("Complete your brand with")}<br />{t("premium packaging.")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg md:text-xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {t("We're more than just a manufacturer. We don't only produce premium garments — we also provide custom packaging solutions that elevate your brand experience. From zip bags and shipping bags to branded essentials, every detail can be tailored to your vision.")}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {t("Create a memorable unboxing experience and leave a lasting impression on your customers with packaging designed specifically for your brand.")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link href="/your-brand/sample" data-testid="zipbags-cta-sample">
                <span className="inline-block px-8 py-4 bg-[#ffffff] text-[#0f0f0f] text-xs uppercase tracking-[0.2em] hover:bg-[#e5e5e5] transition-colors">
                  {t("Start your Sample")}
                </span>
              </Link>
              <Link href="/contact" data-testid="zipbags-cta-contact">
                <span className="inline-block px-8 py-4 border border-[rgba(255,255,255,0.3)] text-[#ffffff] text-xs uppercase tracking-[0.2em] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.6)] transition-colors">
                  {t("Contact Us")}
                </span>
              </Link>
              <Link href="/contact" data-testid="zipbags-cta-bulk">
                <span className="inline-block px-8 py-4 bg-[#ffffff] text-[#0f0f0f] text-xs uppercase tracking-[0.2em] hover:bg-[#e5e5e5] transition-colors">
                  {t("Start your Bulk")}
                </span>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
