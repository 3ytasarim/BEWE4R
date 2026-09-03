import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import lagerImg from "@/assets/real/lager.jpg";

export default function LagerPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      <PageHero
        videoSrc="https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8"
        kicker={t("Your Brand · Storage")}
        title={"STORAGE"}
        subtitle={t("Warehousing in Germany can be expensive. Store your products with us at favourable rates — flexible, secure and ready to ship instantly.")}
        image={lagerImg}
        badges={[
          { value: "24h", label: t("Dispatch time") },
          { value: "100%", label: t("Tracking") },
          { value: "0", label: t("Storage hassle") },
        ]}
      />

      <section className="py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
              {[
                { title: "Secure storage", desc: "Your products are stored safely, dry and clean — at our facilities in Istanbul." },
                { title: "Fast dispatch", desc: "As soon as an order comes in, we prepare it and ship it quickly." },
                { title: "Inventory control", desc: "You stay on top of your stock at all times — transparent and traceable." },
                { title: "No logistics of your own", desc: "No storage space, no staff, no headaches. We handle it all for you." },
              ].map((b) => (
                <motion.div key={b.title} variants={fadeUp} className="bg-black p-12 hover:bg-white/[0.03] transition-colors">
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
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl text-white mb-10">{t("Request storage")}</motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/contact" data-testid="lager-cta"><span className="inline-block px-10 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">{t("Get in touch")}</span></Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
