import { Link } from "react-router-dom";
import styles from "./landing-sections.module.css";

export function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroDottedOverlay} />
      <div className={`${styles.heroBlurCircle} ${styles.heroBlurCircleLeft}`} />
      <div className={`${styles.heroBlurCircle} ${styles.heroBlurCircleRight}`} />

      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>auto_awesome</span>
          <span>New: Voice-to-Code 2.0</span>
        </div>

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleAccent}>Stop Typing.</span>
          <br />
          <span className={styles.heroTitleAccentBold}>Start Prompting.</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Unlock superior prompt engineering with enterprise-grade AI voice dictation.
          Speak <span className={styles.heroSubtitleAccent}>structured instructions</span>, not just text.
        </p>

        <div className={styles.heroActions}>
          <Link to="/download" className={styles.heroPrimaryBtn}>
            Download Free
          </Link>
          <a
            href="https://cal.com/eloqio/presentation-eloqio"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroSecondaryBtn}
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}

export function WorksEverywhereSection() {
  const apps = [
    { icon: "terminal", name: "VS Code", hoverColor: "#007ACC" },
    { icon: "chat", name: "Slack", hoverColor: "#4A154B" },
    { icon: "article", name: "Notion", hoverColor: "#000000" },
    { icon: "mail", name: "Gmail", hoverColor: "#EA4335" },
    { icon: "smart_toy", name: "ChatGPT", hoverColor: "#10A37F" },
  ];

  return (
    <section className={styles.worksEverywhereSection}>
      <p className={styles.worksEverywhereTitle}>Works everywhere you work</p>
      <div className={styles.worksEverywhereGrid}>
        {apps.map((app) => (
          <div key={app.name} className={styles.worksEverywhereItem}>
            <span className="material-symbols-outlined">{app.icon}</span>
            <span>{app.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TypingTrapSection() {
  const features = [
    {
      icon: "mic",
      title: "Rich Context",
      description: "Provide the backstory and nuance your AI needs without the friction of typing it out.",
    },
    {
      icon: "view_quilt",
      title: "Structured Output",
      description: 'Dictate formatting, code blocks, and lists effortlessly. "Make this a bullet list."',
    },
    {
      icon: "bolt",
      title: "Zero Friction",
      description: "Eliminate the barrier between thought and prompt. Speak at the speed of thought.",
    },
  ];

  return (
    <section className={styles.typingTrapSection} id="features">
      <div className={styles.typingTrapContent}>
        <div className={styles.typingTrapHeader}>
          <h2 className={styles.typingTrapTitle}>
            The <span className={styles.typingTrapTitleAccent}>Typing Trap</span> vs. Voice Power
          </h2>
          <p className={styles.typingTrapSubtitle}>
            Typing leads to lazy, short prompts. Voice allows for rich, structured instructions
            that AI models actually understand better.
          </p>
        </div>

        <div className={styles.typingTrapGrid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.typingTrapCard}>
              <div className={styles.typingTrapCardIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: "30px" }}>
                  {feature.icon}
                </span>
              </div>
              <div>
                <h3 className={styles.typingTrapCardTitle}>{feature.title}</h3>
                <p className={styles.typingTrapCardDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  return (
    <section className={styles.videoSection}>
      <div className={styles.videoContent}>
        <div className={styles.videoWrapper}>
          <div className={styles.videoOverlay} />
          <div className={styles.videoPlayOverlay}>
            <button className={styles.videoPlayButton}>
              <span className="material-symbols-outlined" style={{ fontSize: "48px", marginLeft: "6px" }}>
                play_arrow
              </span>
            </button>
          </div>
        </div>
        <p className={styles.videoCaption}>Watch Eloquio in action (1:45)</p>
      </div>
    </section>
  );
}

export function SecuritySection() {
  const securityFeatures = [
    "SOC2 Compliant Architecture",
    "Zero Data Retention Policy",
    "On-Premise Deployment Available",
  ];

  return (
    <section className={styles.securitySection} id="enterprise">
      <div className={styles.securityBlur} />

      <div className={styles.securityContent}>
        <div className={styles.securityLeft}>
          <div className={styles.securityBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>security</span>
            Security First
          </div>

          <h2 className={styles.securityTitle}>
            Your Data stays Yours.
            <br />
            <span className={styles.securityTitleAccent}>Period.</span>
          </h2>

          <p className={styles.securitySubtitle}>
            We understand enterprise needs. That&apos;s why Eloquio offers{" "}
            <strong style={{ color: "#ffffff" }}>100% local processing</strong> options
            and supports Bring Your Own Key (BYOK) for OpenAI and Anthropic models.
          </p>

          <ul className={styles.securityList}>
            {securityFeatures.map((feature) => (
              <li key={feature} className={styles.securityListItem}>
                <span className={`material-symbols-outlined ${styles.securityListIcon}`}>
                  check_circle
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.securityRight}>
          <div className={styles.apiConfigCard}>
            <div className={styles.apiConfigHeader}>
              <span className={styles.apiConfigTitle}>API Configuration</span>
              <span className={styles.apiConfigBadge}>Secure</span>
            </div>

            <div className={styles.apiConfigField}>
              <label className={styles.apiConfigLabel}>Provider</label>
              <div className={styles.apiConfigInput}>OpenAI (GPT-4)</div>
            </div>

            <div className={styles.apiConfigField}>
              <label className={styles.apiConfigLabel}>API Key</label>
              <div className={`${styles.apiConfigInput} ${styles.apiConfigInputMono}`}>
                sk-••••••••••••••••••••••••
              </div>
            </div>

            <div className={styles.apiConfigToggle}>
              <div className={styles.apiConfigToggleSwitch}>
                <div className={styles.apiConfigToggleKnob} />
              </div>
              <span className={styles.apiConfigToggleLabel}>Local Processing Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SpeedSection() {
  const speedChips = [
    { icon: "graphic_eq", text: 'Removes "Ums"' },
    { icon: "format_align_left", text: "Auto-Indentation" },
    { icon: "spellcheck", text: "Smart Fixes" },
    { icon: "speed", text: "Real-time Latency" },
  ];

  return (
    <section className={styles.speedSection}>
      <div className={styles.speedContent}>
        <div className={`${styles.speedRow} ${styles.speedRowReverse}`}>
          <div className={styles.speedTextContent}>
            <h2 className={styles.speedTitle}>
              <span className={styles.speedTitleAccent}>4x Faster.</span>
              <br />
              Zero Fluff.
            </h2>
            <p className={styles.speedSubtitle}>
              Our AI pipeline doesn&apos;t just transcribe; it refines. Speak naturally and
              let Eloquio clean up the mess instantly.
            </p>
            <div className={styles.speedChips}>
              {speedChips.map((chip) => (
                <div key={chip.text} className={styles.speedChip}>
                  <span className={`material-symbols-outlined ${styles.speedChipIcon}`}>
                    {chip.icon}
                  </span>
                  <span className={styles.speedChipText}>{chip.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.speedVisualContent}>
            <div className={styles.speedComparisonCard}>
              <div className={styles.speedBarContainer}>
                <div className={styles.speedBarGroup}>
                  <div className={styles.speedBarLabel}>
                    <span>Typing Speed</span>
                    <span>40 WPM</span>
                  </div>
                  <div className={styles.speedBar}>
                    <div className={`${styles.speedBarFill} ${styles.speedBarFillGray}`} />
                  </div>
                </div>

                <div className={styles.speedBarGroup}>
                  <div className={`${styles.speedBarLabel} ${styles.speedBarLabelAccent}`}>
                    <span>Eloquio Voice</span>
                    <span className={styles.speedBarLabelValue}>160 WPM</span>
                  </div>
                  <div className={styles.speedBar}>
                    <div className={`${styles.speedBarFill} ${styles.speedBarFillPrimary}`}>
                      <div className={styles.speedBarPulse} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.speedRow}>
          <div className={styles.speedTextContent}>
            <h2 className={styles.speedTitle}>
              Smart <span className={styles.speedTitleAccent}>Dictionary</span>
            </h2>
            <p className={styles.speedSubtitle}>
              Map specific phrases to complex data. Say &quot;Send email to John&quot; and let
              Eloquio know exactly which John and what address.
            </p>
          </div>

          <div className={styles.speedVisualContent}>
            <div className={styles.dictionaryCard}>
              <span className={`material-symbols-outlined ${styles.dictionaryCardBgIcon}`}>
                dictionary
              </span>

              <div className={styles.dictionaryContent}>
                <div className={styles.dictionaryInput}>
                  <span className={`material-symbols-outlined ${styles.dictionaryInputIcon}`}>
                    mic
                  </span>
                  <span className={styles.dictionaryInputText}>&quot;Email John the report.&quot;</span>
                </div>

                <div className={styles.dictionaryArrow}>
                  <span className="material-symbols-outlined" style={{ animation: "bounce 1s ease-in-out infinite" }}>
                    arrow_downward
                  </span>
                </div>

                <div className={styles.dictionaryOutput}>
                  <div className={styles.dictionaryOutputLabel}>Output</div>
                  <div className={styles.dictionaryOutputCode}>
                    <span className={styles.dictionaryOutputCodeKey}>mailto:</span>john.doe@enterprise.com
                    <br />
                    <span className={styles.dictionaryOutputCodeKeyPurple}>subject:</span> Q3 Report
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ToneSwitchingSection() {
  const tones = [
    {
      icon: "group",
      title: "For Teams",
      description: "Professional, concise, bulleted updates for Slack or Teams.",
      circleClass: styles.toneCircleTeams,
    },
    {
      icon: "mail",
      title: "For Email",
      description: "Formal, structured, and polite with proper greetings.",
      circleClass: styles.toneCircleEmail,
    },
    {
      icon: "chat_bubble",
      title: "For Personal",
      description: "Casual, quick, and expressive for texts or notes.",
      circleClass: styles.toneCirclePersonal,
    },
  ];

  return (
    <section className={styles.toneSection}>
      <div className={styles.toneContent}>
        <h2 className={styles.toneTitle}>
          Contextual Tone <span className={styles.toneTitleAccent}>Switching</span>
        </h2>

        <div className={styles.toneGrid}>
          {tones.map((tone) => (
            <div key={tone.title} className={styles.toneItem}>
              <div className={`${styles.toneCircle} ${tone.circleClass}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "48px" }}>
                  {tone.icon}
                </span>
              </div>
              <div>
                <h3 className={styles.toneItemTitle}>{tone.title}</h3>
                <p className={styles.toneItemDescription}>{tone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  const basicFeatures = [
    "30 mins dictation/day",
    "Standard Cleanup",
    "1 Device",
  ];

  const proFeatures = [
    "Unlimited Dictation",
    "Custom Dictionary",
    "4k Audio Quality",
    "Enterprise Security",
  ];

  return (
    <section className={styles.pricingSection} id="pricing">
      <div className={styles.pricingContent}>
        <div className={styles.pricingHeader}>
          <h2 className={styles.pricingTitle}>
            Simple <span className={styles.pricingTitleAccent}>Pricing</span>
          </h2>
        </div>

        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingCardHeader}>
              <h3 className={styles.pricingPlanName}>Basic</h3>
              <div className={styles.pricingPrice}>Free</div>
              <p className={styles.pricingDescription}>Perfect for individuals starting out.</p>
            </div>

            <ul className={styles.pricingFeatureList}>
              {basicFeatures.map((feature) => (
                <li key={feature} className={styles.pricingFeatureItem}>
                  <span className={`material-symbols-outlined ${styles.pricingCheckIcon}`}>
                    check_circle
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/download"
              className={`${styles.pricingButton} ${styles.pricingButtonOutline}`}
            >
              Get Started
            </Link>
          </div>

          <div className={`${styles.pricingCard} ${styles.pricingCardPro}`}>
            <div className={styles.pricingPopularBadge}>POPULAR</div>

            <div className={styles.pricingCardHeader}>
              <h3 className={`${styles.pricingPlanName} ${styles.pricingPlanNamePro}`}>Pro</h3>
              <div className={`${styles.pricingPrice} ${styles.pricingPricePro}`}>
                $19<span className={styles.pricingPriceUnit}>/mo</span>
              </div>
              <p className={`${styles.pricingDescription} ${styles.pricingDescriptionPro}`}>
                For power users and prompt engineers.
              </p>
            </div>

            <ul className={styles.pricingFeatureList}>
              {proFeatures.map((feature) => (
                <li key={feature} className={styles.pricingFeatureItem}>
                  <span className={`material-symbols-outlined ${styles.pricingCheckIconPro}`}>
                    check_circle
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/download"
              className={`${styles.pricingButton} ${styles.pricingButtonPrimary}`}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.testimonialContent}>
        <div className={styles.testimonialCard}>
          <div className={styles.testimonialStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                star
              </span>
            ))}
          </div>

          <blockquote className={styles.testimonialQuote}>
            &quot;I used to spend hours refining prompts in ChatGPT. With Eloquio, I just ramble
            my intent for 30 seconds, and it generates the{" "}
            <span className={styles.testimonialQuoteAccent}>perfect structured prompt</span>{" "}
            instantly. It&apos;s magic.&quot;
          </blockquote>

          <div className={styles.testimonialAuthor}>
            <div
              className={styles.testimonialAvatar}
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeWpMlhtYjitSfLGIxQq3Q_A7IN4WCzGSDwBa_Yyahe_q9kKiaF8lb7t3tE3pFU6VphI3nH1vPLdMa5YBkP4rrYkbQZLIrohHUoMEaV5GzJ85wPMa4HTEj1wrS4h1nPz2S5mJcCkOoqcL_vtL9h5RyvqLK6hA1FY5iimmHPsbOa6rWLR7COq1U-LuVRgkgcB3fmiJkgWRYW_djLdm6YFzNnL9boox4TqObkyM9PRAn_uEnZkoJIrmrfDO4_jEu3bpMp5MPXREu63Q')"
              }}
            />
            <div className={styles.testimonialAuthorInfo}>
              <div className={styles.testimonialAuthorName}>Alex Chen</div>
              <div className={styles.testimonialAuthorTitle}>Senior Product Manager @ TechFlow</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.finalCtaDottedOverlay} />

      <div className={styles.finalCtaContent}>
        <h2 className={styles.finalCtaTitle}>
          Ready to speak
          <br />
          <span className={styles.finalCtaTitleAccent}>your mind?</span>
        </h2>

        <p className={styles.finalCtaSubtitle}>
          Join 10,000+ engineers and writers who have switched from typing to prompting.
        </p>

        <Link to="/download" className={styles.finalCtaButton}>
          Download for Mac & Windows
        </Link>

        <p className={styles.finalCtaNote}>
          Free forever for personal use. No credit card required.
        </p>
      </div>
    </section>
  );
}
