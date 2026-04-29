import { ZodError } from "zod";
import { env, isProduction } from "../config/env.js";

export function notFoundHandler(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      issues: error.issues
    });
  }

  const statusCode = error.statusCode || 500;
  const payload = {
    message: statusCode === 500 && isProduction ? "Internal server error" : error.message,
    details: error.details
  };

  if (env.NODE_ENV === "development") {
    payload.stack = error.stack;
  }

  res.status(statusCode).json(payload);
}
