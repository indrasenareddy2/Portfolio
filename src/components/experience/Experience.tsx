import { SectionIcon } from "@/components/sections/SectionIcon";
import { Workspace } from "@/components/sections/Workspace";
import styles from "@/components/sections/ReferenceSections.module.css";
import { ArrowUpRight } from "@/components/ui/Icons";
import { roles } from "@/data/experience";
import { certifications, education } from "@/data/profile";

const highlights: Record<string, string[]> = {
  Onusworks: [
    "Built enterprise GenAI and RAG systems for workforce analytics and employee support.",
    "Developed VYN Insights, Crew Call and AI-assisted EDW report mapping.",
    "Integrated LLM workflows with enterprise data, validation layers and backend APIs.",
  ],
  VCodez: [
    "Developed ML workflows with Python, scikit-learn and Pandas.",
    "Built an AI outfit suggestion prototype using ML-based image recognition.",
    "Created Power BI and Excel visualizations and mentored junior interns.",
  ],
};

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className={`${styles.section} ${styles.experience}`}>
      <Workspace scene="experience" />
      <div className={styles.inner}>
        <div className={styles.experienceGrid}>
          <div className={`${styles.experienceIntro} reveal`}>
            <span className={styles.accentLine} aria-hidden="true" />
            <h2 id="experience-title" className={styles.largeTitle}>Experience</h2>
            <p className={styles.sectionSubtitle}>My journey building AI and ML systems.</p>
          </div>
          <ol className={styles.timeline}>
            {roles.map((role, index) => (
              <li key={role.company} className={`${styles.roleCard} reveal`}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <div className={styles.roleTop}>
                  <span className={styles.companyMark} aria-hidden="true">{index === 0 ? <span className={styles.onusMark} /> : <span className={styles.vcodezMark}>V</span>}</span>
                  <div><h3>{role.company}</h3><p className={styles.roleTitle}>{role.title}</p><p className={styles.rolePeriod}><SectionIcon name="calendar" width={20} height={20} />{role.period}</p></div>
                </div>
                <ul className={styles.roleBullets}>{highlights[role.company].map((line) => <li key={line}>{line}</li>)}</ul>
                <span className={styles.roleLocation}>{role.location}</span>
              </li>
            ))}
          </ol>
        </div>
        <details className={`${styles.credentials} reveal`}>
          <summary><SectionIcon name="education" width={21} height={21} /> Education & certifications <span>View credentials <span aria-hidden="true">+</span></span></summary>
          <div className={styles.credentialsContent}>
            <div><p className={styles.eyebrow}>Education</p><h3>{education.degree}</h3><p>{education.school}</p><p>{education.period} · {education.score}</p></div>
            <div><p className={styles.eyebrow}>Certifications</p><ul>{certifications.map((cert) => <li key={cert.title}>{"href" in cert && cert.href ? <a href={cert.href} target="_blank" rel="noopener noreferrer">{cert.title} <ArrowUpRight width={13} height={13} /><span className="sr-only"> (opens in a new tab)</span></a> : cert.title}<span>{cert.issuer}</span></li>)}</ul></div>
          </div>
        </details>
      </div>
    </section>
  );
}
