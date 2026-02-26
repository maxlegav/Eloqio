import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/page.module.css";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#enterprise", label: "Enterprise" },
    { href: "/#pricing", label: "Pricing" },
    { href: "mailto:hello@eloquio.com", label: "Contact" },
  ];

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
              graphic_eq
            </span>
          </div>
          <span className={styles.logoText}>Eloquio</span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className={styles.navLink}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <Link to="/download" className={styles.primaryButton}>
            Download Free
          </Link>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className={styles.mobileMenuActions}>
            <Link
              to="/download"
              className={styles.primaryButton}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download Free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SiteHeader;
