import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import GrainBackground from "@/components/sections/GrainBackground";
import ParticleField from "@/components/sections/ParticleField";
import { ImageGallery } from "@/components/ui/image-gallery";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const prodModules = import.meta.glob("../assets/production/*.jpg", { eager: true, query: "?url", import: "default" });
const PRODUCTION_PHOTOS: string[] = Object.keys(prodModules)
  .sort()
  .map((k) => prodModules[k] as string);

const VALUES = [
  { name: "Quality First", desc: "Premium products start with premium standards. Every piece is carefully checked throughout production." },
  { name: "Speed & Reliability", desc: "We understand that timing matters. Efficient processes and clear communication help keep your project moving." },
  { name: "Partnership", desc: "We believe in long-term relationships, not one-time orders. Your success is our success." },
  { name: "Transparency", desc: "No hidden surprises. No unrealistic promises. Just honest communication from start to finish." },
];

const STATS = [
  { value: 120, suffix: "+", label: "Brands Supported" },
  { value: 50, suffix: "+", label: "Samples Every Month" },
  { value: 32, suffix: "+", label: "Employees" },
  { value: 100, suffix: "%", label: "Transparent" },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const ROLL_DIGITS = Array.from({ length: 10 }, (_, n) => n);

/** Odometer-style number: each digit rolls vertically to its value when scrolled into view. */
function RollingNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduceMotion = useReducedMotion();
  const digits = String(value).split("").map(Number);

  if (reduceMotion) {
    return (
      <span className="tabular-nums">
        {value}
        {suffix ? <span className="text-[0.45em] align-top ml-0.5 text-white/40">{suffix}</span> : null}
      </span>
    );
  }

  return (
    <span className="inline-flex items-end leading-none tabular-nums">
      {digits.map((d, i) => (
        <span key={i} className="inline-block overflow-hidden h-[1em]" aria-hidden>
          <motion.span
            className="flex flex-col"
            initial={{ y: "0%" }}
            whileInView={{ y: `-${d * 10}%` }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {ROLL_DIGITS.map((n) => (
              <span key={n} className="h-[1em] flex items-center justify-center">
                {n}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
      {suffix ? (
        <span aria-hidden className="text-[0.45em] align-top ml-0.5 text-white/40">
          {suffix}
        </span>
      ) : null}
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}

export default function UeberUnsPage() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-black text-white">
      {/* Hero — animated monochrome grain-gradient shader, clean white */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden flex flex-col"
        style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <GrainBackground className="w-full h-full block" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 48%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.16) 55%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center text-center pt-40 md:pt-44 pb-28 md:pb-32">
            <motion.div variants={stagger} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="flex flex-col items-center">
              <motion.h1
                variants={fadeUp}
                className="font-display text-[clamp(5rem,18vw,16rem)] leading-[0.9] tracking-[0.02em]"
                style={{ color: "#0f0f0f" }}
              >
                {t("About Us")}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl max-w-2xl leading-relaxed mt-6" style={{ color: "rgba(15,15,15,0.55)" }}>
                {t("More Than a Manufacturer. Your Partner in Building a Brand.")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who is behind BEWE4R — heading + story */}
      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <Section className="mb-12 md:mb-14 text-center">
            <motion.p variants={fadeUp} className="text-xs text-white/40 uppercase tracking-[0.3em] mb-5">
              {t("Our Story")}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
              {t("Who Is Behind BEWE4R?")}
            </motion.h2>
          </Section>
          <Section className="text-center">
            <motion.div variants={fadeUp} className="space-y-6 text-lg md:text-xl text-white/60 leading-relaxed">
              <p>
                {t("We are a team based in Türkiye with a clear mission: helping the next generation of clothing brands bring their vision to life through quality, speed, and genuine commitment.")}
              </p>
              <p>
                {t("Unlike many manufacturers, we understand both sides of the industry. We were born and raised in Germany and know exactly what customers expect when it comes to quality, communication, reliability, and attention to detail. This international perspective allows us to bridge the gap between European standards and efficient production.")}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="my-10">
              <span className="inline-flex items-center gap-3 px-7 py-4 border border-white/20 text-sm uppercase tracking-[0.2em]">
                {t("But our story goes even deeper.")}
                <FiChevronDown size={18} />
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6 text-lg md:text-xl text-white/60 leading-relaxed">
              <p>
                {t("We started exactly where many of our clients are today: with the dream of building a clothing brand. We experienced the challenges, uncertainties, delays, and frustrations that often come with finding the right production partner. That's why we decided to build the kind of manufacturer we wished we had ourselves.")}
              </p>
              <p>{t("Today, we don't just produce garments. We help brands grow.")}</p>
              <p>
                {t("Whether you're launching your first collection or scaling an established label, our team supports you throughout the entire process — from the first idea and tech pack to sampling, production, packaging, and delivery.")}
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Statement */}
      <section className="relative overflow-hidden py-24 md:py-36 border-b border-white/10 bg-white/2">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse, rgba(15,15,15,0.06), transparent 70%)" }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,15,15,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,15,0.04) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse at center, #000 10%, transparent 65%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, #000 10%, transparent 65%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Section>
            <motion.div variants={fadeUp} className="mx-auto mb-10 h-px w-16 bg-white/30" />
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02]">
              {t("With BEWE4R, you don't just gain a manufacturer.")}
            </motion.h2>
            <motion.p variants={fadeUp} className="font-display text-3xl md:text-5xl lg:text-6xl text-white/40 leading-[1.02] mt-5">
              {t("You gain a team that genuinely cares about your success.")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-12 inline-flex items-center gap-4">
              <span className="h-px w-10 bg-white/20" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">{t("The BEWE4R Team")}</span>
              <span className="h-px w-10 bg-white/20" />
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Our Production — animated masonry image gallery */}
      <section className="py-16 md:py-20 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Section className="text-center mb-16 md:mb-20">
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
              {t("Our Production")}
            </motion.h2>
          </Section>
          <Section>
            <motion.div variants={fadeUp}>
              <ImageGallery images={PRODUCTION_PHOTOS} />
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <Section className="mb-16 md:mb-20 text-center">
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl leading-[0.9]">
              {t("Our Values")}
            </motion.h2>
          </Section>
          <Section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.name}
                  variants={fadeUp}
                  className="group relative flex flex-col items-center text-center rounded-2xl border border-white/10 bg-black p-8 lg:p-10 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_26px_50px_-18px_rgba(0,0,0,0.30)]"
                >
                  <div className="text-xs text-white/30 tabular-nums tracking-[0.2em] mb-10">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display text-2xl md:text-3xl mb-4 leading-none">{t(v.name)}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{t(v.desc)}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="group bg-black p-8 md:p-12 text-center transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  <div className="font-display text-6xl md:text-7xl lg:text-8xl leading-none mb-4">
                    <RollingNumber value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-[0.25em]">{t(s.label)}</div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* CTA — animated modern backdrop */}
      <section className="relative overflow-hidden py-28 md:py-44">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* live constellation mesh */}
          <div
            className="absolute inset-0"
            style={{
              maskImage: "radial-gradient(ellipse at center, transparent 18%, #000 60%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, transparent 18%, #000 60%)",
            }}
          >
            <ParticleField className="h-full w-full" />
          </div>
          {/* drifting glow */}
          <motion.div
            className="absolute -top-1/3 left-1/4 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(15,15,15,0.06), transparent 70%)" }}
            animate={reduceMotion ? undefined : { x: [0, 90, -50, 0], y: [0, 60, -40, 0], scale: [1, 1.15, 0.92, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* panning grid */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,15,15,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,15,0.05) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
            }}
            animate={reduceMotion ? undefined : { backgroundPosition: ["0px 0px", "64px 64px"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Section>
            <motion.h2 variants={fadeUp} className="font-display text-6xl md:text-8xl mb-10 leading-[0.9]">
              {t("Ready to Start?")}
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/contact" data-testid="ueber-uns-cta">
                <span className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-sm uppercase tracking-[0.2em] hover:bg-white/90 transition-colors">
                  {t("Start your Dream now")}
                  <FiArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}
