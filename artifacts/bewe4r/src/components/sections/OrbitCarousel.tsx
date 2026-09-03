import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export type OrbitSlide = { src: string; label?: string };

type Dims = { size: number; depth: number };

function dimsForWidth(w: number): Dims {
  if (w < 640) return { size: 120, depth: 165 };
  if (w < 1024) return { size: 150, depth: 240 };
  return { size: 180, depth: 320 };
}

/**
 * 3D orbit carousel — cards ride a horizontal ring that slowly auto-rotates
 * while each card counter-rotates to always face the viewer (billboard). Hover
 * pauses the orbit; clicking a card (or the arrows / dots) snaps it to the front
 * without unwinding a full turn. Perspective handles the depth cue (front card
 * reads larger). Monochrome white-theme controls, sharp 2px corners, no emoji.
 * Reduced-motion safe (holds still, controls still snap).
 */
export default function OrbitCarousel({ images }: { images: OrbitSlide[] }) {
  const reduceMotion = useReducedMotion();
  const n = images.length;
  const angleSlice = n > 0 ? 360 / n : 0;

  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dims, setDims] = useState<Dims>({ size: 150, depth: 240 });

  useEffect(() => {
    const apply = () => setDims(dimsForWidth(window.innerWidth));
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || n <= 1) return;
    const id = window.setInterval(() => setRotation((r) => r + 0.4), 40);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, n]);

  if (n === 0) return null;

  // front-facing index derived from the current rotation (for dot highlighting)
  const frontIndex = ((Math.round(-rotation / angleSlice) % n) + n) % n;

  // snap the given index to the front, choosing the equivalent angle nearest the
  // current rotation so we never spin the long way round
  const snapTo = (index: number) => {
    const base = -index * angleSlice;
    const k = Math.round((rotation - base) / 360);
    setRotation(base + k * 360);
  };

  const groupTransition = reduceMotion
    ? { duration: 0 }
    : ({ type: "tween", duration: 0.5, ease: "easeOut" } as const);

  return (
    <div className="select-none">
      <div
        className="relative w-full flex items-center justify-center overflow-hidden h-[360px] sm:h-[440px] lg:h-[560px]"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="relative"
          style={{
            width: dims.size * 2,
            height: dims.size * 2,
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: rotation }}
          transition={groupTransition}
        >
          {images.map((image, i) => {
            // basis chosen so card i faces front at rotation === -i*angleSlice,
            // matching snapTo() and frontIndex below (card 0 front at rotation 0)
            const angle = (i * angleSlice * Math.PI) / 180;
            const x = Math.sin(angle) * dims.depth;
            const z = Math.cos(angle) * dims.depth;
            return (
              <motion.div
                key={image.src}
                className="absolute cursor-pointer"
                style={{
                  width: dims.size,
                  height: dims.size,
                  left: "50%",
                  top: "50%",
                  marginLeft: -dims.size / 2,
                  marginTop: -dims.size / 2,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                initial={{ x, z, rotateY: -rotation }}
                animate={{ x, z, rotateY: -rotation }}
                transition={groupTransition}
                whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                onClick={() => snapTo(i)}
                role="button"
                tabIndex={0}
                aria-label={image.label ?? `Show product ${i + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    snapTo(i);
                  }
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[2px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.55)]">
                  <img
                    src={image.src}
                    alt={image.label ?? `Product ${i + 1}`}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                  {image.label ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      style={{ background: "rgba(0,0,0,0.4)" }}
                    >
                      <span
                        className="text-center font-display uppercase tracking-[0.2em] text-lg"
                        style={{ color: "#ffffff" }}
                      >
                        {image.label}
                      </span>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* controls — ink on the white page body (mirrors TiltedCarousel) */}
      <div className="mt-8 w-fit mx-auto flex items-center gap-3 justify-center text-white">
        <button
          type="button"
          onClick={() => snapTo((frontIndex - 1 + n) % n)}
          aria-label="Previous"
          className="p-2 cursor-pointer border border-white/15 hover:bg-white/5 transition-colors"
        >
          <FiChevronLeft size={20} />
        </button>
        <div className="flex flex-wrap justify-center items-center gap-1.5 max-w-[280px] py-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => snapTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={frontIndex === i}
              className={`rounded-full cursor-pointer h-2 transition-[width,background-color] duration-300 ${
                frontIndex === i ? "w-7 bg-current" : "w-2 bg-current/30"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => snapTo((frontIndex + 1) % n)}
          aria-label="Next"
          className="p-2 cursor-pointer border border-white/15 hover:bg-white/5 transition-colors"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
