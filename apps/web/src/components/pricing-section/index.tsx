import { FormattedMessage } from "react-intl";
import { trackButtonClick } from "../../utils/analytics.utils";
import pageStyles from "../../styles/page.module.css";
import { DownloadButton } from "../download-button";
import { CalPopupButton } from "../CalPopupButton";
import styles from "./pricing-section.module.css";

type Feature = string | { text: string; deemphasized?: boolean };

type PricingPlan = {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: Feature[];
  cta: "download" | "contact";
  popular: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Personal",
    description: "Free forever for individuals.",
    price: "Free",
    priceNote: "No credit card required",
    features: [
      "Local transcription",
      "All languages supported",
      "Unlimited use",
      "Smart text cleanup",
      "Works offline",
    ],
    cta: "download",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "For teams with advanced needs.",
    price: "Contact Us",
    priceNote: "Custom pricing",
    features: [
      { text: "Everything in Personal", deemphasized: true },
      "Priority support",
      "Team deployment",
      "Custom integration",
      "Volume licensing",
    ],
    cta: "contact",
    popular: true,
  },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={pageStyles.badge}>
            <FormattedMessage defaultMessage="Pricing" />
          </span>
          <h2>
            <FormattedMessage defaultMessage="Simple, transparent pricing" />
          </h2>
          <p>
            <FormattedMessage defaultMessage="Free for personal use. Enterprise options for teams." />
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`${styles.card} ${plan.popular ? styles.popular : ""}`}
            >
              {plan.popular && (
                <span className={styles.popularBadge}>
                  <FormattedMessage defaultMessage="Enterprise" />
                </span>
              )}

              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>

              <div className={styles.priceContainer}>
                <span className={styles.price}>{plan.price}</span>
                <div className={styles.billingNote}>{plan.priceNote}</div>
              </div>

              {plan.cta === "download" ? (
                <DownloadButton
                  className={styles.ctaButtonOutline}
                  trackingId={`pricing-${plan.name.toLowerCase()}`}
                />
              ) : (
                <CalPopupButton
                  className={styles.ctaButton}
                  onBeforeOpen={() => trackButtonClick(`pricing-${plan.name.toLowerCase()}`)}
                >
                  <FormattedMessage defaultMessage="Book a Call" />
                </CalPopupButton>
              )}

              <div className={styles.featuresSection}>
                <p className={styles.featuresTitle}>
                  <FormattedMessage defaultMessage="What's included" />
                </p>
                <ul className={styles.featuresList}>
                  {plan.features.map((feature) => {
                    const text = typeof feature === "string" ? feature : feature.text;
                    const deemphasized = typeof feature === "object" && feature.deemphasized;
                    return (
                      <li
                        key={text}
                        className={`${styles.featureItem} ${deemphasized ? styles.deemphasized : ""}`}
                      >
                        <CheckIcon className={styles.checkIcon} />
                        <span>{text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.trustSignal}>
          <ShieldIcon className={styles.shieldIcon} />
          <span className={styles.trustText}>
            <strong>
              <FormattedMessage defaultMessage="100% Local Processing" />
            </strong>
            {" · "}
            <FormattedMessage defaultMessage="Your data never leaves your device" />
          </span>
        </div>
      </div>
    </section>
  );
}
