import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import preorderImg from "@/assets/real/preorder.jpg";

export default function PreOrderPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      <PageHero
        videoSrc="https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8"
        kicker={t("Your Brand · Pre-Order")}
        title={"PRE-ORDER"}
        subtitle={t("Produce when you have orders. For new brands especially, keeping risk low is key — test your products without high upfront costs.")}
        image={preorderImg}
        badges={[
          { value: "0", label: t("Inventory risk") },
          { value: "0%", label: t("Upfront financing") },
          { value: "100%", label: t("Flexibility") },
        ]}
      />

      <section className="py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
              {[
                { title: "No inventory risk", desc: "You only produce what's been sold. No overstock, no write-offs." },
                { title: "No capital risk", desc: "Your customers fund the production upfront. You never pay out of pocket first." },
                { title: "Maximum flexibility", desc: "Test new designs with minimal risk and scale to demand." },
              ].map((b) => (
                <motion.div key={b.title} variants={fadeUp} className="bg-black p-10 hover:bg-white/[0.03] transition-colors">
                  <h3 className="font-display text-3xl text-white mb-4">{t(b.title)}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{t(b.desc)}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl text-white mb-16">{t("How pre-order works")}</motion.h2>
            <div className="space-y-0">
              {[
                { n: "01", t: "Announce the drop", d: "Announce your drop to your community — on Instagram, newsletter or your shop." },
                { n: "02", t: "Collect orders", d: "Collect orders within your pre-order window (typically 1–2 weeks)." },
                { n: "03", t: "Start production", d: "We produce based on the orders collected." },
                { n: "04", t: "Delivery & fulfillment", d: "We deliver directly to you or to your customers." },
              ].map((s) => (
                <motion.div key={s.n} variants={fadeUp} className="border-t border-white/10 py-8 grid grid-cols-12 gap-6 items-center hover:bg-white/[0.03] transition-colors px-2">
                  <p className="col-span-2 font-display text-5xl text-white/15">{s.n}</p>
                  <h3 className="col-span-4 font-display text-2xl text-white">{t(s.t)}</h3>
                  <p className="col-span-6 text-white/50 text-sm">{t(s.d)}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black via-white/[0.02] to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl text-white mb-10">{t("Start a pre-order")}</motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/contact" data-testid="preorder-cta"><span className="inline-block px-10 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">{t("Get in touch")}</span></Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
