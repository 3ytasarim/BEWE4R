import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import moqImg from "@/assets/real/moq.jpg";

const moqItems = [
  { product: "T-Shirts", moq: "30 pieces", note: "Per colour & design" },
  { product: "Hoodies", moq: "30 pieces", note: "Per colour & design" },
  { product: "Crewnecks", moq: "30 pieces", note: "Per colour & design" },
  { product: "Caps", moq: "50 pieces", note: "Per colour & design" },
  { product: "Shorts", moq: "50 pieces", note: "Per colour & design" },
  { product: "Joggers / Pants", moq: "50 pieces", note: "Per colour & design" },
];

const faq = [
  { q: "Can I mix different sizes?", a: "Yes — the MOQ refers to the total quantity. You can split it freely across sizes (XS–3XL)." },
  { q: "What if I want fewer pieces?", a: "Get in touch — for some products there are special terms for smaller quantities." },
  { q: "Does the MOQ apply per colour or in total?", a: "Per colour and design. With multiple colours the MOQ multiplies accordingly." },
  { q: "Are there discounts for larger quantities?", a: "Yes — from 100 pieces and up, significant volume discounts are possible. Get in touch." },
];

export default function MoqPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      <PageHero
        videoSrc="https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8"
        kicker={t("Your Brand · MOQ")}
        title={"MOQ"}
        subtitle={t("The minimum order quantity depends on the category and is usually between 50 and 70 pieces. This keeps production smooth and delivery fast.")}
        image={moqImg}
        badges={[
          { value: "30", label: t("Min. T-Shirts") },
          { value: "30", label: t("Min. Hoodies") },
          { value: "100+", label: t("Volume discount") },
        ]}
      />

      <section className="py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl text-white mb-12">{t("Minimum quantities at a glance")}</motion.h2>
            <div className="border-t border-white/10">
              {moqItems.map((item) => (
                <motion.div
                  key={item.product}
                  variants={fadeUp}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="border-b border-white/10 py-6 grid grid-cols-3 gap-6 hover:bg-white/[0.03] transition-colors px-4"
                >
                  <p className="text-white text-base font-medium self-center">{t(item.product)}</p>
                  <p className="font-display text-4xl text-white">{t(item.moq)}</p>
                  <p className="text-white/40 text-sm self-center">{t(item.note)}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="font-display text-5xl text-white mb-12">{t("MOQ FAQ")}</motion.h2>
            <motion.div variants={fadeUp}>
              <Accordion type="single" collapsible>
                {faq.map((item, i) => (
                  <AccordionItem key={i} value={`moq-${i}`} className="border-b border-white/10 border-t-0 border-l-0 border-r-0">
                    <AccordionTrigger className="py-5 text-base text-white font-normal hover:no-underline [&>svg]:text-white/30" data-testid={`moq-faq-${i}`}>{t(item.q)}</AccordionTrigger>
                    <AccordionContent className="text-white/50 pb-5 text-sm leading-relaxed">{t(item.a)}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black via-white/[0.02] to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl text-white mb-10">{t("Request your MOQ")}</motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/contact" data-testid="moq-cta"><span className="inline-block px-10 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">{t("Get in touch")}</span></Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
