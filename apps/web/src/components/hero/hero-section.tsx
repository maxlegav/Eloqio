import { FormattedMessage, useIntl } from "react-intl";
import DownloadButton from "../download-button";
import pageStyles from "../../styles/page.module.css";
import styles from "./hero.module.css";
import { HeroGraphic } from "./hero-graphic";

export function HeroSection() {
  const intl = useIntl();

  return (
    <section className={styles.heroSection} id="overview">
      <div className={styles.heroContent}>
        <span className={pageStyles.badge}>
          <FormattedMessage defaultMessage="Enterprise Voice-to-Text" />
        </span>
        <h1 className={styles.heroTitle}>
          <FormattedMessage defaultMessage="Your voice, your AI, your data." />
        </h1>
        <p className={styles.heroSubtitle}>
          <FormattedMessage defaultMessage="Speak to AI 4x faster than typing. All processing happens on your device—we never see your data." />
        </p>
        <div className={styles.heroActions}>
          <DownloadButton trackingId="download-hero" />
          <a
            href="https://cal.com/eloqio/presentation-eloqio"
            target="_blank"
            rel="noopener noreferrer"
            className={pageStyles.secondaryButton}
          >
            <FormattedMessage defaultMessage="Book a Demo" />
          </a>
        </div>
        <div className={styles.heroMeta}>
          <div
            className={styles.trustIndicators}
            aria-label={intl.formatMessage({
              defaultMessage: "Trust indicators",
            })}
          >
            <span className={styles.trustItem}>
              <FormattedMessage defaultMessage="100% Local" />
            </span>
            <span className={styles.trustDivider}>|</span>
            <span className={styles.trustItem}>
              <FormattedMessage defaultMessage="No Account Required" />
            </span>
            <span className={styles.trustDivider}>|</span>
            <span className={styles.trustItem}>
              <FormattedMessage defaultMessage="macOS · Windows · Linux" />
            </span>
          </div>
        </div>
      </div>
      <HeroGraphic />
    </section>
  );
}

export default HeroSection;
