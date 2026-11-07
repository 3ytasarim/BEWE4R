import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PrimaryCTA } from "@/components/ui/cta-button";
import { SAMPLE_FAQ } from "@/data/faqs";

export default function SampleFaq() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useTranslation();

  return (
    <section className="bg-black text-white py-20 md:py-28 border-t border-white/10" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-center text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight text-white mb-12 md:mb-16"
        >
          {t("FAQs")}
        </motion.h2>

        <div className="space-y-4">
          {SAMPLE_FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[28px] overflow-hidden border"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: isOpen ? "rgba(15,15,15,0.28)" : "rgba(15,15,15,0.14)",
                  boxShadow: "0 6px 24px rgba(15,15,15,0.05)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`sample-faq-answer-${i}`}
                  data-testid={`sample-faq-trigger-${i}`}
                  className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-8 py-5 md:py-6 cursor-pointer"
                >
                  <span
                    className="font-display uppercase tracking-wide text-[1.35rem] md:text-[1.6rem] leading-tight"
                    style={{ color: "#0f0f0f" }}
                  >
                    {t(item.q)}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-4xl md:text-[2.6rem] leading-none select-none"
                    style={{ color: "#0f0f0f" }}
                  >
                    +
                  </motion.span>
                </button>

                <div
                  id={`sample-faq-answer-${i}`}
                  role="region"
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 md:pb-7 pt-0 space-y-3">
                      {(Array.isArray(item.a) ? item.a : [item.a]).map((p, j) => (
                        <p key={j} className="text-[0.95rem] leading-relaxed" style={{ color: "rgba(15,15,15,0.62)" }}>
                          {t(p)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing tagline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-16 md:mt-20"
        >
          <p
            className="font-display uppercase text-[clamp(1.6rem,3.6vw,2.75rem)] leading-tight tracking-tight mb-8"
            style={{ color: "#0f0f0f" }}
          >
            {t("Let's turn your vision into")}
            <br />
            {t("a production-ready product.")}
          </p>
          <div className="flex justify-center">
            <PrimaryCTA href="/contact" testId="sample-faq-cta">
              {t("Start your Sample now")}
            </PrimaryCTA>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
