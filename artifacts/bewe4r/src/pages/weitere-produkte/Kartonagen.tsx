import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import kartonagenImg from "@/assets/real/kartonagen.jpg";

export default function KartonagenPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      <PageHero
        videoSrc="https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8"
        kicker={t("More Products · Boxes")}
        title={t("CUSTOM\nBOXES")}
        subtitle={t("We produce boxes built entirely to your requirements — in any shape, size and color. From a simple print to a 3D design with special openings, anything is possible.")}
        image={kartonagenImg}
        badges={[
          { value: t("Custom"), label: t("Dimensions") },
          { value: t("Recycled"), label: t("Material") },
          { value: "100%", label: t("Printed") },
        ]}
      />

      <section className="py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
              {[
                { title: "Made to measure", desc: "Every box is cut to fit your product and your size requirements." },
                { title: "Custom printed", desc: "Inside, outside or both — full-surface print in your brand colors." },
                { title: "Premium materials", desc: "Recycled cardboard, kraft paper or premium corrugated board — your choice." },
                { title: "Unboxing experience", desc: "Textures, varnishes, foiling — your box should beg to be torn open." },
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
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl text-white mb-10">{t("Request custom boxes")}</motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/contact" data-testid="kartonagen-cta"><span className="inline-block px-10 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">{t("Get in touch")}</span></Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
