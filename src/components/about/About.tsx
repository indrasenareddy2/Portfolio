import { SectionIcon, type SectionIconName } from "@/components/sections/SectionIcon";
import { Workspace } from "@/components/sections/Workspace";
import styles from "@/components/sections/ReferenceSections.module.css";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

const capabilities: { label: string; icon: SectionIconName; className: string }[] = [
  { label: "RAG", icon: "database", className: "rag" },
  { label: "Agents", icon: "network", className: "agents" },
  { label: "ML", icon: "chart", className: "ml" },
  { label: "Enterprise AI", icon: "cloud", className: "enterprise" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className={`${styles.section} ${styles.about}`}>
      <Workspace scene="about" />
      <div className={styles.inner}>
        <div className={`${styles.aboutCopy} reveal`}>
          <p className={styles.aboutEyebrow}>About Me</p>
          <h2 id="about-title" className={styles.aboutTitle}>AI / ML <span>ENGINEER</span></h2>
          <span className={styles.accentLine} aria-hidden="true" />
          <p className={styles.aboutIntro}>I build AI systems, GenAI applications and ML workflows.<br className={styles.desktopBreak} /> Connecting LLMs to enterprise data, business rules and production.</p>
          <p className={styles.aboutDetail}>At {profile.company}, I build RAG assistants, agentic workflows and workforce intelligence solutions — from retrieval and validation to backend APIs and cloud infrastructure.</p>
          <ul className={styles.stats} aria-label="At a glance">
            <li><SectionIcon name="education" /><strong>2025</strong><span>In AI / ML since</span></li>
            <li><SectionIcon name="document" /><strong>{projects.length}</strong><span>Major projects</span></li>
            <li><SectionIcon name="settings" /><strong className={styles.endToEnd}>End-to-end</strong><span>AI systems</span></li>
          </ul>
        </div>
        <div className={styles.capabilities} aria-label="Areas of focus">
          {capabilities.map(({ label, icon, className }) => (
            <div key={label} className={`${styles.capability} ${styles[className]}`}><SectionIcon name={icon} /><span>{label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
