const SIZE = 64;
const FPS = 24;
const DURATION_MS = 2400;

let started = false;
let rafId: number | null = null;

function ensureLink(): HTMLLinkElement {
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/png";
  return link;
}

function drawFrame(ctx: CanvasRenderingContext2D, t: number) {
  const s = SIZE;
  ctx.clearRect(0, 0, s, s);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, s, s);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(3, 3, s - 6, s - 6);

  ctx.fillStyle = "#ffffff";
  ctx.font = '900 40px Helvetica, Arial, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("4", s / 2, 46);

  const cx = s / 2;
  const cy = s / 2;
  const r = 26;
  const startAngle = t * Math.PI * 2 - Math.PI / 2;
  const endAngle = startAngle + Math.PI * 0.45;

  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  ctx.arc(cx, cy, r, startAngle, endAngle, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#ffffff";
  ctx.arc(
    cx + Math.cos(startAngle) * r,
    cy + Math.sin(startAngle) * r,
    1.6,
    0,
    Math.PI * 2,
  );
  ctx.fill();
}

export function startAnimatedFavicon() {
  if (started) return;
  started = true;

  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const link = ensureLink();
  const frameInterval = 1000 / FPS;
  let lastTick = 0;
  const t0 = performance.now();

  const tick = (now: number) => {
    if (now - lastTick >= frameInterval) {
      lastTick = now;
      const t = ((now - t0) % DURATION_MS) / DURATION_MS;
      drawFrame(ctx, t);
      link.href = canvas.toDataURL("image/png");
    }
    rafId = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
  const resume = () => {
    if (rafId === null) {
      lastTick = 0;
      rafId = requestAnimationFrame(tick);
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else resume();
  });

  rafId = requestAnimationFrame(tick);
}
