import { profile } from "@/data/profile";
import { asset } from "@/lib/site";
import { FooterScene } from "./FooterScene";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer id="footer" className={styles.footer} aria-label="Portfolio footer">
      <div className={styles.hero}>
        <div className={styles.scene}><FooterScene /></div>
        <div className={styles.inner}>
          <a href={asset("/")} className={styles.brand} aria-label={`${profile.shortName}, home`}>TIR<span aria-hidden="true" /></a>
          <div className={styles.copy}>
            <h2>Building a<span>Smarter Tomorrow<b>.</b></span></h2>
            <span className={styles.accent} aria-hidden="true" />
            <p className={styles.tagline}><span>Ideas</span><i aria-hidden="true">·</i><span>Code</span><i aria-hidden="true">·</i><span>Impact</span></p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.inner}>
          <p className={styles.copyright}>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
          <a href={asset("/#top")} className={styles.backToTop} aria-label="Back to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20V4m-7 7 7-7 7 7" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
