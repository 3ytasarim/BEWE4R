import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";

/* Animated undulating grid of rounded bars (monochrome, tuned for a WHITE
   background). Ported from the GSAP CodePen "Undulating SVG Background"
   (creativeocean / LERMydP) — recoloured for the BEWE4R white theme: light
   grey bars on #ffffff instead of the original dark-on-dark. Respects
   prefers-reduced-motion by rendering a calm static grid. */

const GRID = 50;
const SVG_NS = "http://www.w3.org/2000/svg";

export default function UndulatingBackground({
  className = "",
}: {
  className?: string;
}) {
  const gRef = useRef<SVGGElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const g = gRef.current;
    if (!g) return;
    g.replaceChildren();

    const rects: SVGRectElement[] = [];
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        const r = document.createElementNS(SVG_NS, "rect");
        g.appendChild(r);
        rects.push(r);
        gsap.set(r, {
          x: x + 0.1,
          y: y + 0.1,
          transformOrigin: "0.5 -1",
          rotate: -45,
          attr: {
            width: 1,
            height: 0.5,
            ry: 0.4,
            fill: "#f4f4f4",
            stroke: "rgba(15,15,15,0.08)",
            "stroke-width": 0.5,
          },
        });
      }
    }

    gsap.set(g, { svgOrigin: "25 25", rotate: 45, scale: 1.4 });

    if (reduce) {
      gsap.set(rects, { attr: { fill: "#ededed", "stroke-width": 0 } });
      return () => {
        rects.forEach((r) => r.remove());
      };
    }

    const tl = gsap
      .to(rects, {
        duration: 2.5,
        ease: "expo",
        yoyoEase: "sine.inOut",
        attr: {
          height: 0.5,
          width: 0.5,
          ry: 0.2,
          "stroke-width": 0,
          fill: "#d2d2d2",
        },
        rotate: 90,
        stagger: {
          amount: 10,
          from: "center",
          grid: [GRID, GRID],
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      })
      .play(99);

    return () => {
      tl.kill();
      rects.forEach((r) => r.remove());
    };
  }, [reduce]);

  return (
    <svg
      viewBox="0 0 50 50"
      xmlns={SVG_NS}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <g ref={gRef} />
    </svg>
  );
}
