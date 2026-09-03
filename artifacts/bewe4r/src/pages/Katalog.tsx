import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

type Item = { name: string; spec: string; price: string };
type Group = { id: string; title: string; items: Item[] };

const collections: { id: string; label: string; tagline: string; groups: Group[] }[] = [
  {
    id: "regular",
    label: "Regular Fit",
    tagline: "A classic cut — the all-rounder for every brand.",
    groups: [
      {
        id: "tshirts",
        title: "T-Shirts",
        items: [
          { name: "T-Shirt", spec: "100–150 GSM", price: "€5–6" },
          { name: "T-Shirt", spec: "150–200 GSM", price: "€6–7" },
        ],
      },
      {
        id: "hoodies",
        title: "Hoodies",
        items: [
          { name: "Hoodie", spec: "200–250 GSM", price: "€10–12" },
          { name: "Hoodie", spec: "250–300 GSM", price: "€12–13" },
        ],
      },
      {
        id: "zipper",
        title: "Zipper",
        items: [
          { name: "Zip-Up", spec: "250 GSM", price: "€12–13" },
          { name: "Zip-Up", spec: "250–300 GSM", price: "€13–14" },
        ],
      },
      {
        id: "sweater",
        title: "Sweater",
        items: [{ name: "Sweater", spec: "200–300 GSM", price: "€11–13" }],
      },
      {
        id: "joggers",
        title: "Jogger",
        items: [
          { name: "Jogger Cotton", spec: "200–250 GSM", price: "€10–12" },
          { name: "Jogger Nylon Lightweight", spec: "—", price: "€13–14" },
          { name: "Jogger Nylon Heavyweight", spec: "—", price: "€14–16" },
        ],
      },
    ],
  },
  {
    id: "oversized",
    label: "Oversized Fit",
    tagline: "The streetwear standard — relaxed, heavy, statement.",
    groups: [
      {
        id: "ovs-tshirts",
        title: "T-Shirts",
        items: [{ name: "Oversized T-Shirt", spec: "200–240 GSM", price: "€8–10" }],
      },
      {
        id: "ovs-hoodies",
        title: "Hoodies",
        items: [
          { name: "Oversized Hoodie", spec: "300–400 GSM", price: "€14–16" },
          { name: "Oversized Hoodie", spec: "400–450 GSM", price: "€15–17" },
        ],
      },
      {
        id: "ovs-zipper",
        title: "Zipper",
        items: [{ name: "Oversized Zip-Up", spec: "300–400 GSM", price: "€14–15" }],
      },
      {
        id: "ovs-zipup",
        title: "Heavy Zip-Up",
        items: [
          { name: "Zip-Up Hoodie", spec: "350–400 GSM", price: "€15–17" },
          { name: "Zip-Up Hoodie", spec: "400–450 GSM", price: "€16–18" },
        ],
      },
      {
        id: "ovs-joggers-cotton",
        title: "Jogger (Cotton)",
        items: [
          { name: "Jogger Cotton", spec: "250–300 GSM", price: "€14–16" },
          { name: "Jogger Cotton", spec: "350–400 GSM", price: "€15–18" },
        ],
      },
      {
        id: "ovs-joggers-nylon",
        title: "Jogger (Nylon)",
        items: [
          { name: "Jogger Nylon", spec: "250–300 GSM", price: "€14–16" },
          { name: "Jogger Nylon", spec: "350–400 GSM", price: "€15–18" },
        ],
      },
    ],
  },
  {
    id: "fitness",
    label: "Performance",
    tagline: "For athletes and fitness brands — functional, fitted, lightweight.",
    groups: [
      {
        id: "fit-tshirts",
        title: "Compressed Fitness T-Shirts",
        items: [{ name: "Compression Tee", spec: "150–250 GSM", price: "€7–11" }],
      },
    ],
  },
  {
    id: "polos",
    label: "Polos & Shirts",
    tagline: "Business, premium-casual, corporate.",
    groups: [
      {
        id: "poloshirts",
        title: "Polo Shirts",
        items: [
          { name: "Polo Shirt", spec: "200–220 GSM", price: "€9–10" },
          { name: "Polo Shirt", spec: "220–240 GSM", price: "€9–11" },
        ],
      },
      {
        id: "hemden",
        title: "Shirts / Blouses",
        items: [
          { name: "Shirt Lightweight", spec: "Cotton Blend", price: "€12–14" },
          { name: "Shirt Premium", spec: "Cotton Stretch", price: "€14–17" },
        ],
      },
    ],
  },
  {
    id: "workwear",
    label: "B2B Workwear",
    tagline: "Rugged workwear & corporate merch.",
    groups: [
      {
        id: "fleece",
        title: "Fleece Jackets",
        items: [
          { name: "Fleece Jacket", spec: "280–320 GSM", price: "€14–20" },
          { name: "Fleece Jacket", spec: "320–350 GSM", price: "€22–26" },
        ],
      },
      {
        id: "westen",
        title: "Printed Vests",
        items: [
          { name: "Vest Standard", spec: "—", price: "€14–16" },
          { name: "Vest Premium", spec: "—", price: "€19–24" },
        ],
      },
      {
        id: "jacken",
        title: "Work Jackets",
        items: [
          { name: "Transitional / Rain Jacket", spec: "—", price: "€22–28" },
          { name: "Lined Winter Jacket", spec: "—", price: "€28–36" },
          { name: "Softshell Jacket", spec: "—", price: "€28–36" },
        ],
      },
      {
        id: "latz",
        title: "Dungarees",
        items: [
          { name: "Standard Dungarees", spec: "—", price: "€18–22" },
          { name: "Premium Dungarees", spec: "reinforced", price: "€22–28" },
        ],
      },
      {
        id: "shorts",
        title: "Work Shorts",
        items: [
          { name: "Standard Shorts", spec: "—", price: "€14–17" },
          { name: "Stretch / Premium", spec: "—", price: "€17–21" },
        ],
      },
      {
        id: "merch",
        title: "Merch for Companies / Influencers / Events",
        items: [
          { name: "Caps · Beanies · Accessories", spec: "—", price: "€5–9" },
          { name: "T-Shirts · Hoodies · Event-Merch", spec: "—", price: "€9–18" },
        ],
      },
    ],
  },
];

