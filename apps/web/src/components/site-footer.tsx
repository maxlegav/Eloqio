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
              The AI voice dictation tool built for prompt engineers and modern knowledge workers. Speak your thoughts, ship faster.
            </p>
            <a href="mailto:hello@eloquio.com" className={styles.footerEmail}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>mail</span>
              hello@eloquio.com
            </a>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Product</h4>
              <Link to="/download" className={styles.footerLink}>Download</Link>
              <a href="/#pricing" className={styles.footerLink}>Pricing</a>
              <a href="/#features" className={styles.footerLink}>Features</a>
              <a href="/#enterprise" className={styles.footerLink}>Enterprise</a>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Resources</h4>
              <a href="#" className={styles.footerLink}>Documentation</a>
              <a href="#" className={styles.footerLink}>Changelog</a>
              <a
                href="https://github.com/josiahsrc/voquill"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                GitHub
              </a>
              <a href="#" className={styles.footerLink}>Status</a>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Company</h4>
              <a href="#" className={styles.footerLink}>About</a>
              <a href="#" className={styles.footerLink}>Blog</a>
              <a href="#" className={styles.footerLink}>Careers</a>
              <a href="mailto:hello@eloquio.com" className={styles.footerLink}>Contact</a>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Legal</h4>
              <Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link>
              <Link to="/terms" className={styles.footerLink}>Terms of Service</Link>
              <a href="mailto:security@eloquio.com" className={styles.footerLink}>Security</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            &copy; {currentYear} Eloquio Inc. All rights reserved.
          </p>
          <p className={styles.footerTagline}>Made for humans. Powered by AI.</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
