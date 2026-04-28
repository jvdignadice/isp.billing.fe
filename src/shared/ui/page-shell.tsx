import { PropsWithChildren } from "react";

interface PageShellProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <main className="page-shell">
      <header className="page-shell__header">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <section>{children}</section>
    </main>
  );
}