function GroupBlock({ group }: { group: Group }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="border-t border-white/10 py-10"
    >
      <motion.h3 variants={fadeUp} className="font-display text-3xl md:text-4xl text-white mb-6">
        {t(group.title)}
      </motion.h3>
      <div className="space-y-0">
        {group.items.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="grid grid-cols-12 gap-4 py-4 border-b border-white/5 hover:bg-white/3 px-2 -mx-2 transition-colors items-baseline"
          >
            <p className="col-span-6 md:col-span-5 text-white text-sm md:text-base">{t(item.name)}</p>
            <p className="col-span-3 md:col-span-4 text-white/40 text-xs md:text-sm uppercase tracking-wider">{t(item.spec)}</p>
            <p className="col-span-3 font-display text-2xl md:text-3xl text-white text-right">{item.price}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function KatalogPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(collections[0].id);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const active = collections.find((c) => c.id === activeTab)!;

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="py-16 border-b border-[rgba(255,255,255,0.1)] bg-[#0f0f0f] text-[#ffffff]" ref={heroRef}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" animate={heroInView ? "visible" : "hidden"}>
            <motion.p variants={fadeUp} className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.3em] mb-4">
              {t("Catalog · Prices per piece")}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(4rem,10vw,9rem)] leading-none text-[#ffffff] mb-6"
            >
              {t("What you")}<br />{t("can produce.")}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[rgba(255,255,255,0.5)] text-lg max-w-2xl leading-relaxed mb-10">
              {t("Transparent per-piece pricing by material and weight. Volume discounts from 100 pieces. Printing, embroidery, labels and shipping on request.")}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact" data-testid="katalog-cta">
                <span className="inline-block px-8 py-4 bg-[#ffffff] text-[#0f0f0f] text-sm uppercase tracking-widest hover:bg-[rgba(255,255,255,0.9)] transition-colors">
                  {t("Request a quote")}
                </span>
              </Link>
              <WhatsAppButton variant="outline" size="lg" testId="katalog-wa">
                {t("Ask on WhatsApp")}
              </WhatsAppButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sticky tabs */}
      <div className="sticky top-16 z-30 bg-[rgba(255,255,255,0.95)] backdrop-blur border-b border-[rgba(15,15,15,0.1)]">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`relative py-5 px-4 md:px-6 text-xs md:text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${
                activeTab === c.id ? "text-[#0f0f0f]" : "text-[rgba(15,15,15,0.4)] hover:text-[rgba(15,15,15,0.7)]"
              }`}
              data-testid={`katalog-tab-${c.id}`}
            >
              {t(c.label)}
              {activeTab === c.id && (
                <motion.span
                  layoutId="katalog-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#0f0f0f]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active collection */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-3">{t(active.label)}</p>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-4 leading-none">{t(active.label)}</h2>
            <p className="text-white/50 max-w-xl leading-relaxed mb-8">{t(active.tagline)}</p>

            {/* Column header */}
            <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/20 mb-2 text-xs uppercase tracking-widest text-white/30">
              <p className="col-span-6 md:col-span-5">{t("Product")}</p>
              <p className="col-span-3 md:col-span-4">{t("Spec")}</p>
              <p className="col-span-3 text-right">{t("Price / piece")}</p>
            </div>

            {active.groups.map((g) => (
              <GroupBlock key={g.id} group={g} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Note */}
      <section className="py-16 border-t border-white/10 bg-white/2">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { t: "Volume discounts", d: "Significant reductions from 100 pieces. Larger quantities on request." },
            { t: "Finishing extra", d: "Print, embroidery, labels and hangtags are calculated separately." },
            { t: "MOQ from 30 pieces", d: "Per color & design. Free choice of size mix within the MOQ." },
          ].map((b) => (
            <div key={b.t} className="border-t border-white/10 pt-6">
              <h3 className="font-display text-2xl text-white mb-2">{t(b.t)}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t(b.d)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6">{t("Ready for a quote?")}</h2>
          <p className="text-white/50 mb-10">{t("Tell us about your project — we reply within 24 hours.")}</p>
          <Link href="/contact">
            <span className="inline-block px-10 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
              {t("Request your project")}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
