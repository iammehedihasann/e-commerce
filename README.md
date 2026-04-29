# Grocery Commerce Platform

Production-oriented grocery e-commerce system using only free-tier friendly tools.

## Structure

```txt
project/
├── frontend/
├── backend/
├── docs/
└── README.md
```

## Stack

- Frontend: React, Vite, Tailwind CSS, Zustand, Axios, React Hook Form, Zod, React Hot Toast.
- Backend: Node.js, Express, Prisma, PostgreSQL via Supabase, JWT, bcrypt.
- Free services: Vercel, Render, Supabase, Cloudinary, Sentry, Google Analytics, GitHub Actions.

## Local Development

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`; the API runs on `http://localhost:5000`.

## Production Rules Implemented

- Backend owns checkout price calculation.
- Auth uses bcrypt and JWT.
- Admin endpoints require the `ADMIN` role.
- Environment variables are used for secrets and service URLs.
- CI runs lint, build, Prisma generation, and API tests.

See `docs/architecture.md`, `docs/security.md`, and `docs/deployment.md` for setup details.
