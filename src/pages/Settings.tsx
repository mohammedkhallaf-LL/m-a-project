import { useTranslation } from "react-i18next";
import { usePanelMode, type PanelMode } from "../hooks/usePanelMode";

export function Settings() {
  const { t } = useTranslation();
  const { mode, setMode } = usePanelMode();

  return (
    <main className="page" data-testid="settings-page">
      <div className="card">
        <h2 className="card__title">{t("settings.title")}</h2>
        <p className="card__subtitle">{t("settings.subtitle")}</p>

        <fieldset
          style={{ border: "none", padding: 0, margin: "var(--space-6) 0 0" }}
          data-testid="panel-mode-setting"
        >
          <legend className="field__label" style={{ marginBottom: "var(--space-2)" }}>
            {t("settings.panelMode.legend")}
          </legend>
          <p className="field__helper" style={{ margin: "0 0 var(--space-3)" }}>
            {t("settings.panelMode.helper")}
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <PanelModeOption
              value="drawer"
              label={t("settings.panelMode.drawer")}
              description={t("settings.panelMode.drawerDescription")}
              current={mode}
              onSelect={setMode}
            />
            <PanelModeOption
              value="dialog"
              label={t("settings.panelMode.dialog")}
              description={t("settings.panelMode.dialogDescription")}
              current={mode}
              onSelect={setMode}
            />
          </div>
        </fieldset>
      </div>
    </main>
  );
}

function PanelModeOption({
  value,
  label,
  description,
  current,
  onSelect,
}: {
  value: PanelMode;
  label: string;
  description: string;
  current: PanelMode;
  onSelect: (mode: PanelMode) => void;
}) {
  const checked = current === value;
  return (
    <label
      className="field"
      style={{
        flex: 1,
        border: `1px solid ${checked ? "var(--color-brand)" : "var(--color-border-strong)"}`,
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-3)",
        cursor: "pointer",
        gap: "var(--space-1)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        <input
          type="radio"
          name="panel-mode"
          value={value}
          checked={checked}
          onChange={() => onSelect(value)}
          data-testid={`panel-mode-${value}`}
        />
        <span className="field__label">{label}</span>
      </span>
      <span className="field__helper">{description}</span>
    </label>
  );
}
