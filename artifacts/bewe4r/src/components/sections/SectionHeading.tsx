import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  watermark?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
  titleClassName?: string;
};

const sizeMap = {
  md: "text-[clamp(2.25rem,5.5vw,4rem)]",
  lg: "text-[clamp(2.75rem,6.5vw,5.25rem)]",
  xl: "text-[clamp(3rem,7.5vw,6rem)]",
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  watermark,
  size = "lg",
  className = "",
  titleClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const lines = title.split("\n");

  return (
    <div
      ref={ref}
      className={`relative ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {watermark && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.04 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className={`pointer-events-none select-none absolute font-display uppercase text-white leading-none whitespace-nowrap ${
            align === "center"
              ? "left-1/2 -translate-x-1/2 -top-6"
              : "-left-2 -top-8"
          }`}
          style={{ fontSize: "clamp(6rem,16vw,14rem)" }}
        >
          {watermark}
        </motion.span>
      )}

      {kicker && (
        <div
          className={`relative flex items-center gap-3 mb-5 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {align !== "center" && (
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left block w-10 h-px bg-white/40"
            />
          )}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-[10px] md:text-xs text-white/45 uppercase tracking-[0.4em]"
          >
            {kicker}
          </motion.p>
          {align === "center" && (
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left block w-10 h-px bg-white/40"
            />
          )}
        </div>
      )}

      <h2
        className={`relative font-display ${sizeMap[size]} leading-[0.92] text-white tracking-[-0.01em] ${titleClassName}`}
      >
        {lines.map((line, lineIdx) => {
          const words = line.split(" ");
          return (
            <span key={lineIdx} className="block">
              {words.map((word, wordIdx) => (
                <span
                  key={`${lineIdx}-${wordIdx}`}
                  className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
                  style={{ paddingBottom: "0.06em" }}
                >
                  <motion.span
                    initial={{ y: "115%", rotate: 4 }}
                    animate={
                      inView
                        ? { y: "0%", rotate: 0 }
                        : { y: "115%", rotate: 4 }
                    }
                    transition={{
                      duration: 0.75,
                      delay: 0.18 + (lineIdx * words.length + wordIdx) * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          );
        })}

        {/* Subtle shimmer pass — runs once after reveal */}
        <motion.span
          aria-hidden
          initial={{ x: "-110%", opacity: 0 }}
          animate={
            inView
              ? { x: "110%", opacity: [0, 0.7, 0] }
              : { x: "-110%", opacity: 0 }
          }
          transition={{
            duration: 1.6,
            delay: 0.3 + lines.join(" ").split(" ").length * 0.06,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent mix-blend-overlay"
          style={{ transform: "skewX(-12deg)" }}
        />
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{
            duration: 0.55,
            delay: 0.35 + lines.join(" ").split(" ").length * 0.05,
          }}
          className={`mt-6 text-white/55 text-base md:text-lg leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
