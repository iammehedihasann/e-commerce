# Free Deployment Guide

## 1. Supabase

1. Create a free Supabase project.
2. Copy the PostgreSQL connection string.
3. Set it as `DATABASE_URL` in `backend/.env`.
4. Run:

```bash
cd backend
npm run prisma:deploy
npm run prisma:seed
```

## 2. Render Backend

1. Create a free Render web service from this GitHub repo.
2. Use `backend` as the root directory.
3. Set the build command to `npm ci && npm run prisma:generate && npm run prisma:deploy`.
4. Set the start command to `npm start`.
5. Add environment variables from `backend/.env.example`.

## 3. Vercel Frontend

1. Import the GitHub repo into Vercel.
2. Set the project root to `frontend`.
3. Add `VITE_API_URL=https://your-render-service.onrender.com/api/v1`.
4. Deploy.

## 4. Optional Free Services

- Cloudinary: add image credentials to the backend env when product image upload is implemented.
- Sentry: set `SENTRY_DSN` and `VITE_SENTRY_DSN`.
- Google Analytics: set `VITE_GA_MEASUREMENT_ID`.
