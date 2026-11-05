import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * Hero of the blog page: pill badge, large uppercase headline with a gradient on the accent word, short subtitle.
 * Sits directly under the fixed site header.
 */
export function BlogHero() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#ffffff] pb-12 pt-28 lg:pb-16 lg:pt-36">
      <div className="mx-auto max-w-[1760px] px-6 text-center lg:px-[80px]">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex h-[30px] items-center rounded-full border border-[#0f0f0f]/25 bg-[#0f0f0f]/5 px-[14px] text-[13px] font-medium text-[#0f0f0f] lg:h-[38px] lg:px-5 lg:text-base"
        >
          {t("Blog")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 font-display font-normal uppercase leading-[1.05] tracking-tight text-[#0f0f0f] text-[clamp(2.4rem,5.4vw,6.25rem)]"
        >
          {t("Fashion Brand")}{" "}
          <span className="bg-gradient-to-r from-[#0f0f0f] to-[#6b6b6b] bg-clip-text text-transparent">
            {t("Guides")}
          </span>
          <span className="text-[#0f0f0f]">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-[clamp(320px,46vw,760px)] text-[clamp(16px,1.25vw,22px)] leading-[1.45] text-[#0f0f0f]/70"
        >
          {t("Practical answers on sampling, minimum quantities, production time and everything else you need to launch your own clothing brand.")}
        </motion.p>
      </div>
    </section>
  );
}
