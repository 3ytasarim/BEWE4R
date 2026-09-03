import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiMail } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import UndulatingBackground from "@/components/sections/UndulatingBackground";
import { useTranslation } from "react-i18next";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function KontaktPage() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", brand: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Error sending message. Please try again or contact via WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Hero — Print-style cinematic, white bg + undulating animation */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden flex flex-col"
        style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}
      >
        {/* Animated undulating SVG grid — monochrome on white */}
        <div className="absolute inset-0 z-0">
          <UndulatingBackground className="w-full h-full" />
          {/* Soft white wash — keeps the centered copy crisp over the grid */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(62% 58% at 50% 46%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center text-center pt-40 md:pt-44 pb-28 md:pb-32">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="flex flex-col items-center"
            >
              <motion.p
                variants={fadeUp}
                className="text-[11px] uppercase tracking-[0.3em] mb-6"
                style={{ color: "rgba(15,15,15,0.55)" }}
              >
                {t("Contact")}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] mb-6"
                style={{ color: "#0f0f0f", whiteSpace: "pre-line" }}
              >
                {t("Let's make\ndreams come true\nwith BEWE4R")}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg max-w-xl leading-relaxed"
                style={{ color: "rgba(15,15,15,0.5)" }}
              >
                {t("Tell us about your project — we'll get back to you within 24 hours.")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact */}
      <section className="py-14 border-b border-white/10" ref={formRef}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
          >
            {/* Info */}
            <motion.div variants={fadeUp} className="space-y-10">
              <div>
                <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-6">{t("Direct contact")}</p>
                <div className="space-y-6">
                  <WhatsAppButton
                    variant="card"
                    label={t("WhatsApp")}
                    sublabel={t("Fastest response")}
                    testId="kontakt-whatsapp"
                  />

                  <motion.a
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    href="https://instagram.com/bewe4r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 px-6 py-5 border border-white/10 hover:border-white/40 transition-all overflow-hidden"
                    data-testid="kontakt-instagram"
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.1] transition-opacity duration-500"
                      style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
                    />
                    <span
                      className="relative w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-full shadow-lg"
                      style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
                    >
                      <FaInstagram className="w-5 h-5" style={{ color: "#ffffff" }} />
                    </span>
                    <span className="relative flex-1 min-w-0">
                      <span className="block text-white text-sm font-medium">{t("Instagram")}</span>
                      <span className="block text-white/50 text-xs mt-0.5">@bewe4r</span>
                    </span>
                    <span className="relative text-white/30 group-hover:text-white transition-colors" aria-hidden>
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8h10m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </motion.a>

                  <motion.a
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    href="mailto:info@bewe4r.com"
                    className="group relative flex items-center gap-4 px-6 py-5 border border-white/10 hover:border-white/40 transition-all overflow-hidden"
                    data-testid="kontakt-email"
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500"
                      style={{ background: "#0f0f0f" }}
                    />
                    <span
                      className="relative w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-full shadow-lg"
                      style={{ background: "#0f0f0f" }}
                    >
                      <FiMail className="w-5 h-5" style={{ color: "#ffffff" }} />
                    </span>
                    <span className="relative flex-1 min-w-0">
                      <span className="block text-white text-sm font-medium">{t("Email")}</span>
                      <span className="block text-white/50 text-xs mt-0.5">info@bewe4r.com</span>
                    </span>
                    <span className="relative text-white/30 group-hover:text-white transition-colors" aria-hidden>
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8h10m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeUp}>
              {submitted ? (
                <div className="flex flex-col gap-6 py-16">
                  <div className="w-14 h-14 border border-white/20 flex items-center justify-center">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <h3 className="font-display text-4xl text-white">{t("Message sent.")}</h3>
                  <p className="text-white/50">{t("We'll get back to you within 24 hours.")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" data-testid="kontakt-form">
                  {error && (
                    <div className="px-4 py-3 text-sm border border-white/20 bg-white/5" style={{ color: "#f87171" }}>
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/30 uppercase tracking-widest mb-2">{t("Name *")}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder-white/20"
                        placeholder={t("Your name")}
                        data-testid="kontakt-input-name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/30 uppercase tracking-widest mb-2">{t("Email *")}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder-white/20"
                        placeholder="you@email.com"
                        data-testid="kontakt-input-email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-white/30 uppercase tracking-widest mb-2">{t("Brand Name")}</label>
                    <input
                      type="text"
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder-white/20"
                      placeholder={t("Your brand (optional)")}
                      data-testid="kontakt-input-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/30 uppercase tracking-widest mb-2">{t("Message *")}</label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={7}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder-white/20 resize-none"
                      placeholder={t("Tell us about your project — product, quantity, timeline, questions...")}
                      data-testid="kontakt-input-message"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-white text-black text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="kontakt-submit"
                  >
                    {sending ? "Sending..." : t("Request your project")}
                  </button>
                  <p className="text-white/20 text-xs text-center">{t("Or message us directly on WhatsApp for a faster reply.")}</p>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
