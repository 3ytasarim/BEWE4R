import { motion, useReducedMotion } from "framer-motion";
import clothes from "@/assets/icons/clothes.png";
import hoodie from "@/assets/icons/hoodie.png";
import tshirt from "@/assets/icons/tshirt.png";
import hood from "@/assets/icons/hood.png";
import shirt from "@/assets/icons/shirt.png";
import hanger from "@/assets/icons/hanger.png";

const ICONS = [clothes, hoodie, tshirt, hood, shirt, hanger];

type Particle = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  icon: number;
};

const PARTICLES: Particle[] = [
  { left: 4, size: 34, duration: 15, delay: 0, opacity: 0.4, drift: 14, icon: 0 },
  { left: 12, size: 46, duration: 19, delay: 2.5, opacity: 0.3, drift: -18, icon: 1 },
  { left: 19, size: 28, duration: 13, delay: 5, opacity: 0.46, drift: 10, icon: 2 },
  { left: 27, size: 38, duration: 17, delay: 1.5, opacity: 0.34, drift: -12, icon: 3 },
  { left: 35, size: 30, duration: 16, delay: 6.5, opacity: 0.42, drift: 16, icon: 4 },
  { left: 43, size: 50, duration: 21, delay: 3.5, opacity: 0.26, drift: -20, icon: 5 },
  { left: 51, size: 32, duration: 14, delay: 8, opacity: 0.4, drift: 12, icon: 0 },
  { left: 59, size: 40, duration: 18, delay: 2, opacity: 0.32, drift: -14, icon: 2 },
  { left: 67, size: 28, duration: 13, delay: 5.5, opacity: 0.46, drift: 18, icon: 1 },
  { left: 75, size: 42, duration: 20, delay: 4, opacity: 0.3, drift: -10, icon: 3 },
  { left: 83, size: 34, duration: 16, delay: 7, opacity: 0.4, drift: 14, icon: 5 },
  { left: 91, size: 30, duration: 14, delay: 1, opacity: 0.42, drift: -16, icon: 4 },
  { left: 8, size: 26, duration: 12, delay: 9, opacity: 0.48, drift: 12, icon: 2 },
  { left: 47, size: 36, duration: 17, delay: 8.5, opacity: 0.34, drift: -14, icon: 0 },
  { left: 71, size: 30, duration: 15, delay: 4.5, opacity: 0.42, drift: 16, icon: 4 },
  { left: 88, size: 46, duration: 22, delay: 6, opacity: 0.28, drift: -18, icon: 1 },
];

/**
 * Decorative background layer: clothing icons rising from the bottom of a dark
 * hero to the top, fading out before they reach the navbar. White silhouettes
 * (monochrome), slightly transparent. Place inside a `relative overflow-hidden`
 * dark section, behind the z-20 content. Pointer-events none.
 */
export default function FloatingIcons({
  className = "",
  icons = ICONS,
}: {
  className?: string;
  icons?: string[];
}) {
  const reduced = useReducedMotion();
  const set = icons.length > 0 ? icons : ICONS;

  return (
    <div
      className={`absolute inset-0 z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => {
        const style = {
          left: `${p.left}%`,
          width: p.size,
          height: p.size,
          filter: "brightness(0) invert(1)",
        } as const;

        if (reduced) {
          return (
            <img
              key={i}
              src={set[p.icon % set.length]}
              alt=""
              className="absolute select-none"
              style={{ ...style, bottom: `${8 + (i % 5) * 16}%`, opacity: p.opacity * 0.8 }}
            />
          );
        }

        return (
          <motion.img
            key={i}
            src={set[p.icon % set.length]}
            alt=""
            className="absolute bottom-0 select-none"
            style={style}
            initial={{ y: 40, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: ["6vh", "-94vh"],
              x: [0, p.drift, 0],
              opacity: [0, p.opacity, p.opacity, 0],
              rotate: [0, p.drift > 0 ? 8 : -8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.12, 0.78, 0.92],
              x: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}
    </div>
  );
}
