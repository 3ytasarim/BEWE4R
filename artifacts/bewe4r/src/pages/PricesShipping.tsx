import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/cta-button";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import pricesImg from "@assets/Prices_1780762617347.png";
import shippingImg from "@assets/Shipping_1780762617336.png";

/* ── Content ─────────────────────────────────────────────────────────── */

type InfoItem = { term: string; copy: string };

const COST_FACTORS: InfoItem[] = [
  {
    term: "Order Quantity",
    copy: "Larger quantities typically reduce the cost per unit and allow for more efficient production.",
  },
  {
    term: "Fabrics & Materials",
    copy: "The choice of fabric, weight, composition, and specialty materials directly impacts production costs.",
  },
  {
    term: "Customizations & Finishes",
    copy: "Printing, embroidery, woven labels, custom packaging, washes, dyeing techniques, and other details affect the final price.",
  },
  {
    term: "Sample Development",
    copy: "Depending on your project requirements, sample development may involve different levels of complexity and revisions.",
  },
  {
    term: "Shipping & Logistics",
    copy: "The destination country, shipping method, and delivery requirements play an important role in the overall cost.",
  },
  {
    term: "Production Complexity",
    copy: "Unique cuts, custom measurements, special constructions, and advanced manufacturing techniques may require additional production time and resources.",
  },
];

const SHIPPING_FACTS: InfoItem[] = [
  {
    term: "DDP Shipping (Customs & Duties Included)",
    copy: "Our most popular shipping option. We can arrange worldwide delivery including customs clearance and import duties, allowing you to receive your order without additional customs procedures.",
  },
  {
    term: "Express Shipping",
    copy: "Need your order quickly? We offer express shipping with an estimated delivery time of 4–5 business days after dispatch.",
  },
  {
    term: "Standard DDP Shipping",
    copy: "For customers looking for a cost-effective solution, our standard DDP shipping typically takes 7–15 business days, depending on the destination country.",
  },
  {
    term: "Worldwide Delivery",
    copy: "We ship to Europe, the United Kingdom, the United States, Canada, Australia, and many other countries around the world.",
  },
  {
    term: "Full Support",
    copy: "Our team supports you throughout the entire shipping process and keeps you updated until your order arrives safely.",
  },
];

/* ── Animated hero background — drifting grid + crossing shipping trails ── */

const TRAILS = [
  { top: "16%", dur: 6.5, delay: 0, w: "clamp(140px,20vw,340px)" },
  { top: "31%", dur: 9, delay: 2.4, w: "clamp(120px,16vw,280px)" },
  { top: "47%", dur: 7.5, delay: 1.1, w: "clamp(160px,22vw,380px)" },
  { top: "63%", dur: 10, delay: 3.6, w: "clamp(120px,15vw,260px)" },
  { top: "78%", dur: 8.2, delay: 0.7, w: "clamp(150px,19vw,320px)" },
  { top: "90%", dur: 8.8, delay: 4.2, w: "clamp(130px,17vw,300px)" },
];

