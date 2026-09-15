import { useTranslation } from "react-i18next";

export function ConfirmDialog({
  title,
  body,
  onConfirm,
  onCancel,
}: {
  title: string;
  body: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div
        className="dialog"
        data-testid="confirm-delete"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="dialog__title" id="confirm-delete-title">
          {title}
        </h2>
        <p className="dialog__body">{body}</p>
        <div className="dialog__actions">
          <button type="button" className="btn btn--secondary" data-testid="confirm-no" onClick={onCancel}>
            {t("common.cancel")}
          </button>
          <button type="button" className="btn btn--danger" data-testid="confirm-yes" onClick={onConfirm}>
            {t("confirmDialog.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
