import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export type TiltedSlide = { src: string; label?: string };

/**
 * 3D tilted "coverflow" carousel — the active slide faces front while the
 * neighbours fan out in perspective on both sides (rotateY steps of 60deg).
 * Mirrors the original reference carousel: small side-by-side cards, spring
 * motion, and a blur/fade caption under the active card. Monochrome imagery,
 * sharp 2px corners. Reduced-motion safe (snaps without spring animation).
 */
export default function TiltedCarousel({
  images,
  grayscale = true,
}: {
  images: TiltedSlide[];
  grayscale?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const n = images.length;
  const [activeIndex, setActiveIndex] = useState(Math.min(3, Math.max(0, n - 1)));

  // keep the active index in range if the image list ever changes length
  useEffect(() => {
    setActiveIndex((p) => Math.min(Math.max(0, p), Math.max(0, n - 1)));
  }, [n]);

  if (n === 0) return null;

  const toPrev = () => setActiveIndex((p) => Math.max(0, p - 1));
  const toNext = () => setActiveIndex((p) => Math.min(n - 1, p + 1));
  const toSlide = (i: number) => setActiveIndex(i);

  const slideTransition = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0.2, duration: 0.8 } as const);
  const cardTransition = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0.1, duration: 1 } as const);

  return (
    <div className="select-none overflow-hidden py-10">
      {/* carousel viewport (one slide wide) — neighbours fan out beyond it */}
      <div className="w-40 sm:w-44 md:w-52 mx-auto">
        <motion.div
          className="flex w-fit"
          animate={{ x: `${(-activeIndex * 100) / n}%` }}
          transition={slideTransition}
        >
          {images.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              <div className="perspective-midrange" key={item.src}>
                <motion.div
                  className="w-40 sm:w-44 md:w-52 aspect-[3/4] flex flex-col items-center gap-3 will-change-transform"
                  animate={{
                    rotateY: (activeIndex - i) * 60,
                    scale: isActive ? 1 : 0.85,
                  }}
                  transition={cardTransition}
                >
                  <img
                    src={item.src}
                    alt={item.label ?? `Production photo ${i + 1}`}
                    loading="lazy"
                    draggable={false}
                    role="button"
                    tabIndex={0}
                    aria-label={item.label ?? `Go to slide ${i + 1}`}
                    onClick={() => toSlide(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toSlide(i);
                      }
                    }}
                    className={`w-full h-full object-cover rounded-[2px] cursor-pointer shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-current ${grayscale ? "grayscale" : ""}`}
                  />
                  {item.label ? (
                    <motion.div
                      className="text-xs md:text-sm whitespace-nowrap text-white uppercase tracking-[0.2em] will-change-[opacity,filter]"
                      animate={{
                        filter: isActive ? "blur(0px)" : "blur(2px)",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      {item.label}
                    </motion.div>
                  ) : null}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* controls */}
      <div className="mt-12 w-fit mx-auto flex items-center gap-3 justify-center text-white">
        <button
          onClick={toPrev}
          aria-label="Previous"
          disabled={activeIndex === 0}
          className="p-2 cursor-pointer disabled:opacity-25 border border-white/15 hover:bg-white/5 transition-colors"
        >
          <FiChevronLeft size={20} />
        </button>
        <div className="flex flex-wrap justify-center items-center gap-1.5 max-w-[280px] py-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={activeIndex === i}
              className={`rounded-full cursor-pointer h-2 transition-[width,background-color] duration-300 ${
                activeIndex === i ? "w-7 bg-current" : "w-2 bg-current/30"
              }`}
            />
          ))}
        </div>
        <button
          onClick={toNext}
          aria-label="Next"
          disabled={activeIndex === n - 1}
          className="p-2 cursor-pointer disabled:opacity-25 border border-white/15 hover:bg-white/5 transition-colors"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
