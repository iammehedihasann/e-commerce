# Architecture

This repository is now a monorepo with a React storefront and an Express API.

## Runtime

- Frontend: React + Vite + Tailwind CSS, deployed to Vercel free tier.
- Backend: Node.js + Express, deployed to Render free tier.
- Database: Supabase PostgreSQL free tier.
- ORM: Prisma.
- Auth: JWT access token plus bcrypt password hashing.
- Monitoring: Sentry free tier through `SENTRY_DSN`.
- Analytics: Google Analytics can be added through `VITE_GA_MEASUREMENT_ID`.

## Backend Boundaries

The backend owns product prices, stock, checkout totals, and order creation. The frontend may display an estimate, but `/api/v1/orders/checkout` recalculates all prices from PostgreSQL before writing the order.

## Main API Modules

- `auth`: register, login, current user.
- `products`: public catalog plus admin product writes.
- `cart`: authenticated server-side cart.
- `wishlist`: authenticated server-side wishlist.
- `orders`: checkout, order history, admin status updates.
- `admin`: dashboard metrics.

## Data Model

Prisma models include `User`, `Product`, `CartItem`, `WishlistItem`, `Order`, and `OrderItem`. Orders store a snapshot of titles and prices so historical receipts do not change when product data changes.
