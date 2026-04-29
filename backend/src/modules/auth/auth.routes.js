import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { requireAuth } from "../../middleware/auth.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";
import { loginUser, registerUser } from "./auth.service.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
