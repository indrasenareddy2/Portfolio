import { ArrowRight, ArrowUpRight, Download, GitHub, LinkedIn, Mail } from "@/components/ui/Icons";
import { Workspace } from "@/components/sections/Workspace";
import styles from "@/components/sections/ReferenceSections.module.css";
import { profile } from "@/data/profile";
import { asset } from "@/lib/site";

export function Contact() {
  const links = [
    { label: "Email", text: profile.email, href: `mailto:${profile.email}`, Icon: Mail, className: "emailCard" },
    { label: "LinkedIn", text: "Connect with me", href: profile.linkedin, Icon: LinkedIn, className: "linkedinCard" },
    { label: "GitHub", text: "Explore my work", href: profile.github, Icon: GitHub, className: "githubCard" },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className={`${styles.section} ${styles.contact}`}>
      <Workspace scene="contact" />
      <div className={styles.inner}>
        <div className={`${styles.contactCopy} reveal`}>
          <p className={styles.eyebrow}>Get in touch</p>
          <h2 id="contact-title" className={styles.contactTitle}>Let&apos;s Build<br />Something<br /><span>Intelligent.</span></h2>
          <span className={styles.accentLine} aria-hidden="true" />
          <p className={styles.contactIntro}>I&apos;m open to discussing new opportunities,<br className={styles.desktopBreak} /> interesting projects or ideas in AI and machine learning.</p>
          <div className={styles.contactActions}>
            <a href={`mailto:${profile.email}`} className={styles.gradientButton}>Send a Message <ArrowRight /></a>
            <a href={asset(profile.resume)} download className={styles.outlineButton}><Download /> Download Resume</a>
          </div>
          <p className={styles.contactLocation}>{profile.location}</p>
        </div>
        <ul className={styles.contactLinks}>
          {links.map(({ label, text, href, Icon, className }) => (
            <li key={label} className={`${styles.contactCard} ${styles[className]}`}>
              <a href={href} {...(label !== "Email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className={styles.contactIcon}><Icon width={30} height={30} /></span>
                <span className={styles.contactCardText}><strong>{label}</strong><span>{text}</span></span>
                <ArrowUpRight className={styles.contactArrow} width={22} height={22} />
                {label !== "Email" && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