function ShippingBackdrop({ reduce }: { reduce: boolean }) {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
      aria-hidden
    >
      {/* Slowly drifting grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        animate={reduce ? undefined : { backgroundPositionX: ["0px", "72px"], backgroundPositionY: ["0px", "-72px"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      />

      {/* Flowing diagonal route dashes — constant, clearly visible motion */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 3px, transparent 3px, transparent 26px)",
        }}
        animate={reduce ? undefined : { backgroundPositionX: ["0px", "260px"], backgroundPositionY: ["0px", "260px"] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      />

      {/* Two slow-drifting soft glows for depth */}
      {!reduce && (
        <>
          <motion.div
            className="absolute h-[60vh] w-[60vh] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)" }}
            initial={{ x: "-10vw", y: "-10vh" }}
            animate={{ x: ["-10vw", "30vw", "-10vw"], y: ["-10vh", "20vh", "-10vh"] }}
            transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            className="absolute right-0 bottom-0 h-[55vh] w-[55vh] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
            initial={{ x: "10vw", y: "10vh" }}
            animate={{ x: ["10vw", "-25vw", "10vw"], y: ["10vh", "-15vh", "10vh"] }}
            transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
          />
        </>
      )}

      {/* Crossing flight / freight trails */}
      {!reduce &&
        TRAILS.map((t, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center"
            style={{ top: t.top, left: 0 }}
            initial={{ x: "-25vw", opacity: 0 }}
            animate={{ x: "125vw", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: t.dur,
              delay: t.delay,
              repeat: Infinity,
              repeatDelay: 1.8,
              ease: "linear",
            }}
          >
            <div
              className="h-px"
              style={{
                width: t.w,
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.55))",
              }}
            />
            <span
              className="h-1 w-1 rounded-full bg-white"
              style={{ boxShadow: "0 0 10px 2px rgba(255,255,255,0.55)" }}
            />
          </motion.div>
        ))}

      {/* Depth radial + legibility scrim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 0%, rgba(0,0,0,0.45) 72%)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
    </div>
  );
}

/* ── Info box (image + numbered list) ────────────────────────────────── */

function InfoBox({
  title,
  items,
  img,
  imgAlt,
}: {
  title: string;
  items: InfoItem[];
  img: string;
  imgAlt: string;
}) {
  const { t } = useTranslation();
  return (
    <AnimatedSection>
      <div className="grid lg:grid-cols-2 border border-white/10 overflow-hidden bg-white/[0.02]">
        {/* Image side — equal-height rectangle, sharp corners */}
        <div className="relative bg-white/5 min-h-[320px] lg:min-h-0">
          <img
            src={img}
            alt={imgAlt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Text side — equal-height rectangle */}
        <div className="p-6 md:p-8 lg:p-10">
          <h2 className="font-display uppercase text-xl md:text-2xl xl:text-3xl leading-[0.95] tracking-tight text-white mb-5 md:mb-6">
            {t(title)}
          </h2>
          <ul className="space-y-3.5 md:space-y-4">
            {items.map((it, i) => (
              <motion.li
                key={it.term}
                variants={fadeUp}
                className="relative pl-7 border-b border-white/10 pb-3.5 md:pb-4 last:border-b-0 last:pb-0"
              >
                <span className="absolute left-0 top-0.5 font-mono text-[10px] text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-white font-medium mb-1">
                  {t(it.term)}
                </p>
                <p className="text-[12.5px] md:text-[13px] leading-relaxed text-white/55">
                  {t(it.copy)}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function PricesShippingPage() {
  const { t } = useTranslation();
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="bg-black text-white">
      {/* HERO — cinematic, animated shipping backdrop */}
      <section
        className="relative min-h-[100svh] overflow-hidden flex flex-col"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        <ShippingBackdrop reduce={reduce} />

        <div className="relative z-20 flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center text-center pt-40 md:pt-52 pb-28 md:pb-32">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] uppercase tracking-[0.3em] mb-6"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {t("About Us · Prices & Shipping")}
            </motion.p>

            <h1
              className="font-display text-[clamp(2.6rem,9vw,8rem)] leading-[0.9] tracking-tight mb-8 md:mb-10"
              style={{ color: "#ffffff" }}
            >
              {["Prices", "& Shipping"].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "115%", rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.15 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    style={{ color: "#ffffff" }}
                  >
                    {t(line)}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            >
              <PrimaryCTA href="/contact" testId="prices-hero-cta-contact" onDark>
                {t("Get Your Custom Quote")}
              </PrimaryCTA>
              <SecondaryCTA href="/about" testId="prices-hero-cta-about" onDark>
                {t("About Us")}
              </SecondaryCTA>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.45 }}
              className="mt-7 md:mt-9 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {t("Transparent pricing · Worldwide delivery")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* INFO BOXES */}
      <section className="max-w-[1480px] mx-auto px-6 pt-16 md:pt-24 pb-4 md:pb-6 space-y-8 md:space-y-12">
        <InfoBox
          title="What Affects Your Production Cost?"
          items={COST_FACTORS}
          img={pricesImg}
          imgAlt={t("BEWE4R premium blank t-shirt")}
        />
        <InfoBox
          title="How Does Shipping Work?"
          items={SHIPPING_FACTS}
          img={shippingImg}
          imgAlt={t("BEWE4R worldwide freight and air shipping")}
        />
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #ffffff 0, #ffffff 1px, transparent 1px, transparent 8.333%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display uppercase text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.9] tracking-tight text-white mb-8">
              {t("Let's Talk About")}
              <br />
              {t("Your Project")}
            </h2>
            <p className="text-white/70 text-lg md:text-2xl leading-snug max-w-2xl mx-auto mb-5">
              {t("Every brand is different. Tell us about your idea, quantities, and finishes — and we'll put together a precise, transparent quote tailored to your project.")}
            </p>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              {t("From first sample to worldwide delivery, our team guides you through every step.")}
            </p>
            <div className="flex justify-center">
              <PrimaryCTA
                href="/contact"
                testId="prices-cta-quote"
                onDark
              >
                {t("Get Your Custom Quote")}
              </PrimaryCTA>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
