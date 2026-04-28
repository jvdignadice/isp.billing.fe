import { useState } from "react";
import { env } from "@/config/env";
import { LoginModal } from "@/features/auth/components/login-modal";
import { HealthCard } from "@/features/health/components/health-card";

export function DashboardPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
          <button className="btn btn--ghost" type="button" onClick={() => setIsLoginOpen(true)}>
            Sign In
          </button>
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
                onClick={() => setIsLoginOpen(true)}
              >
                Launch Login
              </button>
              <p className="hero-copy__api">API target: {env.VITE_API_BASE_URL}</p>
            </div>
          </article>

          <aside className="hero-side">
            <HealthCard />
          </aside>
        </section>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
