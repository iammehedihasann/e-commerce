import { z } from "zod";

const password = z.string().min(8, "Password must be at least 8 characters");

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.string().trim().email().toLowerCase(),
    password,
    phone: z.string().trim().optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email().toLowerCase(),
    password
  })
});
