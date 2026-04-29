# Security Notes

- Passwords are hashed with bcrypt.
- JWT secrets are read from environment variables and must be unique per environment.
- Helmet, CORS, JSON body limits, and API rate limiting are enabled in Express.
- Checkout totals are calculated from database prices on the backend.
- Admin routes require both authentication and the `ADMIN` role.
- `.env` files are ignored by git; use the `.env.example` files as templates.

## Production Checklist

- Use long random `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` values.
- Restrict `FRONTEND_URL` to the deployed Vercel domain.
- Enable Supabase SSL connection strings.
- Rotate the seeded admin password after first login.
- Configure Sentry alerts for API errors.
