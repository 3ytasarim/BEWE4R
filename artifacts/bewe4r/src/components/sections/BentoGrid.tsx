import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import bentoBrand from "@/assets/bento-create.jpg";
import bentoMerch from "@/assets/bento-merchandise.jpg";
import bentoB2B from "@/assets/bento-b2b.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function MoreButton() {
  const { t } = useTranslation();
  return (
    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ffffff] text-[#0f0f0f] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_6px_20px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:gap-3 group-hover:bg-[rgba(255,255,255,0.85)]">
      {t("More")}
      <svg
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    </span>
  );
}

export function BentoGrid() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 border-t border-white/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.p variants={fadeUp} className="text-xs text-white/30 uppercase tracking-[0.3em] mb-4 text-center">
            {t("What we produce")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl text-white mb-16 md:whitespace-nowrap leading-none text-center">
            {t("Everything Your Brand Needs.")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-0 md:auto-rows-[minmax(200px,auto)] max-w-3xl mx-auto rounded-[2px] overflow-hidden">
            {/* CREATE YOUR OWN BRAND - Large Left */}
            <motion.div
              variants={fadeUp}
              className="md:row-span-2 group relative overflow-hidden rounded-[2px] cursor-pointer"
            >
              <Link href="/your-brand/sample" data-testid="bento-create">
                <div className="relative w-full h-full min-h-[360px]">
                  <img
                    src={bentoBrand}
                    alt={t("Create your own brand")}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0) 72%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="font-display text-4xl md:text-5xl text-[#ffffff] mb-3 leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                      {t("Create Your")}<br />{t("Own Brand")}
                    </h3>
                    <p className="text-[#ffffff]/75 text-sm md:text-base max-w-md">
                      {t("From the first sample to the finished drop — your vision, our production.")}
                    </p>
                    <MoreButton />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* MERCHANDISE - Top Right */}
            <motion.div variants={fadeUp} className="group relative overflow-hidden rounded-[2px] cursor-pointer">
              <Link href="/your-brand/print" data-testid="bento-merch">
                <div className="relative w-full h-full min-h-[200px]">
                  <img
                    src={bentoMerch}
                    alt={t("Merchandise")}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 78%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl md:text-3xl text-[#ffffff] mb-1 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">{t("Merchandise")}</h3>
                    <p className="text-[#ffffff]/75 text-xs">{t("Events · Influencer · Drops")}</p>
                    <MoreButton />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* B2B - Middle Right */}
            <motion.div variants={fadeUp} className="group relative overflow-hidden rounded-[2px] cursor-pointer">
              <Link href="/e-catalog" data-testid="bento-work">
                <div className="relative w-full h-full min-h-[200px]">
                  <img
                    src={bentoB2B}
                    alt="B2B"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 78%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl md:text-3xl text-[#ffffff] mb-1 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">B2B</h3>
                    <p className="text-[#ffffff]/75 text-xs">{t("Workwear · Dungarees · Vests")}</p>
                    <MoreButton />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
