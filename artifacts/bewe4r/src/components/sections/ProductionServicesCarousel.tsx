import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { AnimatedSection, fadeUp } from "@/components/sections/AnimatedSection";
import { SpotlightImageCard } from "@/components/ui/spotlight-card";
import samplesImg from "@/assets/services/samples.jpg";
import printImg from "@/assets/services/print.jpg";
import labelsImg from "@/assets/services/labels.jpg";
import zipbagsImg from "@/assets/services/zipbags.jpg";

type Service = { title: string; img: string; href: string };

const SERVICES: Service[] = [
  { title: "Samples", img: samplesImg, href: "/your-brand/sample" },
  { title: "Print", img: printImg, href: "/your-brand/print" },
  { title: "Labels", img: labelsImg, href: "/your-brand/label" },
  { title: "Zip Bags & Shipping Bags", img: zipbagsImg, href: "/brand-essentials/zip-bags" },
];

export function ProductionServicesCarousel() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title={t("Discover Our\nCustom Productions")}
          description={t(
            "From the first techpack to bulk production — every step handled in-house.",
          )}
          align="center"
          watermark={t("Services")}
          size="lg"
        />

        {/* Clean spotlight-card grid — images in their real colors, click to open */}
        <AnimatedSection className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {SERVICES.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link
                  href={item.href}
                  data-testid={`service-card-${item.title.toLowerCase()}`}
                  className="group relative block"
                >
                  <SpotlightImageCard
                    src={item.img}
                    alt={t(item.title)}
                    aspect="aspect-[4/5]"
                  />
                  {/* Slim readability gradient only behind the title — image stays full color */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-left">
                    <span
                      className="font-display uppercase leading-none text-[#ffffff] tracking-tight"
                      style={{
                        fontSize: "clamp(1.5rem,2.4vw,2.25rem)",
                        textShadow:
                          "0 6px 24px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.55)",
                      }}
                    >
                      {t(item.title)}
                    </span>
                    <span className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.85)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {t("View")}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* And Much More — shimmering tagline below the gallery */}
      <div className="flex justify-center pt-14">
        <span
          className="font-display uppercase text-2xl md:text-3xl tracking-tight bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(100deg, #0f0f0f 0%, #0f0f0f 35%, #0f0f0f 45%, #64CEFB 55%, #0f0f0f 65%, #0f0f0f 100%)",
            backgroundSize: "300% 100%",
            animation: "shine-sweep 3s linear infinite",
          }}
        >
          {t("And Much More.")}
        </span>
      </div>
    </section>
  );
}
