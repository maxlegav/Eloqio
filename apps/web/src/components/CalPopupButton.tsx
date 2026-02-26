import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./cal-popup-button.module.css";

function CalModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <span className="material-symbols-outlined">close</span>
        </button>
        <iframe
          src="https://cal.com/eloqio/presentation-eloqio?embed=true"
          className={styles.iframe}
          title="Book a Call with Eloquio"
        />
      </div>
    </div>
  );
}

export function CalPopupButton({
  className,
  children,
  onBeforeOpen,
}: {
  className?: string;
  children: React.ReactNode;
  onBeforeOpen?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    onBeforeOpen?.();
    setIsOpen(true);
  };

  return (
    <>
      <button className={className} onClick={handleClick}>
        {children}
      </button>
      {isOpen && createPortal(
        <CalModal onClose={() => setIsOpen(false)} />,
        document.body
      )}
    </>
  );
}

export default CalPopupButton;
