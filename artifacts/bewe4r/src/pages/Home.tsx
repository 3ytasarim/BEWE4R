import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { HOME_FAQ } from "@/data/faqs";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { HowToStart } from "@/components/sections/HowToStart";
import { ProductDuo } from "@/components/sections/ProductDuo";
import { ProductionServicesCarousel } from "@/components/sections/ProductionServicesCarousel";
import { HeroCinematic } from "@/components/sections/HeroCinematic";
// import { ShinyCTABand } from "@/components/sections/ShinyCTABand"; // hidden from live site per request
import { SectionHeading } from "@/components/sections/SectionHeading";
import { OurCustomers } from "@/components/sections/OurCustomers";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { MarqueeRibbon } from "@/components/ui/marquee-ribbon";

function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const ticker = ["PREMIUM QUALITY", "TEXTILE MANUFACTURER", "PREMIUM QUALITY"];

export default function Home() {
  const { t } = useTranslation();
  const faqRef = useScrollReveal();
  const contactRef = useScrollReveal();

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <HeroCinematic />

      {/* TICKER */}
      <MarqueeRibbon items={ticker} />

      {/* BENTO GRID — what we produce */}
      <BentoGrid />

      {/* HOW TO START — animated half-moon process arc */}
      <HowToStart />

      {/* PRODUCT DUO — From Blank to Brand + Every Detail. Your Decision */}
      <ProductDuo />

      {/* PRODUCTION SERVICES — tilted coverflow carousel */}
      <ProductionServicesCarousel />

      {/* OUR CUSTOMERS */}
      <OurCustomers />

      {/* SHINY CTA BAND — hidden from live site per request */}
      {/* <ShinyCTABand /> */}

      {/* FAQ */}
      <section className="py-16 border-t border-white/10" ref={faqRef.ref}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={faqRef.isInView ? "visible" : "hidden"}
          >
            <SectionHeading
              kicker={t("FAQ")}
              title={t("Frequently\nAsked")}
              watermark={t("FAQ")}
              size="xl"
              className="mb-16"
            />
            <motion.div variants={fadeUp}>
              <FaqAccordion
                items={HOME_FAQ.map((item) => ({ q: t(item.q), a: t(item.a as string) }))}
                itemClassName="border-b border-white/10"
                triggerClassName="py-6 text-base text-white font-normal tracking-wide"
                answerClassName="text-white/50 pb-6 text-sm leading-relaxed"
                testIdPrefix="faq-trigger"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-16 border-t border-white/10 bg-white/2" ref={contactRef.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={contactRef.isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <motion.div variants={fadeUp}>
              <SectionHeading
                kicker={t("Contact")}
                title={t("Ready to launch\nyour brand?")}
                watermark={t("Start")}
                size="xl"
                className="mb-6"
              />
              <p className="text-white/50 mb-10 leading-relaxed">
                {t("Write to us — we'll get back to you within 24 hours.")}
              </p>
              <div className="flex flex-col gap-4">
                <WhatsAppButton variant="solid" size="lg" testId="contact-whatsapp" className="w-fit">
                  {t("Contact us on WhatsApp")}
                </WhatsAppButton>
                <a
                  href="https://instagram.com/bewe4r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 border border-white/20 text-white text-sm uppercase tracking-widest hover:border-white/60 hover:bg-white/5 transition-all w-fit"
                  data-testid="contact-instagram"
                >
                  {t("@bewe4r on Instagram")}
                </a>
                <a
                  href="mailto:info@bewe4r.com"
                  className="text-white/40 hover:text-white text-sm transition-colors"
                  data-testid="contact-email"
                >
                  info@bewe4r.com
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Error sending message. Please try again or contact via WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start justify-center h-full gap-4 py-12">
        <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
          <span className="text-white text-xl">✓</span>
        </div>
        <h3 className="font-display text-3xl text-white">{t("Message sent.")}</h3>
        <p className="text-white/50">{t("We'll get back to you within 24 hours.")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
      {error && (
        <div className="px-4 py-3 text-sm border border-white/20 bg-white/5" style={{ color: "#f87171" }}>
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs text-white/30 uppercase tracking-widest mb-2">{t("Name")}</label>
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={sending}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder-white/20 disabled:opacity-50"
          placeholder={t("Your name")}
          data-testid="input-name"
        />
      </div>
      <div>
        <label className="block text-xs text-white/30 uppercase tracking-widest mb-2">{t("Email")}</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={sending}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder-white/20 disabled:opacity-50"
          placeholder="you@email.com"
          data-testid="input-email"
        />
      </div>
      <div>
        <label className="block text-xs text-white/30 uppercase tracking-widest mb-2">{t("Message")}</label>
        <textarea
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          disabled={sending}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder-white/20 resize-none disabled:opacity-50"
          placeholder={t("Tell us about your project...")}
          data-testid="input-message"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full py-4 bg-white text-black text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button-submit"
      >
        {sending ? "Sending..." : t("Send message")}
      </button>
    </form>
  );
}
