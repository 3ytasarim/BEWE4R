import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const WHATSAPP_GREEN = "#25D366";
export const WHATSAPP_GREEN_DARK = "#1DA851";
export const WHATSAPP_HREF = "https://wa.me/+4917624343418";

export function WhatsAppLogo({
  className = "w-4 h-4",
  brandColor = false,
}: {
  className?: string;
  brandColor?: boolean;
}) {
  // Official WhatsApp logo path (simplified, single colour) — fits inside a 24x24 viewBox.
  return (
    <svg
      viewBox="0 0 24 24"
      fill={brandColor ? WHATSAPP_GREEN : "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  variant?: "solid" | "outline" | "card";
  size?: "sm" | "md" | "lg";
  label?: string;
  sublabel?: string;
  href?: string;
  testId?: string;
  className?: string;
  children?: ReactNode;
}

const sizeMap = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3.5 text-xs",
  lg: "px-7 py-4 text-xs",
};
const iconSizeMap = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-[18px] h-[18px]" };

/**
 * Branded WhatsApp button — uses the official WhatsApp green (#25D366) and logo.
 * Three variants:
 *  - solid:   filled green pill (primary CTA)
 *  - outline: transparent with green border + icon (sits well on dark monochrome layouts)
 *  - card:    full-width card row with icon, label and sublabel
 */
export function WhatsAppButton({
  variant = "solid",
  size = "md",
  label = "WhatsApp",
  sublabel,
  href = WHATSAPP_HREF,
  testId = "whatsapp-button",
  className = "",
  children,
}: WhatsAppButtonProps) {
  const sizeCls = sizeMap[size];
  const iconCls = iconSizeMap[size];

  if (variant === "card") {
    return (
      <motion.a
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={testId}
        className={`group relative flex items-center gap-4 px-6 py-5 border border-white/10 hover:border-[color:var(--wa-green)] transition-all overflow-hidden ${className}`}
        style={{ ["--wa-green" as never]: WHATSAPP_GREEN }}
      >
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500"
          style={{ background: WHATSAPP_GREEN }}
        />
        <span
          className="relative w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-full text-white shadow-lg"
          style={{ background: WHATSAPP_GREEN }}
        >
          <WhatsAppLogo className="w-5 h-5" />
        </span>
        <span className="relative flex-1 min-w-0">
          <span className="block text-white text-sm font-medium">{label}</span>
          {sublabel && <span className="block text-white/50 text-xs mt-0.5">{sublabel}</span>}
        </span>
        <motion.span
          className="relative text-white/30 group-hover:text-white transition-colors"
          aria-hidden
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </motion.a>
    );
  }

  if (variant === "outline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={testId}
        className={`group relative inline-flex items-center gap-2.5 ${sizeCls} uppercase tracking-[0.22em] font-semibold border transition-all overflow-hidden ${className}`}
        style={{ borderColor: "rgba(37, 211, 102, 0.35)", color: "#fff" }}
      >
        <span
          aria-hidden
          className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: WHATSAPP_GREEN }}
        />
        <WhatsAppLogo className={`relative ${iconCls}`} brandColor />
        <span className="relative">{children ?? label}</span>
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ background: WHATSAPP_GREEN }}
          />
          <span
            className="relative inline-flex h-1.5 w-1.5 rounded-full"
            style={{ background: WHATSAPP_GREEN }}
          />
        </span>
      </a>
    );
  }

  // solid (default)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      className={`group relative inline-flex items-center gap-2.5 ${sizeCls} uppercase tracking-[0.22em] font-semibold text-white shadow-[0_8px_30px_-10px_rgba(37,211,102,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,211,102,0.8)] transition-shadow duration-300 overflow-hidden ${className}`}
      style={{ background: WHATSAPP_GREEN }}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ background: WHATSAPP_GREEN_DARK }}
      />
      <WhatsAppLogo className={`relative ${iconCls}`} />
      <span className="relative">{children ?? label}</span>
    </a>
  );
}
