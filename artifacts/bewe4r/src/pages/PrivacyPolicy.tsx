import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="bg-black text-white">
      {/* Hero — white island */}
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
            {t("Privacy Policy")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-3 text-sm uppercase tracking-[0.25em]"
            style={{ color: "rgba(15,15,15,0.5)" }}
          >
            {t("Last updated")}: 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="relative" style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}>
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-12"
          >
            <PolicySection t={t} title={t("1. Data Controller")}>
              <p>{t("The data controller responsible for the processing of personal data is:")}</p>
              <p className="mt-2 font-semibold">{t("Bewe4r LLC")}</p>
            </PolicySection>

            <PolicySection t={t} title={t("2. Personal Data We Collect")}>
              <p>{t("We collect and process the following personal data:")}</p>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>{t("Name")}</li>
                <li>{t("Email address")}</li>
                <li>{t("Billing and shipping address")}</li>
                <li>{t("Payment information")}</li>
                <li>{t("Phone number")}</li>
              </ul>
            </PolicySection>

            <PolicySection t={t} title={t("3. Purpose of Data Processing")}>
              <p>
                {t(
                  "Your personal data is processed solely for the purpose of contract fulfillment, order processing, delivery, and billing.",
                )}
              </p>
            </PolicySection>

            <PolicySection t={t} title={t("4. Disclosure of Personal Data")}>
              <p>{t("We do not share your personal data with third parties, except where necessary for:")}</p>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>{t("Shipping carriers and logistics providers responsible for delivering your order.")}</li>
              </ul>
            </PolicySection>

            <PolicySection t={t} title={t("5. Use of Google Analytics")}>
              <p>
                {t(
                  "This website uses Google Analytics, a web analytics service provided by Google LLC. Google Analytics uses cookies to help analyze how visitors use this website.",
                )}
              </p>
              <p className="mt-4 font-semibold">{t("Opting Out of Google Analytics")}</p>
              <p className="mt-1">
                {t("You can prevent Google Analytics from collecting your data by installing the Google Analytics Opt-out Browser Add-on:")}{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-70"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>
              </p>
            </PolicySection>

            <PolicySection t={t} title={t("6. International Data Transfers")}>
              <p>
                {t(
                  "This website is hosted on international servers. If personal data is processed outside of Türkiye, it cannot be ruled out that foreign authorities may gain access to such data in accordance with applicable laws.",
                )}
              </p>
            </PolicySection>

            <PolicySection t={t} title={t("7. Data Retention and Deletion")}>
              <p>
                {t(
                  "Personal data will be retained only for as long as necessary to fulfill the contractual relationship or to comply with applicable legal retention obligations.",
                )}
              </p>
            </PolicySection>

            <PolicySection t={t} title={t("8. Your Rights")}>
              <p>{t("You have the right to:")}</p>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>{t("Request access to your personal data")}</li>
                <li>{t("Request the correction or deletion of your personal data")}</li>
                <li>{t("Request the restriction of processing")}</li>
                <li>{t("Object to the processing of your personal data")}</li>
              </ul>
              <p className="mt-4">
                {t(
                  "If you have any questions regarding the processing of your personal data, you may contact us at info@bewe4r.com at any time.",
                )}
              </p>
            </PolicySection>

            <PolicySection t={t} title={t("9. Changes to This Privacy Policy")}>
              <p>
                {t(
                  "We reserve the right to update this Privacy Policy at any time to reflect legal, regulatory, or technical changes.",
                )}
              </p>
            </PolicySection>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function PolicySection({
  t,
  title,
  children,
}: {
  t: (key: string) => string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp} className="border-b pb-10" style={{ borderColor: "rgba(15,15,15,0.12)" }}>
      <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">{title}</h2>
      <div className="text-base leading-relaxed space-y-3" style={{ color: "rgba(15,15,15,0.75)" }}>
        {children}
      </div>
    </motion.div>
  );
}
