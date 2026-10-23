"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { detectTier, hasWebGL } from "@/lib/performance";
import { asset } from "@/lib/site";
import { createDepthRenderer } from "./depthParallax";
import { createMotes } from "./motes";

/** Source render is 1672×941; overlays are positioned in that coordinate space (as %). */
const W = 1672;
const H = 941;
const pctX = (x: number) => `${((x / W) * 100).toFixed(2)}%`;
const pctY = (y: number) => `${((y / H) * 100).toFixed(2)}%`;

const MOTES = createMotes();

/**
 * Hero artwork: the avatar render plus a depth-parallax WebGL layer and light, cheap overlays.
 * The <img> paints first (and is what reduced-motion / no-WebGL visitors keep); the canvas
 * renders identical pixels at rest, so swapping to it is invisible until things start to move.
 */
export function HeroArt({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = box.current;
    const section = sectionRef.current;
    const cv = canvas.current;
    if (!el || !section) return;

    // Scroll + pointer feed CSS vars for the overlay layers (works even without WebGL).
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0, s: 0 };
    let touch = false;
    const onPointer = (e: PointerEvent) => {
      touch = e.pointerType !== "mouse";
      if (touch) return;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let renderer: ReturnType<typeof createDepthRenderer> = null;
    let cancelled = false;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const frame = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      const t = (performance.now() - t0) / 1000;
      const sx = touch || !matchMedia("(hover: hover)").matches ? Math.sin(t * 0.35) * 0.45 : target.x;
      const sy = touch || !matchMedia("(hover: hover)").matches ? Math.cos(t * 0.28) * 0.25 : target.y;
      cur.x += (sx - cur.x) * 0.06;
      cur.y += (sy - cur.y) * 0.06;
      const scroll = Math.min(1, window.scrollY / (section.offsetHeight || 1));
      cur.s += (scroll - cur.s) * 0.15;
      el.style.setProperty("--px", cur.x.toFixed(4));
      el.style.setProperty("--py", cur.y.toFixed(4));
      el.style.setProperty("--sy", cur.s.toFixed(4));
      renderer?.render(-cur.x * 0.022, -cur.y * 0.016, 1);
      raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(section);
    document.addEventListener("visibilitychange", kick);

    // Depth layer: load the same image + depth map, then hand over from the <img>.
    let ro: ResizeObserver | null = null;
    // Low-end / Save-Data devices keep the static image.
    if (!reduced && cv && hasWebGL() && detectTier() !== "low") {
      const load = (src: string) =>
        new Promise<HTMLImageElement>((res, rej) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => res(img);
          img.onerror = rej;
          img.src = src;
        });
      const wide = window.innerWidth >= 900;
      Promise.all([load(asset(wide ? "/images/hero-avatar-1672.webp" : "/images/hero-avatar-1100.webp")), load(asset("/images/hero-avatar-depth.webp"))])
        .then(([img, depth]) => {
          if (cancelled) return;
          renderer = createDepthRenderer(cv, img, depth);
          if (!renderer) return;
          const fit = () => {
            const r = cv.getBoundingClientRect();
            renderer?.resize(r.width, r.height, Math.min(window.devicePixelRatio || 1, 1.75));
            renderer?.render(-cur.x * 0.022, -cur.y * 0.016, 1);
          };
          fit();
          ro = new ResizeObserver(fit);
          ro.observe(cv);
          cv.addEventListener("webglcontextlost", () => setLive(false));
          setLive(true);
          kick();
        })
        .catch(() => setLive(false));
    }
    kick();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro?.disconnect();
      renderer?.dispose();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", kick);
    };
  }, [reduced, sectionRef]);

  const layer = (depth: number): CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0) * ${-depth}px), calc(var(--py, 0) * ${-depth * 0.6}px), 0)`,
  });

  return (
    <div aria-hidden className="hero-art pointer-events-none absolute inset-x-0 top-0 h-[64svh] overflow-hidden [container-type:size] [mask-image:linear-gradient(180deg,#000_58%,transparent)] lg:h-full lg:[mask-image:linear-gradient(180deg,#000_70%,transparent)]">
      <div
        ref={box}
        className="absolute left-1/2 top-1/2 aspect-[1672/941] w-[max(100cqw,177.7cqh)] [container-type:inline-size] lg:left-[54%] xl:left-1/2"
        style={{ transform: "translate(-50%, calc(-50% + var(--sy, 0) * 14%)) scale(calc(1.04 + var(--sy, 0) * 0.05))" }}
      >
        <picture>
          <source media="(min-width: 900px)" srcSet={asset("/images/hero-avatar-1672.webp")} />
          <img src={asset("/images/hero-avatar-1100.webp")} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full" />
        </picture>
        <canvas ref={canvas} className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`} />

        {/* Breathing teal rim light behind the avatar */}
        <div
          className="hero-glow absolute rounded-full mix-blend-screen"
          style={{ left: pctX(880), top: pctY(470), width: "44%", aspectRatio: "1", translate: "-50% -50%", ...layer(4) }}
        />

        {/* Orbit arc + travelling comet around the head */}
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" style={layer(14)}>
          <defs>
            <linearGradient id="arc" x1="0" x2="1">
              <stop offset="0" stopColor="#5eead4" stopOpacity="0" />
              <stop offset="0.5" stopColor="#67e8f9" stopOpacity="0.55" />
              <stop offset="1" stopColor="#a5b4fc" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="comet">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.35" stopColor="#67e8f9" stopOpacity="0.9" />
              <stop offset="1" stopColor="#67e8f9" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path id="orbit" className="hero-arc" d="M 470 560 C 520 330, 820 175, 1130 185 S 1470 300, 1395 395" fill="none" stroke="url(#arc)" strokeWidth="1.6" />
          <circle r="14" fill="url(#comet)">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath href="#orbit" />
            </animateMotion>
          </circle>
        </svg>

        {/* Pulsing orb (top right of the render) */}
        <div className="hero-orb absolute rounded-full" style={{ left: pctX(1475), top: pctY(207), width: "2.4%", aspectRatio: "1", translate: "-50% -50%", ...layer(18) }} />

        {/* Robot companion: eyes glow and blink */}
        {[1556, 1590].map((x) => (
          <span key={x} className="robot-eye absolute rounded-full" style={{ left: pctX(x), top: pctY(707), width: "1.1%", aspectRatio: "1.5", translate: "-50% -50%" }} />
        ))}

        {/* Monitor: a scan of light passing over the code */}
        <div className="absolute overflow-hidden" style={{ left: pctX(1245), top: pctY(592), width: pctX(390), height: pctY(195), transform: "skewY(-4deg)" }}>
          <span className="monitor-scan absolute inset-x-0 h-1/3" />
        </div>

        {/* Right-hand title, placed in the render's own coordinates (as in the art direction) */}
        <div className="absolute hidden xl:block" style={{ left: pctX(1157), top: pctY(345), ...layer(10) }}>
          <p className="fade-up font-mono text-[1.45cqw] uppercase tracking-[0.42em] text-fg-2" style={{ "--delay": "700ms" } as CSSProperties}>
            AI Systems
          </p>
          <p className="engineer-text text-[4cqw] font-bold uppercase leading-none tracking-[0.04em]" style={{ "--delay": "820ms" } as CSSProperties}>
            Engineer
          </p>
          <span className="grow-bar mt-[0.9cqw] block h-[2px] w-[11cqw] bg-gradient-to-r from-cyan via-teal/50 to-transparent" style={{ "--delay": "980ms" } as CSSProperties} />
        </div>

        {/* Floating motes, near ones move more with the pointer */}
        {MOTES.map((m, i) => (
          <span key={i} className="absolute" style={{ left: m.x, top: m.y, ...layer(m.near ? 26 : 8) }}>
            <span className="mote block rounded-full" style={{ width: m.size, height: m.size, animationDuration: m.duration, animationDelay: m.delay, opacity: m.near ? 0.9 : 0.5 }} />
          </span>
        ))}
      </div>

      {/* Edge treatments: blend into the page */}
      <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-gradient-to-r from-bg/85 via-bg/40 to-transparent lg:block" />
    </div>
  );
}
