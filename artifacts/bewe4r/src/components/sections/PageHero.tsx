import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type Badge = { label: string; value: string };

interface PageHeroProps {
  kicker: string;
  title: string; // newlines for line breaks
  subtitle: string;
  image: string;
  /**
   * Optional HLS (.m3u8) video URL used as a cinematic background layer.
   * When provided the still image becomes the poster/fallback.
   */
  videoSrc?: string;
  badges?: Badge[];
  align?: "left" | "center";
}

export function PageHero({
  kicker,
  title,
  subtitle,
  image,
  videoSrc,
  badges = [],
  align = "left",
}: PageHeroProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0%", "20%"]);

  // Lazy-load hls.js only when a videoSrc is provided
  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    let destroyed = false;
    let hlsInstance: { destroy: () => void } | null = null;

    // Native HLS (Safari)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    } else {
      // hls.js for Chrome/Firefox/Edge
      import("hls.js").then(({ default: Hls }) => {
        if (destroyed) return;
        if (Hls.isSupported()) {
          const hls = new Hls({ enableWorker: true });
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {});
          });
          hlsInstance = hls;
        }
      });
    }

    return () => {
      destroyed = true;
      hlsInstance?.destroy();
    };
  }, [videoSrc]);

  const lines = title.split("\n");
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section
      ref={ref}
      className="relative min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] flex flex-col overflow-hidden border-b border-[rgba(255,255,255,0.1)] bg-[#000000]"
    >
      {/* Background image with parallax + zoom (always rendered as poster/fallback) */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <img src={image} alt="" className="w-full h-full object-cover opacity-50" />
      </motion.div>

      {/* Optional HLS video layer on top of image */}
      {videoSrc && (
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ y: bgY, scale: bgScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            ref={videoRef}
            poster={image}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
      )}

      {/* Gradient overlays for legibility */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.4)] to-[#000000] pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[rgba(0,0,0,0.7)] via-transparent to-[rgba(0,0,0,0.7)] pointer-events-none" />

      {/* Cinematic ambient glow orbs (monochrome, very subtle) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute z-[3] top-[-20%] left-[15%] w-[600px] h-[600px] rounded-full bg-[rgba(255,255,255,0.06)] blur-[120px] mix-blend-screen"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute z-[3] bottom-[-15%] right-[15%] w-[500px] h-[500px] rounded-full bg-[rgba(255,255,255,0.05)] blur-[120px] mix-blend-screen"
      />

      {/* Vertical grid lines */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]">
        <div className="max-w-7xl h-full mx-auto px-6 grid grid-cols-12 gap-0">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className="border-l border-[rgba(255,255,255,0.4)] h-full" />
          ))}
        </div>
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='1'/></svg>\")",
        }}
      />

      {/* LIVE indicator (only when video active) */}
      {videoSrc && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute z-20 top-24 right-6 md:right-10 flex items-center gap-2 px-3 py-1.5 bg-[rgba(0,0,0,0.5)] backdrop-blur-md border border-[rgba(255,255,255,0.15)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffffff] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ffffff]" />
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[rgba(255,255,255,0.8)]">{t("Studio · Live")}</span>
        </motion.div>
      )}

      <motion.div
        className="relative z-20 flex-1 flex items-center pt-24 pb-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className={`max-w-7xl mx-auto w-full px-6 ${alignClass}`}>
          {/* Kicker with line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className={`flex items-center gap-3 mb-6 md:mb-8 ${align === "center" ? "justify-center" : ""}`}
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
              style={{ originX: 0 }}
              className="block h-px w-12 bg-[rgba(255,255,255,0.5)]"
            />
            <span className="text-[10px] md:text-xs text-[rgba(255,255,255,0.6)] uppercase tracking-[0.4em]">
              {kicker}
            </span>
          </motion.div>

          {/* Headline — per-word mask reveal */}
          <h1
            className={`font-display text-[clamp(2.5rem,10vw,8.5rem)] leading-[1] tracking-tight text-[#ffffff] mb-6 md:mb-8 ${align === "center" ? "max-w-5xl mx-auto" : "max-w-5xl"}`}
          >
            {lines.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.12 + li * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="inline-block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + lines.length * 0.05, duration: 0.4 }}
            className={`text-[rgba(255,255,255,0.7)] text-sm md:text-lg leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}
          >
            {subtitle}
          </motion.p>

          {/* Badges row */}
          {badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + lines.length * 0.05, duration: 0.4 }}
              className={`mt-8 md:mt-12 flex flex-wrap gap-x-6 md:gap-x-8 gap-y-4 ${align === "center" ? "justify-center" : ""}`}
            >
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.06, duration: 0.35 }}
                  className="border-l border-[rgba(255,255,255,0.2)] pl-4"
                >
                  <p className="font-display text-2xl md:text-4xl text-[#ffffff] leading-none mb-1">
                    {b.value}
                  </p>
                  <p className="text-[10px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.3em]">
                    {b.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Bottom progress strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="relative z-20 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.4)]">
          <span className="flex items-center gap-2">
            <span className="block w-1.5 h-1.5 bg-[rgba(255,255,255,0.6)] rounded-full animate-pulse" />
            {t("Production active")}
          </span>
          <span className="hidden md:inline">{t("Istanbul → Worldwide")}</span>
          <span>{t("Reply < 24h")}</span>
        </div>
      </motion.div>
    </section>
  );
}
