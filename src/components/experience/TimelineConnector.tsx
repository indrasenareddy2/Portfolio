"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/sections/ReferenceSections.module.css";

/**
 * One continuous connector between the timeline dots, measured from their real positions
 * (the cards are offset, so fixed CSS pieces never met exactly).
 */
export function TimelineConnector() {
  const svg = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState("");

  useEffect(() => {
    const host = svg.current?.parentElement;
    if (!host) return;
    const draw = () => {
      const box = host.getBoundingClientRect();
      const dots = [...host.querySelectorAll<HTMLElement>("[data-timeline-dot]")].map((dot) => {
        const r = dot.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      if (dots.length < 2) return setPath("");
      const reach = box.width > 700 ? 48 : box.width > 480 ? 30 : 16;
      const left = Math.min(...dots.map((d) => d.x)) - reach;
      const segments = dots.slice(1).map((to, i) => {
        const from = dots[i];
        const r = Math.min(reach, (to.y - from.y) / 2);
        return `M ${from.x} ${from.y} H ${left + r} A ${r} ${r} 0 0 0 ${left} ${from.y + r} V ${to.y - r} A ${r} ${r} 0 0 0 ${left + r} ${to.y} H ${to.x}`;
      });
      setPath(segments.join(" "));
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(host);
    // Cards slide in on reveal: follow them frame by frame while any transition runs.
    let raf = 0;
    let until = 0;
    const follow = () => {
      draw();
      raf = performance.now() < until ? requestAnimationFrame(follow) : 0;
    };
    const onTransition = () => {
      until = performance.now() + 1200;
      if (!raf) raf = requestAnimationFrame(follow);
    };
    host.addEventListener("transitionrun", onTransition);
    host.addEventListener("transitionend", draw);
    // Re-sync once fonts and images settle and after the reveal slide, so a slow or cached load never leaves a gap.
    const settle = () => {
      draw();
      onTransition();
    };
    document.fonts?.ready.then(settle);
    window.addEventListener("load", settle);
    window.addEventListener("resize", draw);
    const timers = [400, 1200, 2500].map((ms) => window.setTimeout(draw, ms));
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", settle);
      window.removeEventListener("resize", draw);
      ro.disconnect();
      cancelAnimationFrame(raf);
      host.removeEventListener("transitionrun", onTransition);
      host.removeEventListener("transitionend", draw);
    };
  }, []);

  return (
    <svg ref={svg} className={styles.timelineConnector} aria-hidden="true">
      {path && <path d={path} />}
    </svg>
  );
}
