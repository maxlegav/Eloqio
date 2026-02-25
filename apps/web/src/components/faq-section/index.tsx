import { useState } from "react";
import { FormattedMessage } from "react-intl";
import pageStyles from "../../styles/page.module.css";
import styles from "./faq-section.module.css";

type FaqItem = {
  question: React.ReactNode;
  answer: React.ReactNode;
};

const faqItems: FaqItem[] = [
  {
    question: <FormattedMessage defaultMessage="Is my data really private?" />,
    answer: (
      <FormattedMessage defaultMessage="Yes. Eloquio uses Whisper AI running entirely on your device. Your voice recordings are never sent to any server—not ours, not anyone else's. The processing happens locally using your computer's CPU or GPU, and audio files stay on your machine." />
    ),
  },
  {
    question: <FormattedMessage defaultMessage="Do I need an internet connection?" />,
    answer: (
      <FormattedMessage defaultMessage="No. Core transcription works completely offline. Once you've downloaded Eloquio and the AI model, you can use it anywhere—on a plane, in a secure facility, or anywhere without network access." />
    ),
  },
  {
    question: <FormattedMessage defaultMessage="What makes Eloquio different from other voice tools?" />,
    answer: (
      <FormattedMessage defaultMessage="Most voice-to-text tools send your audio to the cloud for processing. Eloquio is different—everything runs locally on your device. This means faster response times, no subscription fees for core features, and complete data privacy that meets enterprise security requirements." />
    ),
  },
  {
    question: <FormattedMessage defaultMessage="Can I use Eloquio with any application?" />,
    answer: (
      <FormattedMessage defaultMessage="Yes. Eloquio works system-wide across macOS, Windows, and Linux. Any text field, any application—email, documents, chat, code editors, browsers—your voice just works wherever you can type." />
    ),
  },
  {
    question: <FormattedMessage defaultMessage="Is there a free version?" />,
    answer: (
      <FormattedMessage defaultMessage="Yes. Personal use is free forever. You get full local transcription, all supported languages, and unlimited use at no cost. Enterprise features like priority support and team deployment are available for organizations." />
    ),
  },
  {
    question: <FormattedMessage defaultMessage="How do I get started with my team?" />,
    answer: (
      <FormattedMessage defaultMessage="Book a call with us to discuss your organization's needs. We'll help you understand deployment options, security considerations, and how Eloquio can integrate with your existing workflows. The consultation is free with no commitment required." />
    ),
  },
];

function ChevronIcon({ className, isOpen }: { className?: string; isOpen: boolean }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FaqAccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}>
      <button className={styles.accordionButton} onClick={onToggle} aria-expanded={isOpen}>
        <span className={styles.question}>{item.question}</span>
        <ChevronIcon className={styles.chevronIcon} isOpen={isOpen} />
      </button>
      <div className={styles.accordionContent} aria-hidden={!isOpen}>
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={pageStyles.badge}>
            <FormattedMessage defaultMessage="FAQ" />
          </span>
          <h2>
            <FormattedMessage defaultMessage="Frequently asked questions" />
          </h2>
          <p>
            <FormattedMessage defaultMessage="Everything you need to know about Eloquio." />
          </p>
        </div>
        <div className={styles.accordion}>
          {faqItems.map((item, index) => (
            <FaqAccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
