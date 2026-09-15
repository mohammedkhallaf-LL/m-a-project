import { useId, useState, type FormEvent } from "react";
import { useAuth } from "./AuthContext";

export function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = login(username.trim(), password);
    if (!ok) {
      setError("Incorrect username or password.");
      setPassword("");
    }
  }

  return (
    <div className="auth-screen">
      <div className="card auth-card">
        <div>
          <h1 className="card__title">PulseBoard</h1>
          <p className="card__subtitle">Sign in to continue.</p>
        </div>
        <form data-testid="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="login-username">
              Username
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
              Password
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
