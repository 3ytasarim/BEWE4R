import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import lieferungImg from "@/assets/real/lieferung.jpg";

export default function LieferungPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      <PageHero
        videoSrc="https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8"
        kicker={t("Your Brand · Delivery")}
        title={"DELIVERY"}
        subtitle={t("With our weekly shipping service you receive your products exactly when you need them. Efficient, flexible and fully tailored to your needs.")}
        image={lieferungImg}
        badges={[
          { value: "14", label: t("Countries") },
          { value: "7–14", label: t("Days DACH") },
          { value: "DHL", label: t("Tracking") },
        ]}
      />

      <section className="py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
              {[
                { region: "Germany", detail: "7–14 business days / express available" },
                { region: "Austria", detail: "7–14 business days / express available" },
                { region: "Switzerland", detail: "10–16 business days / express available" },
                { region: "Other EU countries", detail: "10–18 business days" },
                { region: "UK", detail: "10–18 business days" },
                { region: "USA / Worldwide", detail: "On request" },
              ].map((r) => (
                <motion.div key={r.region} variants={fadeUp} className="bg-black p-10 hover:bg-white/[0.03] transition-colors group">
                  <h3 className="font-display text-3xl text-white mb-2 group-hover:translate-x-1 transition-transform">{t(r.region)}</h3>
                  <p className="text-white/40 text-sm">{t(r.detail)}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Professional packaging", desc: "Every order is packed securely, presentably and in line with your brand guidelines." },
                { title: "Shipment tracking", desc: "You get tracking for every shipment — full transparency right to the doorstep." },
                { title: "Customs handling", desc: "We take care of all customs formalities — you don't have to worry about a thing." },
              ].map((b) => (
                <motion.div key={b.title} variants={fadeUp} className="border-t border-white/10 pt-8 hover:border-white/30 transition-colors">
                  <h3 className="font-display text-3xl text-white mb-4">{t(b.title)}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{t(b.desc)}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black via-white/[0.02] to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl text-white mb-10">{t("Request delivery")}</motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/contact" data-testid="lieferung-cta"><span className="inline-block px-10 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">{t("Get in touch")}</span></Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
