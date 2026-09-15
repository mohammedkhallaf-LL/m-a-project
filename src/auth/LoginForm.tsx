import { useId, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "./AuthContext";

export function LoginForm() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = login(username.trim(), password);
    if (!ok) {
      setError(t("auth.error"));
      setPassword("");
    }
  }

  return (
    <div className="auth-screen">
      <div className="card auth-card">
        <div>
          <h1 className="card__title">{t("auth.appName")}</h1>
          <p className="card__subtitle">{t("auth.tagline")}</p>
        </div>
        <form data-testid="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="login-username">
              {t("auth.usernameLabel")}
            </label>
            <input
              id="login-username"
              className="field__input"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={error ? "true" : undefined}
              autoFocus
            />
          </div>
          <div className="field auth-card__field">
            <label className="field__label" htmlFor="login-password">
              {t("auth.passwordLabel")}
            </label>
            <input
              id="login-password"
              className="field__input"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error ? errorId : undefined}
            />
          </div>
          {error && (
            <p className="field__error" id={errorId} data-testid="login-error" role="alert">
              {error}
            </p>
          )}
          <div className="form-actions">
            <button type="submit" className="btn btn--primary" data-testid="login-submit">
              {t("auth.signIn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
