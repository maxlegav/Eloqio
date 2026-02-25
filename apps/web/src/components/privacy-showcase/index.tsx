import { FormattedMessage } from "react-intl";
import PrivacyLock from "../privacy-lock";
import styles from "../../styles/page.module.css";

export default function PrivacyShowcase() {
  return (
    <section className={styles.splitSection} id="privacy">
      <div className={styles.splitContent}>
        <span className={styles.badge}>
          <FormattedMessage defaultMessage="100% Local Processing" />
        </span>
        <h2>
          <FormattedMessage defaultMessage="Your voice never leaves your device." />
        </h2>
        <p>
          <FormattedMessage defaultMessage="Eloquio processes everything locally using Whisper AI. No cloud. No data transmission. No risk." />
        </p>
        <ul className={styles.bulletList}>
          <li>
            <strong><FormattedMessage defaultMessage="No internet required" /></strong>
            {" — "}
            <FormattedMessage defaultMessage="Works completely offline" />
          </li>
          <li>
            <strong><FormattedMessage defaultMessage="GDPR/HIPAA friendly" /></strong>
            {" — "}
            <FormattedMessage defaultMessage="Data never leaves your control" />
          </li>
          <li>
            <strong><FormattedMessage defaultMessage="Perfect for confidential work" /></strong>
            {" — "}
            <FormattedMessage defaultMessage="Legal, medical, financial protected" />
          </li>
        </ul>
      </div>
      <div className={`${styles.splitMedia} ${styles.privacyMedia}`}>
        <PrivacyLock />
      </div>
    </section>
  );
}
