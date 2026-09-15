/**
 * PulseBoard — starter shell.
 *
 * This is intentionally almost empty. Your job during the sprint is to turn
 * this into the dashboard and the Users CRUD page described in SPEC.md, using
 * the design in /design and the data in /public/data.json.
 *
 * Run `npm test` at any time to see how far you are from passing acceptance.
 */
import { AuthGate } from "./auth/AuthGate";
import { AuthProvider, useAuth } from "./auth/AuthContext";

function AppShell() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <main className="shell">
      {isAuthenticated && (
        <button type="button" className="btn btn--ghost" data-testid="logout-button" onClick={logout}>
          Sign out
        </button>
      )}
      <h1>PulseBoard</h1>
      <p>
        Nothing here yet. Read <code>SPEC.md</code>, look at <code>design/</code>, then build.
      </p>
      <p>
        Data lives at <a href="/data.json">/data.json</a>. Types are in <code>src/types.ts</code>.
      </p>
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <AppShell />
      </AuthGate>
    </AuthProvider>
  );
}
