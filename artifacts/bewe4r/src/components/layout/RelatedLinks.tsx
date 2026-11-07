import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

interface Related {
  href: string;
  label: string;
  desc: string;
}

const L = {
  print: { href: "/your-brand/print", label: "Print", desc: "Screen, DTF, DTG, embroidery, 3D patches and embossing" },
  label: { href: "/your-brand/label", label: "Label", desc: "Hang tags, design tags, neck tags and jeans tags" },
  sample: { href: "/your-brand/sample", label: "Sample", desc: "How your sample is made, step by step" },
  moq: { href: "/your-brand/moq", label: "MOQ", desc: "Minimum order quantities per product" },
  preOrder: { href: "/your-brand/pre-order", label: "Pre-Order", desc: "Produce when you have orders" },
  storage: { href: "/your-brand/storage", label: "Storage", desc: "Flexible, secure warehousing for your products" },
  delivery: { href: "/your-brand/delivery", label: "Delivery", desc: "Weekly shipping and delivery times" },
  pricesShipping: { href: "/about/prices-shipping", label: "Prices & Shipping", desc: "What affects cost and how shipping works" },
  catalog: { href: "/e-catalog", label: "E-Catalog", desc: "What you can produce with BEWE4R" },
  contact: { href: "/contact", label: "Contact", desc: "Tell us about your project" },
  essentials: { href: "/brand-essentials", label: "More Products", desc: "Packaging and branded extras" },
  zipBags: { href: "/brand-essentials/zip-bags", label: "Zip Bags & Shipping Bags", desc: "Custom packaging in any size and finish" },
  boxes: { href: "/brand-essentials/boxes", label: "Boxes", desc: "Custom boxes in any shape, size and colour" },
  marketing: { href: "/brand-essentials/marketing-essentials", label: "Marketing Essentials", desc: "Thank-you cards, stickers and customer gifts" },
  blogLead: { href: "/blog/how-long-does-clothing-production-take", label: "How long does clothing production take?", desc: "A realistic timeline from techpack to delivery" },
  blogChecklist: { href: "/blog/what-you-need-before-starting-production", label: "Checklist for your first order", desc: "What to prepare before you inquire" },
  blogBlank: { href: "/blog/blank-customisation-vs-custom-production", label: "Blank customisation vs. custom production", desc: "Which route fits your brand" },
} satisfies Record<string, Related>;

/** Curated next steps per page (real <a href> links, also present in the prerendered HTML). */
const RELATED: Record<string, Related[]> = {
  "/your-brand/print": [L.label, L.sample, L.moq, L.blogChecklist],
  "/your-brand/label": [L.print, L.sample, L.moq, L.delivery],
  "/your-brand/sample": [L.moq, L.print, L.label, L.blogChecklist],
  "/your-brand/moq": [L.sample, L.preOrder, L.delivery, L.blogBlank],
  "/your-brand/pre-order": [L.moq, L.storage, L.delivery, L.sample],
  "/your-brand/storage": [L.delivery, L.preOrder, L.moq, L.contact],
  "/your-brand/delivery": [L.storage, L.pricesShipping, L.moq, L.blogLead],
  "/brand-essentials": [L.zipBags, L.boxes, L.marketing, L.sample],
  "/brand-essentials/zip-bags": [L.boxes, L.marketing, L.essentials, L.sample],
  "/brand-essentials/boxes": [L.zipBags, L.marketing, L.essentials, L.contact],
  "/brand-essentials/marketing-essentials": [L.zipBags, L.boxes, L.essentials, L.contact],
  "/about/prices-shipping": [L.delivery, L.moq, L.sample, L.blogLead],
  "/e-catalog": [L.sample, L.moq, L.print, L.contact],
};

export function RelatedLinks() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const items = RELATED[location.replace(/\/+$/, "") || "/"];
  if (!items) return null;

  return (
    <section aria-labelledby="related-pages" className="border-t border-[#0f0f0f]/10 bg-[#ffffff] text-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <h2 id="related-pages" className="mb-8 font-display text-3xl md:text-5xl">
          {t("Keep exploring")}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full min-h-[132px] flex-col justify-between rounded-[2px] border border-[#0f0f0f]/15 p-5 transition-colors hover:border-[#0f0f0f]/50 hover:bg-[#0f0f0f]/[0.03]"
              >
                <span>
                  <span className="block text-lg font-semibold leading-snug">{t(item.label)}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[#0f0f0f]/60">{t(item.desc)}</span>
                </span>
                <ArrowRight aria-hidden="true" className="mt-4 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
