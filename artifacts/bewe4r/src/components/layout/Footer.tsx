import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import logoUrl from "@assets/Bewe4r_logo_1780440584916.png";
import { WhatsAppLogo } from "@/components/ui/whatsapp-button";

function MarqueeGroup() {
  return (
    <div className="flex items-center shrink-0" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-display text-2xl md:text-4xl tracking-wide px-8"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            BEWE4R.COM
          </span>
          <span className="text-lg" style={{ color: "rgba(255,255,255,0.3)" }}>
            —
          </span>
        </span>
      ))}
    </div>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 shrink-0" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CreditMarquee() {
  const text = "DESIGN BY BLEIBSICHTBAR.COM";
  return (
    <a
      href="https://bleibsichtbar.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="overflow-hidden relative block w-full md:w-auto md:max-w-[260px]"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-4"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <Star />
            <span className="text-[11px] uppercase tracking-[0.2em] font-mono">{text}</span>
            <Star />
          </span>
        ))}
      </motion.div>
    </a>
  );
}

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="relative overflow-hidden rounded-t-[2rem]"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      {/* ===== SCROLLING MARQUEE ===== */}
      <div
        className="relative overflow-hidden border-b py-5 md:py-6"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          <MarqueeGroup />
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-14 md:pt-16 pb-10 md:pb-12">
          {/* Statement */}
          <div className="md:col-span-1">
            <Link href="/">
              <img
                src={logoUrl}
                alt="BEWE4R"
                draggable={false}
                className="h-9 md:h-10 w-auto block mb-6 cursor-pointer select-none"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <h2
              className="font-display text-3xl md:text-4xl leading-[1.02]"
              style={{ color: "#ffffff" }}
            >
              {t("Let's bring your brand to life.")}
            </h2>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3 md:pt-2">
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t("Legal")}
            </p>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Legal Notice", href: "/legal-notice" },
              { label: "Terms", href: "/terms" },
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <span
                  className="text-sm transition-colors cursor-pointer hover:text-[#ffffff]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {t(item.label)}
                </span>
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 md:pt-2">
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t("Contact")}
            </p>
            <a
              href="mailto:info@bewe4r.com"
              data-testid="link-email"
              className="group flex items-center gap-3 text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="5" width="18" height="14" rx="1" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span className="border-b border-transparent group-hover:border-[rgba(255,255,255,0.4)] transition-colors">
                info@bewe4r.com
              </span>
            </a>
            <a
              href="https://wa.me/+4917624343418"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-consultation"
              className="group flex items-center gap-3 text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <WhatsAppLogo className="w-4 h-4 shrink-0" />
              <span className="border-b border-transparent group-hover:border-[rgba(255,255,255,0.4)] transition-colors">
                {t("Free consultation")}
              </span>
            </a>
            <a
              href="https://instagram.com/bewe4r"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-instagram"
              className="group flex items-center gap-3 text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              <span className="border-b border-transparent group-hover:border-[rgba(255,255,255,0.4)] transition-colors">
                {t("Follow us on Instagram")}
              </span>
            </a>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div
          className="border-t py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] tracking-wide"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span>© {new Date().getFullYear()} BEWE4R {t("Production Studio")}</span>
            <span
              className="hidden md:block w-1 h-1 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            />
            <span>{t("All rights reserved")}</span>
          </div>
          <CreditMarquee />
        </div>
      </div>
    </footer>
  );
}
