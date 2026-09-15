import { useState, type FormEvent } from "react";
import type { User, UserRole } from "../types";
import { Panel } from "./Panel";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES: UserRole[] = ["Admin", "Manager", "Viewer"];

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
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<UserRole>(user?.role ?? "Viewer");
  const [team, setTeam] = useState(user?.team ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    onSave({ name: name.trim(), email: email.trim(), role, team: team.trim() });
  }

  return (
    <Panel testId="user-form" onClose={onCancel} asForm onSubmit={handleSubmit} wide>
      <div className="drawer__header">
        <div>
          <p className="drawer__eyebrow">{user ? "Edit user" : "New user"}</p>
          <h2 className="drawer__title">{user ? user.name : "Add a user"}</h2>
        </div>
        <button type="button" className="icon-btn" aria-label="Close" onClick={onCancel}>
          ✕
        </button>
      </div>

      <div className="field">
        <label className="field__label field__label--required" htmlFor="user-name">
          Name
        </label>
        <input
          id="user-name"
          name="name"
          className="field__input"
          aria-invalid={error === "Name is required." ? "true" : undefined}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="field__label field__label--required" htmlFor="user-email">
          Email
        </label>
        <input
          id="user-email"
          name="email"
          className="field__input"
          aria-invalid={error === "Enter a valid email address." ? "true" : undefined}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && (
        <p className="field__error" data-testid="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="field">
        <label className="field__label" htmlFor="user-role">
          Role
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
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="user-team">
          Team
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
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" data-testid="user-save">
          {user ? "Save changes" : "Add user"}
        </button>
      </div>
    </Panel>
  );
}
