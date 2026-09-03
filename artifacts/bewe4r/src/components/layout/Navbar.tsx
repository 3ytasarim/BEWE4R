import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import logoUrl from "@assets/Bewe4r_logo_1780440584916.png";

const deineBrandLinks = [
  { label: "Print", href: "/your-brand/print", desc: "Screen, DTF, DTG, Embroidery, 3D Patches & Embossing" },
  { label: "Label", href: "/your-brand/label", desc: "Hang Tag, Design Tag, Neck Tag, Jeans Tag" },
  { label: "Sample", href: "/your-brand/sample", desc: "Free sample before bulk production" },
];

const weitereProdukteLinks = [
  { label: "Zip Bags & Shipping Bags", href: "/brand-essentials/zip-bags", desc: "Custom packaging — any size, color and finish" },
  { label: "Marketing Essentials", href: "/brand-essentials/marketing-essentials", desc: "Thank-you cards, flyers, stickers & customer gifts" },
];

const aboutLinks = [
  { label: "About Us", href: "/about", desc: "Who is behind BEWE4R — our studio & story" },
  { label: "Prices & Shipping", href: "/about/prices-shipping", desc: "Production cost factors & worldwide delivery" },
];

type DropdownLink = { label: string; href: string; desc: string };

function DesktopDropdown({
  label,
  testId,
  links,
  open,
  onEnter,
  onLeave,
  active,
  cols = 1,
  width = "w-80",
  dark,
}: {
  label: string;
  testId: string;
  links: DropdownLink[];
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  active: boolean;
  cols?: 1 | 2;
  width?: string;
  dark: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className={`group relative flex items-center gap-1.5 text-[11px] tracking-[0.22em] uppercase font-medium py-2 transition-colors duration-200 ${
          dark
            ? active || open
              ? "text-[#ffffff]"
              : "text-[rgba(255,255,255,0.6)] hover:text-[#ffffff]"
            : active || open
              ? "text-[#0f0f0f]"
              : "text-[rgba(15,15,15,0.55)] hover:text-[#0f0f0f]"
        }`}
        data-testid={testId}
      >
        <span>{t(label)}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
          className="w-3 h-3"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        {/* Underline */}
        <span className="absolute -bottom-0.5 left-0 right-0 h-px overflow-hidden">
          <motion.span
            initial={false}
            animate={{ scaleX: active || open ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            style={{ originX: 0 }}
            className={`block h-px w-full ${dark ? "bg-[#ffffff]" : "bg-[#0f0f0f]"}`}
          />
        </span>
      </button>

      {/* Bridge so cursor can travel from button to panel without closing */}
      <div className="absolute top-full left-0 right-0 h-3" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className={`absolute top-[calc(100%+0.75rem)] left-0 ${width} bg-[rgba(255,255,255,0.97)] backdrop-blur-xl border border-[rgba(15,15,15,0.1)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] origin-top`}
            style={{ transformPerspective: 1000 }}
          >
            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[rgba(15,15,15,0.4)] to-transparent" />

            <div className="px-2 py-3">
              <p className="px-4 pb-2 pt-1 text-[10px] tracking-[0.3em] uppercase text-[rgba(15,15,15,0.3)]">
                {t(label)}
              </p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.05 } },
                }}
                className={cols === 2 ? "grid grid-cols-2 gap-x-1" : ""}
              >
                {links.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      data-testid={`nav-${link.label.toLowerCase().replace(/[\s&]+/g, "-")}`}
                    >
                      <span className="group/item relative block px-4 py-3 transition-colors cursor-pointer overflow-hidden">
                        {/* Hover wash */}
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-[rgba(15,15,15,0.05)] origin-left scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        />
                        {/* Left accent line on hover */}
                        <span
                          aria-hidden
                          className="absolute left-0 top-3 bottom-3 w-px bg-[#0f0f0f] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center"
                        />
                        <div className="relative flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm text-[rgba(15,15,15,0.9)] group-hover/item:text-[#0f0f0f] transition-colors">
                              {t(link.label)}
                            </p>
                            <p className="text-[11px] text-[rgba(15,15,15,0.35)] mt-0.5 leading-snug">
                              {t(link.desc)}
                            </p>
                          </div>
                          <span className="text-[rgba(15,15,15,0.15)] group-hover/item:text-[rgba(15,15,15,0.8)] transition-all duration-300 group-hover/item:translate-x-1 text-base">
                            →
                          </span>
                        </div>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({
  href,
  label,
  testId,
  active,
  dark,
}: {
  href: string;
  label: string;
  testId: string;
  active: boolean;
  dark: boolean;
}) {
  const { t } = useTranslation();
  return (
    <Link href={href} data-testid={testId}>
      <span
        className={`group relative text-[11px] tracking-[0.22em] uppercase font-medium py-2 transition-colors duration-200 cursor-pointer ${
          dark
            ? active
              ? "text-[#ffffff]"
              : "text-[rgba(255,255,255,0.6)] hover:text-[#ffffff]"
            : active
              ? "text-[#0f0f0f]"
              : "text-[rgba(15,15,15,0.55)] hover:text-[#0f0f0f]"
        }`}
      >
        {t(label)}
        <span className="absolute -bottom-0.5 left-0 right-0 h-px overflow-hidden">
          <motion.span
            initial={false}
            animate={{ scaleX: active ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            style={{ originX: 0 }}
            className={`block h-px w-full group-hover:scale-x-100 ${dark ? "bg-[#ffffff]" : "bg-[#0f0f0f]"}`}
          />
        </span>
        {/* Hover-only underline (separate so it animates from left on hover) */}
        {!active && (
          <span
            aria-hidden
            className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${dark ? "bg-[#ffffff]" : "bg-[#0f0f0f]"}`}
          />
        )}
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"deineBrand" | "weitere" | "about" | null>(null);
  const [location] = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (prefix: string) => location.startsWith(prefix);
  const dark = false;

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          dark
            ? "bg-transparent"
            : "bg-[rgba(255,255,255,0.95)] backdrop-blur-xl border-b border-[rgba(15,15,15,0.1)]"
        }`}
      >
        {/* Hairline accent that animates in once */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: dark ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${dark ? "via-[rgba(255,255,255,0.3)]" : "via-[rgba(15,15,15,0.3)]"}`}
        />

        <div
          className={`max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-14 lg:h-[70px]" : "h-16 lg:h-[86px]"
          }`}
        >
          {/* LOGO */}
          <Link href="/" data-testid="link-logo">
            <span className="group relative inline-flex items-center cursor-pointer">
              <motion.img
                src={logoUrl}
                alt="BEWE4R"
                draggable={false}
                animate={{
                  height: scrolled ? 56 : 78,
                  filter: dark ? "brightness(0) invert(1)" : "brightness(0) invert(0)",
                }}
                whileHover={{ opacity: 0.72 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="w-auto select-none max-h-12 lg:max-h-none translate-y-0.5 lg:translate-y-0"
              />
              {/* Underline on hover */}
              <span
                aria-hidden
                className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${dark ? "bg-[#ffffff]" : "bg-[#0f0f0f]"}`}
              />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-9">
            <DesktopDropdown
              label="Your Brand"
              testId="nav-deine-brand"
              links={deineBrandLinks}
              open={openMenu === "deineBrand"}
              onEnter={() => setOpenMenu("deineBrand")}
              onLeave={() => setOpenMenu(null)}
              active={isActive("/your-brand")}
              cols={2}
              width="w-[640px]"
              dark={dark}
            />
            <DesktopDropdown
              label="Brand Essentials"
              testId="nav-weitere-produkte"
              links={weitereProdukteLinks}
              open={openMenu === "weitere"}
              onEnter={() => setOpenMenu("weitere")}
              onLeave={() => setOpenMenu(null)}
              active={isActive("/brand-essentials")}
              width="w-96"
              dark={dark}
            />
            <DesktopDropdown
              label="About Us"
              testId="nav-ueber-uns"
              links={aboutLinks}
              open={openMenu === "about"}
              onEnter={() => setOpenMenu("about")}
              onLeave={() => setOpenMenu(null)}
              active={isActive("/about")}
              width="w-96"
              dark={dark}
            />
            <NavLink
              href="/contact"
              label="Contact"
              testId="nav-kontakt"
              active={isActive("/contact")}
              dark={dark}
            />

            {/* Language Switcher (replaces E-Catalog) */}
            <LanguageSwitcher dark={dark} />

          </div>

          {/* Mobile: language switcher + hamburger */}
          <div className="lg:hidden flex items-center gap-2.5">
            <LanguageSwitcher dark={dark} />
            <button
              className="relative w-10 h-10 flex items-center justify-center -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
              aria-label={t("Menu")}
            >
            <span className="sr-only">{t("Menu")}</span>
            <span className="relative w-6 h-4 block">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                className={`absolute top-0 left-0 right-0 h-0.5 origin-center ${dark ? "bg-[#ffffff]" : "bg-[#0f0f0f]"}`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 ${dark ? "bg-[#ffffff]" : "bg-[#0f0f0f]"}`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                className={`absolute bottom-0 left-0 right-0 h-0.5 origin-center ${dark ? "bg-[#ffffff]" : "bg-[#0f0f0f]"}`}
              />
            </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#ffffff] lg:hidden flex flex-col pt-24 overflow-y-auto"
          >
            {/* Animated grid backdrop */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <div className="max-w-7xl h-full mx-auto px-6 grid grid-cols-6 gap-0">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="border-l border-[rgba(15,15,15,0.4)] h-full" />
                ))}
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
              }}
              className="relative px-6 py-5 space-y-6"
            >
              <MobileSection title="Your Brand" links={deineBrandLinks} />
              <MobileSection title="Brand Essentials" links={weitereProdukteLinks} />
              <MobileSection title="About Us" links={aboutLinks} />

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="border-t border-[rgba(15,15,15,0.1)] pt-5 space-y-1"
              >
                <p className="text-[10px] text-[rgba(15,15,15,0.3)] uppercase tracking-[0.3em] mb-3">
                  {t("More")}
                </p>
                <Link href="/contact">
                  <span className="block py-1.5 text-lg font-display text-[rgba(15,15,15,0.85)] hover:text-[#0f0f0f] transition-colors">
                    {t("Contact")}
                  </span>
                </Link>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileSection({
  title,
  links,
}: {
  title: string;
  links: DropdownLink[];
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      <p className="text-[10px] text-[rgba(15,15,15,0.3)] uppercase tracking-[0.3em] mb-3">{t(title)}</p>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.025, delayChildren: 0.1 } },
        }}
        className="space-y-1"
      >
        {links.map((link) => (
          <motion.div
            key={link.href}
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
            }}
          >
            <Link href={link.href}>
              <span className="group relative flex items-center justify-between py-1.5 text-lg font-display text-[rgba(15,15,15,0.8)] hover:text-[#0f0f0f] transition-colors">
                <span>{t(link.label)}</span>
                <span className="text-[rgba(15,15,15,0.15)] group-hover:text-[rgba(15,15,15,0.6)] group-hover:translate-x-1 transition-all duration-300 text-sm">
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
