import type { ReactNode } from "react";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import styles from "../styles/page.module.css";

type PageLayoutProps = {
  children: ReactNode;
  mainClassName?: string;
};

export function PageLayout({ children, mainClassName }: PageLayoutProps) {
  const mainClasses = [styles.main, mainClassName].filter(Boolean).join(" ");

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={mainClasses} style={{ padding: "96px 24px" }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export default PageLayout;
