import { PropsWithChildren, useEffect, useId } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export function Modal({ isOpen, title, subtitle, onClose, children }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal__close-btn" type="button" onClick={onClose} aria-label="Close">
          x
        </button>
        <header className="modal__header">
          <h2 id={titleId}>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </header>
        <div>{children}</div>
      </section>
    </div>
  );
}

