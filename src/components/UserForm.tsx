import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { userRoleLabel } from "../lib/labels";
import type { User, UserRole } from "../types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES: UserRole[] = ["Admin", "Manager", "Viewer"];

type FormError = "name" | "email" | null;

export interface UserFormValues {
  name: string;
  email: string;
  role: UserRole;
  team: string;
}

export function UserForm({
  user,
  onSave,
  onCancel,
}: {
  user: User | null;
  onSave: (values: UserFormValues) => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<UserRole>(user?.role ?? "Viewer");
  const [team, setTeam] = useState(user?.team ?? "");
  const [error, setError] = useState<FormError>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("name");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("email");
      return;
    }
    setError(null);
    onSave({ name: name.trim(), email: email.trim(), role, team: team.trim() });
  }

  return (
    <div className="drawer-overlay" onClick={onCancel}>
      <form
        className="drawer"
        data-testid="user-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="drawer__header">
          <div>
            <p className="drawer__eyebrow">{user ? t("userForm.editEyebrow") : t("userForm.newEyebrow")}</p>
            <h2 className="drawer__title">{user ? user.name : t("userForm.addTitle")}</h2>
          </div>
          <button type="button" className="icon-btn" aria-label={t("userForm.close")} onClick={onCancel}>
            ✕
          </button>
        </div>

        <div className="field">
          <label className="field__label field__label--required" htmlFor="user-name">
            {t("userForm.nameLabel")}
          </label>
          <input
            id="user-name"
            name="name"
            className="field__input"
            aria-invalid={error === "name" ? "true" : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field__label field__label--required" htmlFor="user-email">
            {t("userForm.emailLabel")}
          </label>
          <input
            id="user-email"
            name="email"
            className="field__input"
            aria-invalid={error === "email" ? "true" : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && (
          <p className="field__error" data-testid="form-error" role="alert">
            {error === "name" ? t("userForm.errorNameRequired") : t("userForm.errorEmailInvalid")}
          </p>
        )}

        <div className="field">
          <label className="field__label" htmlFor="user-role">
            {t("userForm.roleLabel")}
          </label>
          <select
            id="user-role"
            name="role"
            className="field__select"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {userRoleLabel(t, r)}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="user-team">
            {t("userForm.teamLabel")}
          </label>
          <input
            id="user-team"
            name="team"
            className="field__input"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn--secondary" data-testid="user-cancel" onClick={onCancel}>
            {t("common.cancel")}
          </button>
          <button type="submit" className="btn btn--primary" data-testid="user-save">
            {user ? t("userForm.saveEdit") : t("userForm.saveNew")}
          </button>
        </div>
      </form>
    </div>
  );
}
