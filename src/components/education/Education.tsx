import type { CSSProperties, ReactNode } from "react";
import { SectionIcon } from "@/components/sections/SectionIcon";
import { ArrowUpRight } from "@/components/ui/Icons";
import { certifications, education } from "@/data/profile";
import styles from "./Education.module.css";

type Cert = (typeof certifications)[number];

/** Logo tile per credential (brand marks drawn inline, no external assets). */
function CertLogo({ cert }: { cert: Cert }) {
  if (cert.title.startsWith("Model Context Protocol")) return <span className={`${styles.logo} ${styles.logoAi}`}>AI</span>;
  if (cert.title.startsWith("Claude")) {
    return (
      <span className={`${styles.logo} ${styles.logoClaude}`}>
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M16 16 L16 3.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" transform={`rotate(${i * 30} 16 16)`} />
          ))}
        </svg>
      </span>
    );
  }
  if (cert.issuer === "Microsoft") {
    return (
      <span className={`${styles.logo} ${styles.logoMs}`}>
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <rect x="1" y="1" width="10.5" height="10.5" fill="#f25022" />
          <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7fba00" />
          <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00a4ef" />
          <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#ffb900" />
        </svg>
      </span>
    );
  }
  return (
    <span className={`${styles.logo} ${styles.logoShield}`}>
      <SectionIcon name="shield" width={28} height={28} />
    </span>
  );
}

/** Glowing mortarboard on a holographic pedestal. */
function GraduationCap() {
  return (
    <svg className={styles.cap} viewBox="0 0 360 340" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cap-top" x1="60" y1="60" x2="300" y2="175" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2c4a7a" />
          <stop offset=".45" stopColor="#1d2a55" />
          <stop offset="1" stopColor="#3a2a7c" />
        </linearGradient>
        <linearGradient id="cap-side" x1="0" y1="118" x2="0" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14204a" />
          <stop offset="1" stopColor="#0a1027" />
        </linearGradient>
        <linearGradient id="cap-edge" x1="22" y1="0" x2="338" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00f0ff" />
          <stop offset=".55" stopColor="#4f8dff" />
          <stop offset="1" stopColor="#b07bff" />
        </linearGradient>
        <linearGradient id="cap-band" x1="95" y1="150" x2="265" y2="215" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a2550" />
          <stop offset=".6" stopColor="#0d1430" />
          <stop offset="1" stopColor="#24195a" />
        </linearGradient>
        <radialGradient id="cap-halo" cx=".5" cy=".5" r=".5">
          <stop stopColor="#00e5f5" stopOpacity=".38" />
          <stop offset=".6" stopColor="#3f6dff" stopOpacity=".12" />
          <stop offset="1" stopColor="#3f6dff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cap-beam" x1="0" y1="200" x2="0" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00e5f5" stopOpacity=".05" />
          <stop offset="1" stopColor="#00e5f5" stopOpacity=".35" />
        </linearGradient>
        <filter id="cap-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <ellipse cx="180" cy="150" rx="175" ry="120" fill="url(#cap-halo)" />
      {/* holographic pedestal + light beam */}
      <path d="M118 222 L242 222 L300 296 L60 296 Z" fill="url(#cap-beam)" />
      <g className={styles.rings}>
        <ellipse cx="180" cy="296" rx="155" ry="32" stroke="#00e5f5" strokeOpacity=".35" />
        <ellipse cx="180" cy="296" rx="115" ry="23" stroke="#00e5f5" strokeOpacity=".6" strokeDasharray="2 6" />
        <ellipse cx="180" cy="296" rx="75" ry="14" stroke="#7ff3ff" strokeOpacity=".9" />
        <ellipse cx="180" cy="296" rx="155" ry="32" stroke="#00e5f5" strokeOpacity=".55" strokeWidth="3" filter="url(#cap-glow)" />
      </g>
      {/* band */}
      <path d="M92 140 L92 202 C 92 236, 268 236, 268 202 L268 140" fill="url(#cap-band)" />
      <path d="M92 202 C 92 236, 268 236, 268 202" stroke="url(#cap-edge)" strokeWidth="2.5" />
      <path d="M92 140 L92 202 M268 140 L268 202" stroke="#3d5f9a" strokeWidth="1.5" />
      {/* board: thickness, top face, glowing rim */}
      <path d="M22 118 L180 174 L338 118 L338 132 L180 188 L22 132 Z" fill="url(#cap-side)" stroke="#2b4d86" strokeWidth="1" />
      <path d="M180 60 L338 118 L180 174 L22 118 Z" fill="url(#cap-top)" />
      <path d="M180 60 L338 118 L180 174 L22 118 Z" stroke="#00e5f5" strokeOpacity=".55" strokeWidth="9" filter="url(#cap-glow)" />
      <path d="M180 60 L338 118 L180 174 L22 118 Z" stroke="url(#cap-edge)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M180 70 L320 118" stroke="#ffffff" strokeOpacity=".22" strokeWidth="2" strokeLinecap="round" />
      {/* button + tassel */}
      <ellipse cx="180" cy="116" rx="13" ry="6" fill="#33427a" stroke="#9ff4ff" strokeWidth="1.5" />
      <g className={styles.tassel}>
        <path d="M180 116 C 128 122, 90 128, 70 142 L70 208" stroke="#00e5f5" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M60 206 L80 206 L86 252 L54 252 Z" fill="#00d8f3" />
        <path d="M60 220 L58 252 M66 220 L65 252 M72 220 L72 252 M78 220 L79 252" stroke="#7ff3ff" strokeOpacity=".7" />
        <path d="M60 206 L80 206 L86 252 L54 252 Z" fill="#00e5f5" opacity=".55" filter="url(#cap-glow)" />
      </g>
    </svg>
  );
}

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className={styles.row}>
      <span className={styles.rowIcon}>{icon}</span>
      {children}
    </li>
  );
}

