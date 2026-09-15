import type { ReactNode } from "react";
import { usePanelMode } from "../hooks/usePanelMode";

export function Panel({
  testId,
  onClose,
  ariaLabelledBy,
  wide,
  asForm,
  onSubmit,
  children,
}: {
  testId: string;
  onClose: () => void;
  ariaLabelledBy?: string;
  wide?: boolean;
  asForm?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  children: ReactNode;
}) {
  const { mode } = usePanelMode();

  if (mode === "dialog") {
    const dialogClassName = `dialog${wide ? " dialog--wide" : ""}`;
    const content = asForm ? (
      <form
        className={dialogClassName}
        data-testid={testId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
      </form>
    ) : (
      <div
        className={dialogClassName}
        data-testid={testId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    );

    return (
      <div className="dialog-overlay" onClick={onClose}>
        {content}
      </div>
    );
  }

  if (asForm) {
    return (
      <div className="drawer-overlay" onClick={onClose}>
        <form
          className="drawer"
          data-testid={testId}
          onClick={(e) => e.stopPropagation()}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer" data-testid={testId} role="dialog" aria-modal="true" aria-labelledby={ariaLabelledBy}>
        {children}
      </aside>
    </>
  );
}
