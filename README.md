# isp.billing.fe

Scalable TypeScript frontend boilerplate that consumes `isp.billing.be`.

## Why This Stack

- `React + Vite + TypeScript`: fast build loop, strict typing, and modular code growth.
- `TanStack Query`: standardized server-state caching and retry behavior.
- `Axios + Zod`: typed API client and runtime contract validation.
- `Feature-based structure`: keeps business logic readable and maintainable at scale.

## Architecture

```
src/
  app/               # Application bootstrapping, providers, router
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

