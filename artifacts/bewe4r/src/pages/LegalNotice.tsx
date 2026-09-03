import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function LegalNoticePage() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section
        className="relative min-h-[35svh] flex items-end overflow-hidden"
        style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 pb-12 pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight"
          >
            {t("Legal Notice")}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="relative" style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}>
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-10"
          >
            {/* 1. Company Details */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">
                {t("1. Company Details")}
              </h2>
              <div className="text-base leading-relaxed space-y-2" style={{ color: "rgba(15,15,15,0.75)" }}>
                <p>
                  <span style={{ color: "rgba(15,15,15,0.45)" }}>{t("Company")}: </span>
                  BEWE4R LLC
                </p>
                <p>
                  <span style={{ color: "rgba(15,15,15,0.45)" }}>{t("Registered in")}: </span>
                  New Mexico, USA
                </p>
              </div>
            </motion.div>

            {/* 2. Represented By */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">
                {t("2. Represented By")}
              </h2>
              <div className="text-base leading-relaxed space-y-2" style={{ color: "rgba(15,15,15,0.75)" }}>
                <p>Semih Özdemir</p>
                <p>{t("CEO")}</p>
              </div>
            </motion.div>

            {/* 3. Contact */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">
                {t("3. Contact")}
              </h2>
              <div className="text-base leading-relaxed space-y-2" style={{ color: "rgba(15,15,15,0.75)" }}>
                <p>
                  <span style={{ color: "rgba(15,15,15,0.45)" }}>{t("E-Mail")}: </span>
                  <a
                    href="mailto:info@bewe4r.com"
                    className="underline hover:no-underline"
                    style={{ color: "#0f0f0f" }}
                  >
                    info@bewe4r.com
                  </a>
                </p>
                <p>
                  <span style={{ color: "rgba(15,15,15,0.45)" }}>{t("Website")}: </span>
                  <a
                    href="https://bewe4r.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                    style={{ color: "#0f0f0f" }}
                  >
                    www.bewe4r.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* 4. Responsible for Content */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">
                {t("4. Responsible for Content")}
              </h2>
              <div className="text-base leading-relaxed space-y-2" style={{ color: "rgba(15,15,15,0.75)" }}>
                <p>Semih Özdemir</p>
                <p>BEWE4R LLC</p>
                <p>1209 MOUNTAIN ROAD PL NE, STE R</p>
                <p>ALBUQUERQUE, NM 87110</p>
                <p>United States</p>
              </div>
            </motion.div>

            {/* 5. Consumer Dispute Resolution */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">
                {t("5. Consumer Dispute Resolution")}
              </h2>
              <div className="text-base leading-relaxed" style={{ color: "rgba(15,15,15,0.75)" }}>
                <p>
                  {t(
                    "We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board."
                  )}
                </p>
              </div>
            </motion.div>

            {/* 6. Liability Disclaimer */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">
                {t("6. Liability Disclaimer")}
              </h2>
              <div className="text-base leading-relaxed" style={{ color: "rgba(15,15,15,0.75)" }}>
                <p>
                  {t(
                    "The contents of this website are created with the greatest possible care. However, we cannot assume any liability for the accuracy, completeness, and timeliness of the content."
                  )}
                </p>
              </div>
            </motion.div>

            {/* 7. Copyright */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">
                {t("7. Copyright")}
              </h2>
              <div className="text-base leading-relaxed" style={{ color: "rgba(15,15,15,0.75)" }}>
                <p>
                  {t(
                    "All content on this website, including texts, images, graphics, and logos, is protected by copyright. Any use outside the limits of copyright law requires prior written consent."
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
