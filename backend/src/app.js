import * as Sentry from "@sentry/node";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env, isProduction } from "./config/env.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { cartRouter } from "./modules/cart/cart.routes.js";
import { ordersRouter } from "./modules/orders/orders.routes.js";
import { productsRouter } from "./modules/products/products.routes.js";
import { wishlistRouter } from "./modules/wishlist/wishlist.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

if (env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    tracesSampleRate: isProduction ? 0.1 : 1
  });
}

export const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan(isProduction ? "combined" : "dev"));
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false
  })
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "grocery-commerce-api" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/admin", adminRouter);

app.use(notFoundHandler);
app.use(errorHandler);
