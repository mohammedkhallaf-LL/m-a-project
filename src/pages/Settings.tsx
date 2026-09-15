import { usePanelMode, type PanelMode } from "../hooks/usePanelMode";

export function Settings() {
  const { mode, setMode } = usePanelMode();

  return (
    <main className="page" data-testid="settings-page">
      <div className="card">
        <h2 className="card__title">Settings</h2>
        <p className="card__subtitle">Preferences for how PulseBoard looks and behaves.</p>

        <fieldset
          style={{ border: "none", padding: 0, margin: "var(--space-6) 0 0" }}
          data-testid="panel-mode-setting"
        >
          <legend className="field__label" style={{ marginBottom: "var(--space-2)" }}>
            Panel style
          </legend>
          <p className="field__helper" style={{ margin: "0 0 var(--space-3)" }}>
            Choose how account details and the user form appear.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <PanelModeOption
              value="drawer"
              label="Drawer"
              description="Slides in from the right"
              current={mode}
              onSelect={setMode}
            />
            <PanelModeOption
              value="dialog"
              label="Dialog"
              description="Centered on screen"
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
