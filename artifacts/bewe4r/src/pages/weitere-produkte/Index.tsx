import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import zipBagsImg from "@/assets/zip-bags.png";
import kartonagenImg from "@/assets/kartonagen.png";
import dankeskartenImg from "@/assets/dankeskarten.png";

const products = [
  { name: "Zip Bags & Shipping Bags", desc: "Premium zip bags and shipping bags with custom print — built for presentation, protection and a memorable unboxing.", href: "/brand-essentials/zip-bags", img: zipBagsImg },
  { name: "Custom Boxes", desc: "Made-to-measure boxes and cartons with your logo — unboxing as a brand experience.", href: "/brand-essentials/boxes", img: kartonagenImg },
  { name: "Marketing Essentials", desc: "Thank-you cards, flyers, stickers and customer gifts — every printed touch that turns a delivery into a brand experience.", href: "/brand-essentials/marketing-essentials", img: dankeskartenImg },
];

export default function WeitereProduktePage() {
  const { t } = useTranslation();
  return (
    <div className="bg-black text-white">
      <PageHero
        kicker={t("More Products")}
        title={t("More than\njust textiles.")}
        subtitle={t("From packaging to branded extras — everything that turns your brand into an experience.")}
        image={kartonagenImg}
        badges={[
          { value: "3", label: t("Categories") },
          { value: "100%", label: t("Custom") },
          { value: "EU", label: t("Standards") },
        ]}
      />

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {products.map((p) => (
                <motion.div key={p.name} variants={fadeUp}>
                  <Link href={p.href} data-testid={`weitere-${p.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="bg-black group hover:bg-white/5 transition-colors cursor-pointer h-full overflow-hidden">
                      <div className="aspect-[4/3] overflow-hidden border-b border-white/10">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <div className="p-8 flex flex-col gap-4">
                        <h3 className="font-display text-3xl text-white">{t(p.name)}</h3>
                        <p className="text-white/40 text-sm leading-relaxed flex-1">{t(p.desc)}</p>
                        <span className="text-xs text-white/30 uppercase tracking-widest group-hover:text-white/70 group-hover:translate-x-1 transition-all mt-2 inline-block">
                          {t("Learn more")} →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
