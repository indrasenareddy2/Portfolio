import type { CSSProperties } from "react";
import { asset } from "@/lib/site";
import styles from "./SiteFooter.module.css";

/** Footer artwork is 2172×606; overlays are placed in that coordinate space so they track the image. */
const W = 2172;
const H = 606;
const at = (x: number, y: number): CSSProperties => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

// Deterministic twinkles in the open sky (no Math.random during render).
const STARS = Array.from({ length: 16 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 91.7 + n * 47.3) * 43758.5453) % 1 + 1) % 1;
  return { x: 650 + r(1) * 1450, y: 20 + r(2) * 300, size: 1 + r(3) * 1.2, delay: -r(4) * 6, dur: 3 + r(5) * 4 };
});

export function FooterScene() {
  return (
    <div className={styles.art} aria-hidden="true">
      <picture>
        <source media="(min-width: 1500px)" srcSet={asset("/images/footer-scene-2172.webp")} />
        <source media="(min-width: 700px)" srcSet={asset("/images/footer-scene-1440.webp")} />
        <img src={asset("/images/footer-scene-960.webp")} alt="" loading="lazy" decoding="async" width={W} height={H} />
      </picture>
      {STARS.map((s, i) => (
        <span
          key={i}
          className={styles.star}
          style={{ ...at(s.x, s.y), width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
        />
      ))}
      <span className={styles.planetGlow} style={at(1690, 420)} />
      <span className={styles.robotEye} style={at(1795, 364)} />
    </div>
  );
}
