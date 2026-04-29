import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
