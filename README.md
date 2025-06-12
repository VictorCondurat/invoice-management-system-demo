# Invoice Management System

## Project Overview

Monorepo that shows a minimal invoice platform:

- **Backend** – NestJS 11, Prisma 6, PostgreSQL 15, Fastify adapter
- **Frontend** – React 19 (Vite 6), Redux Toolkit 2, React Query 5, Tailwind 3
- **Auth** – JWT + Passport, bcrypt hashing
- **Validation** – Zod on both client and server
- **Infrastructure** – Docker-Compose for the database, Prisma migrations + seed

## Prerequisites

- Node 18+
- npm 9 / pnpm / yarn (repo uses npm scripts)
- Docker & Docker-Compose

## Folder Structure (top-level)

```
root/
├── client              # Vite React app
├── server              # NestJS backend
└── docker-compose.yml
```

## Setup in Five Steps

1. `git clone <repo>` and `cd invoice-management-system`
2. `npm run install:all` – installs root + both workspaces
3. `cp server/env.example server/.env` – adjust secrets if needed
4. `cp client/env.example client/.env - ajust secrets if needed
5. `npm run docker:up` – spins up Postgres 15 on port 5432
6. `npm run db:setup` – Prisma generate → migrate (+ seed demo data)

## Development Workflow

```bash
npm run dev
```

- Fastify server on `http://localhost:3000`
- Vite dev server on `http://localhost:5173`

Hot-reload for both via `concurrently`.

## Demo Credentials

- **Email**: `demo@acme.com`
- **Password**: `password123`

## Key npm Scripts (root)

| Script | Description |
|--------|-------------|
| `dev` | hot-reload backend + frontend |
| `build` | production build for both workspaces |
| `db:setup` | Prisma generate → push schema → seed |
| `docker:up` | docker-compose up -d |
| `docker:down` | docker-compose down |

## Environment Variables

### server/.env

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | secret used to sign tokens |
| `JWT_EXPIRATION` | token TTL, default `7d` |
| `API_PORT` | backend port (default 3000) |
| `CLIENT_URL` | allowed CORS origin (dev `http://localhost:5173`) |
| `COOKIE_SECRET` | key for signed cookies |

### client/.env

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | backend base URL (dev `http://localhost:3000`) |

## REST API Summary

```
POST /auth/login      → { accessToken }
GET  /invoices        → list of invoices for authenticated user
GET  /invoices/:id    → single invoice
```
## License

MIT © 2025 Invoice Management System
