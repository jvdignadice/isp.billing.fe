# isp.billing.fe

Scalable TypeScript frontend boilerplate that consumes `isp.billing.be`.

## Why This Stack

- `React + Vite + TypeScript`: fast build loop, strict typing, and modular code growth.
- `TanStack Query`: standardized server-state caching and retry behavior.
- `Axios + Zod`: typed API client and runtime contract validation.
- `Feature-based structure`: keeps business logic readable and maintainable at scale.
- `Dependency injection container`: services are injected through providers, not hard-wired in components.

## Architecture

```
src/
  app/               # Application bootstrapping, providers, router
  app/dependency-injection/ # Service container factories
  config/            # Environment and runtime config
  features/          # Business features (health now, billing modules next)
  pages/             # Page-level composition
  shared/            # Reusable client, UI shells, utility code
  styles/            # Global styles
```

## Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Important values:

- `VITE_API_BASE_URL` should point to your backend API base, default: `http://localhost:3000/api`
- Login uses `POST /auth/login` under the configured API base.
- Account creation uses `POST /auth/register` under the configured API base.

## Run

```bash
npm install
npm run dev
```

## Quality

```bash
npm run lint
npm run typecheck
npm run build
```

## Next Feature Modules To Add

- `features/customers`
- `features/invoices`
- `features/payments`
