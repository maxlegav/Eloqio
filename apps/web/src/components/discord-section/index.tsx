import { FormattedMessage } from "react-intl";
import { trackButtonClick } from "../../utils/analytics.utils";
import pageStyles from "../../styles/page.module.css";
import styles from "./discord-section.module.css";

export default function CtaSection() {
  return (
    <section className={styles.section} id="cta-contact">
      <div className={styles.content}>
        <span className={pageStyles.badge}>
          <FormattedMessage defaultMessage="Enterprise" />
        </span>
        <h2 className={styles.heading}>
          <FormattedMessage defaultMessage="Ready to bring Eloquio to your team?" />
        </h2>
        <p className={styles.description}>
          <FormattedMessage defaultMessage="Let's discuss how Eloquio can help your organization work faster while keeping data secure." />
        </p>
        <a
          href="https://cal.com/eloqio/presentation-eloqio"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
          onClick={() => trackButtonClick("cta-book-call")}
        >
          <FormattedMessage defaultMessage="Book a Call" />
        </a>
        <p className={styles.ctaNote}>
          <FormattedMessage defaultMessage="Free consultation · No commitment · 15 minutes" />
        </p>
      </div>
    </section>
  );
}
