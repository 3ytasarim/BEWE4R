import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import card1 from "@/assets/real/sample-cards/1.jpg";
import card2 from "@/assets/real/sample-cards/2.jpg";
import card3 from "@/assets/real/sample-cards/3.jpg";
import card4 from "@/assets/real/sample-cards/4.jpg";
import card5 from "@/assets/real/sample-cards/5.jpg";
import card6 from "@/assets/real/sample-cards/6.jpg";
import card7 from "@/assets/real/sample-cards/7.jpg";
import card8 from "@/assets/real/sample-cards/8.jpg";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { src: card1, cls: "s-card-1", rot: -9, depth: 14 },
  { src: card2, cls: "s-card-2", rot: -5, depth: 10 },
  { src: card3, cls: "s-card-3", rot: -2, depth: 8 },
  { src: card4, cls: "s-card-4", rot: 3, depth: 12 },
  { src: card5, cls: "s-card-5", rot: 0, depth: 6 },
  { src: card6, cls: "s-card-6", rot: 4, depth: 11 },
  { src: card7, cls: "s-card-7", rot: 7, depth: 9 },
  { src: card8, cls: "s-card-8", rot: -4, depth: 13 },
];

const SCROLL_MOVES = [
  { x: -260, y: 30, rot: -25 },
  { x: -200, y: 60, rot: -18 },
  { x: -120, y: 90, rot: -10 },
  { x: -40, y: 120, rot: -4 },
  { x: 40, y: 120, rot: 4 },
  { x: 120, y: 90, rot: 12 },
  { x: 200, y: 60, rot: 22 },
  { x: 260, y: 30, rot: 28 },
];

export default function SampleCardRow() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const row = rowRef.current;
    if (!stage || !row) return;

    const cards = Array.from(row.querySelectorAll<HTMLDivElement>(".s-card"));
    if (!cards.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const restRot = cards.map((c) => parseFloat(c.dataset.rot || "0") || 0);

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotation: (i) => restRot[i] });
        return;
      }

      // Initial off-screen state
      cards.forEach((card, i) => {
        gsap.set(card, { y: -800, rotation: restRot[i] + 25, opacity: 0, scale: 0.7 });
      });

      // Intro: cards drop in, fanning from center
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: (i) => restRot[i],
        duration: 1.1,
        stagger: { each: 0.08, from: "center" },
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: stage, start: "top 92%" },
      });

      // Continuous float
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: `+=${8 + (i % 3) * 5}`,
          rotation: restRot[i] + (i % 2 === 0 ? 1.5 : -1.5),
          duration: 3 + (i % 4) * 0.5,
          delay: 1.4 + i * 0.1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Scroll fan-out (cards spread as the section scrolls past)
      ScrollTrigger.create({
        trigger: stage,
        start: "top 60%",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          cards.forEach((card, i) => {
            const m = SCROLL_MOVES[i];
            gsap.set(card, {
              x: m.x * p,
              y: m.y * p,
              rotation: restRot[i] + m.rot * p,
            });
          });
        },
      });
    }, stage);

    // Mouse parallax (desktop only)
    let raf = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
    };
    const loop = () => {
      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;
      cards.forEach((card) => {
        const d = parseFloat(card.dataset.depth || "8") || 8;
        card.style.translate = `${tx * d}px ${ty * d * 0.5}px`;
      });
      raf = requestAnimationFrame(loop);
    };

    if (fine && !reduce) {
      stage.addEventListener("mousemove", onMove);
      stage.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    // Hover 3D lift
    const cleanups: Array<() => void> = [];
    if (fine && !reduce) {
      cards.forEach((card) => {
        const baseZ = window.getComputedStyle(card).zIndex;
        const move = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateX: -py * 16,
            rotateY: px * 16,
            scale: 1.12,
            zIndex: 20,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 700,
            overwrite: "auto",
          });
        };
        const leave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            zIndex: baseZ === "auto" ? "" : baseZ,
            duration: 0.8,
            ease: "elastic.out(1, 0.6)",
            overwrite: "auto",
          });
        };
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", leave);
        });
      });
    }

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section ref={stageRef} className="relative bg-black text-white overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28">
      <div ref={rowRef} className="sample-cards">
        {CARDS.map((c, i) => (
          <div
            key={c.cls}
            className={`s-card ${c.cls}`}
            data-rot={c.rot}
            data-depth={c.depth}
          >
            <img src={c.src} alt={`Sample ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
