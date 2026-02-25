import {
  HeroSection,
  WorksEverywhereSection,
  TypingTrapSection,
  VideoSection,
  SecuritySection,
  SpeedSection,
  ToneSwitchingSection,
  PricingSection,
  TestimonialSection,
  FinalCtaSection,
} from "../components/landing-sections";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import styles from "../styles/page.module.css";

function HomePage() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <HeroSection />
        <WorksEverywhereSection />
        <TypingTrapSection />
        <VideoSection />
        <SecuritySection />
        <SpeedSection />
        <ToneSwitchingSection />
        <PricingSection />
        <TestimonialSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default HomePage;
