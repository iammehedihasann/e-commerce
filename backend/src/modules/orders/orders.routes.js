import { Router } from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import { optionalAuth } from "../../middleware/optionalAuth.js";
import { validate } from "../../middleware/validate.js";
import { checkoutSchema, orderIdSchema, orderStatusSchema } from "./orders.schemas.js";
import { createCheckoutOrder, getOrder, listOrders, updateOrderStatus } from "./orders.service.js";

export const ordersRouter = Router();

ordersRouter.post("/checkout", optionalAuth, validate(checkoutSchema), async (req, res, next) => {
  try {
    res.status(201).json({ order: await createCheckoutOrder(req.body, req.user?.id) });
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/", requireAuth, async (req, res, next) => {
  try {
    res.json(await listOrders(req.user));
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:id", requireAuth, validate(orderIdSchema), async (req, res, next) => {
  try {
    res.json({ order: await getOrder(req.params.id, req.user) });
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:id/status", requireAuth, requireAdmin, validate(orderIdSchema.merge(orderStatusSchema)), async (req, res, next) => {
  try {
    res.json({ order: await updateOrderStatus(req.params.id, req.body.status) });
  } catch (error) {
    next(error);
  }
});
