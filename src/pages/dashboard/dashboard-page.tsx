import { useState } from "react";
import { env } from "@/config/env";
import { AuthModalMode, LoginModal } from "@/features/auth/components/login-modal";
import { LoginResult } from "@/features/auth/types/login.types";
import { HealthCard } from "@/features/health/components/health-card";

export function DashboardPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>("login");
  const [session, setSession] = useState<LoginResult | null>(null);

  const openAuthModal = (mode: AuthModalMode) => {
    setAuthModalMode(mode);
    setIsLoginOpen(true);
  };

  const handleLoginSuccess = (loginResult: LoginResult) => {
    setSession(loginResult);
  };

  const handleSignOut = () => {
    setSession(null);
  };

  return (
    <>
      <div className="landing">
        <header className="landing__header">
          <div className="brand">
            <span className="brand__badge">ISP</span>
            <div>
              <p className="brand__name">{env.VITE_APP_NAME}</p>
              <p className="brand__meta">Billing Intelligence Platform</p>
            </div>
          </div>
          {session ? (
            <button className="btn btn--ghost" type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <div className="landing__header-actions">
              <button className="btn btn--ghost" type="button" onClick={() => openAuthModal("register")}>
                Create Account
              </button>
              <button className="btn btn--ghost" type="button" onClick={() => openAuthModal("login")}>
                Sign In
              </button>
            </div>
          )}
        </header>

        <section className="landing__hero">
          <article className="hero-copy">
            <p className="hero-copy__eyebrow">Scalable Frontend Boilerplate</p>
            <h1>Operate Customer Billing With Speed, Clarity, and Control.</h1>
            <p>
              Designed for maintainability with feature-based architecture, typed API contracts, and
              reusable form foundations for every future business workflow.
            </p>
            <div className="hero-copy__actions">
              <button
                className="btn btn--primary"
                type="button"
                onClick={() => openAuthModal("login")}
                disabled={Boolean(session)}
              >
                {session ? "Session Active" : "Launch Login"}
              </button>
              <button
                className="btn btn--ghost"
                type="button"
                onClick={() => openAuthModal("register")}
                disabled={Boolean(session)}
              >
                Create Account
              </button>
            </div>
            {session ? (
              <div className="session-summary">
                <h3>Logged In Session</h3>
                <p>
                  <strong>{session.user.name}</strong> ({session.user.role})
                </p>
                <p>{session.user.email}</p>
                <p>
                  Token type: <code>{session.tokenType}</code> | Expires:{" "}
                  <code>{session.expiresIn}</code>
                </p>
              </div>
            ) : null}
          </article>

          <aside className="hero-side">
            <HealthCard />
          </aside>
        </section>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
      />
    </>
  );
}
