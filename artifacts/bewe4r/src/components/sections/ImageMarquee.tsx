type ImageMarqueeProps = {
  images: string[];
  reverse?: boolean;
  className?: string;
};

/* Full-bleed infinite image marquee. Uses the canonical `.animate-marquee`
   keyframe (tripled array + -33.33% translate) so the loop is seamless.
   Images keep their real colors (no grayscale). Sharp 2px corners, white
   page-bg edge fades, pause on hover. Reduced-motion is handled globally in
   index.css (`.animate-marquee { animation: none }`). */
export function ImageMarquee({ images, reverse = false, className = "" }: ImageMarqueeProps) {
  if (images.length === 0) return null;

  // Ensure one "third" is wide enough to cover ultra-wide viewports.
  const base = images.length >= 8 ? images : [...images, ...images];
  const loop = [...base, ...base, ...base];

  return (
    <div className={`group relative overflow-hidden border-b border-white/10 py-4 md:py-6 ${className}`}>
      {/* edge fades to the white page background */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32"
        style={{ background: "linear-gradient(to right, #ffffff, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32"
        style={{ background: "linear-gradient(to left, #ffffff, transparent)" }}
        aria-hidden="true"
      />

      <div
        className="animate-marquee flex w-max gap-3 md:gap-5 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {loop.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[4/5] h-40 md:h-56 shrink-0 overflow-hidden rounded-[2px] border border-white/10 bg-white/5"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