// Card offsets (in % of the column) reproduce the staggered stack from the design.
const OFFSETS = ["4%", "15%", "0%", "24%", "4%"];
// Points on the connector curve (same Bézier as the SVG path) where glowing nodes sit.
const NODES = [
  { x: 6, y: 34, c: "#3fd9ff" },
  { x: 23, y: 77, c: "#a46bff" },
  { x: 98, y: 97, c: "#3fd9ff" },
];

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className={styles.section}>
      <div className={styles.inner}>
        <header className={`${styles.head} reveal`}>
          <div>
            <p className={styles.eyebrow}>
              <span>06</span> / Learning
            </p>
            <h2 id="education-title" className={styles.title}>
              Education &amp; <span>Certifications</span>
            </h2>
            <p className={styles.subtitle}>Academic foundation and focused credentials behind my AI/ML journey.</p>
            <span className={styles.accent} aria-hidden="true" />
          </div>
        </header>

        <div className={styles.body}>
          {/* Degree */}
          <div className={`${styles.degreeStage} reveal`}>
            <GraduationCap />
            <article className={styles.degreeCard} aria-labelledby="degree-title">
              <p className={styles.label}>Degree</p>
              <h3 id="degree-title">{education.degree}</h3>
              <ul className={styles.rows}>
                <Row
                  icon={
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 9.5 12 4l9 5.5M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />
                    </svg>
                  }
                >
                  {education.school}
                </Row>
                <Row icon={<SectionIcon name="calendar" width={22} height={22} />}>{education.period}</Row>
              </ul>
              <span className={styles.divider} aria-hidden="true" />
              <p className={styles.label}>Percentage</p>
              <p className={styles.score}>{education.score}</p>
              <ul className={styles.chips} aria-label="Focus areas">
                {["AI", "ML", "Foundations"].map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </article>
          </div>

          {/* Certifications */}
          <div className={styles.certStage}>
            <svg className={styles.connector} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 22 2 C -4 30, 2 62, 30 80 S 88 96, 98 97" />
            </svg>
            {NODES.map((n, i) => (
              <span key={i} className={styles.node} style={{ left: `${n.x}%`, top: `${n.y}%`, "--node": n.c } as CSSProperties} aria-hidden="true" />
            ))}
            <ul className={styles.certs} aria-label="Certifications">
              {certifications.map((cert, i) => {
                const href = "href" in cert ? cert.href : undefined;
                const body = (
                  <>
                    <CertLogo cert={cert} />
                    <span className={styles.certText}>
                      <strong>{cert.title}</strong>
                      <span>{cert.issuer}</span>
                    </span>
                    {href && (
                      <span className={styles.certArrow} aria-hidden="true">
                        <ArrowUpRight width={16} height={16} />
                      </span>
                    )}
                  </>
                );
                return (
                  <li
                    key={cert.title}
                    className={`${styles.cert} reveal`}
                    style={{ "--offset": OFFSETS[i % OFFSETS.length], "--delay": `${i * 90}ms` } as CSSProperties}
                  >
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.certInner}>
                        {body}
                        <span className="sr-only"> (verify, opens in a new tab)</span>
                      </a>
                    ) : (
                      <div className={styles.certInner}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
