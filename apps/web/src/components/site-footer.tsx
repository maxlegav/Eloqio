import { Link } from "react-router-dom";
import styles from "../styles/page.module.css";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  graphic_eq
                </span>
              </div>
              <span className={styles.logoText}>Eloquio</span>
            </Link>
            <p className={styles.footerDescription}>
              The world&apos;s first AI voice dictation tool built specifically for prompt engineering.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Product</h4>
              <Link to="/download" className={styles.footerLink}>Download</Link>
              <a href="#" className={styles.footerLink}>Changelog</a>
              <a href="#" className={styles.footerLink}>Integrations</a>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Company</h4>
              <a href="#" className={styles.footerLink}>About</a>
              <a href="#" className={styles.footerLink}>Blog</a>
              <a href="#" className={styles.footerLink}>Careers</a>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Legal</h4>
              <Link to="/privacy" className={styles.footerLink}>Privacy</Link>
              <Link to="/terms" className={styles.footerLink}>Terms</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            &copy; {currentYear} Eloquio Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
