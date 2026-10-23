import styles from "./ReferenceSections.module.css";
import art from "./Workspace.module.css";

/** Original SVG/CSS scenery. Reference screenshots are never rendered as section backgrounds. */
export function Workspace({ scene }: { scene: "about" | "experience" | "contact" | "projects" }) {
  const points = [[100, 170], [230, 80], [375, 130], [480, 270], [370, 410], [200, 440], [70, 340], [280, 270]];
  return (
    <div className={`${styles.backdrop} ${styles[`${scene}Backdrop`]} ${art.scene} ${art[scene]}`} aria-hidden="true">
      <div className={art.grid} />
      <div className={art.halo} />
      {scene === "contact" ? (
        <svg viewBox="0 0 600 600" className={art.globe} fill="none">
          <circle cx="300" cy="300" r="210" stroke="currentColor" />
          {[50, 105, 160, 205].map(radius => <ellipse key={radius} cx="300" cy="300" rx={radius} ry="210" stroke="currentColor" />)}
          {[155, 220, 300, 380, 445].map((y, index) => <ellipse key={y} cx="300" cy={y} rx={index === 2 ? 210 : index === 1 || index === 3 ? 193 : 151} ry="30" stroke="currentColor" />)}
          <ellipse cx="300" cy="300" rx="290" ry="100" stroke="#7783ff" transform="rotate(-27 300 300)" />
          <circle cx="62" cy="425" r="7" fill="#20e2ef" /><circle cx="548" cy="177" r="9" fill="#9b83ff" />
        </svg>
      ) : (
        <svg viewBox="0 0 560 520" className={art.network} fill="none">
          <path d="M100 170 230 80 375 130 480 270 370 410 200 440 70 340 100 170 280 270 375 130M230 80 280 270 480 270M70 340 280 270 370 410M200 440 280 270" stroke="currentColor" />
          <circle cx="280" cy="270" r="140" stroke="currentColor" strokeDasharray="3 12" />
          <ellipse cx="280" cy="270" rx="235" ry="110" stroke="#7275ef" transform="rotate(-24 280 270)" />
          {points.map(([x, y], index) => <g key={index}><circle cx={x} cy={y} r={index === 7 ? 32 : 17} fill="#061625" stroke="currentColor" /><circle cx={x} cy={y} r={index === 7 ? 11 : 4} fill="currentColor" /></g>)}
        </svg>
      )}
    </div>
  );
}
