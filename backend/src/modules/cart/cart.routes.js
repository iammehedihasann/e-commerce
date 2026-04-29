import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { cartItemIdSchema, cartItemQuantitySchema, cartItemSchema } from "./cart.schemas.js";
import { clearCart, getCart, removeCartItem, updateCartItem, upsertCartItem } from "./cart.service.js";

export const cartRouter = Router();

cartRouter.use(requireAuth);

cartRouter.get("/", async (req, res, next) => {
  try {
    res.json(await getCart(req.user.id));
  } catch (error) {
    next(error);
  }
});

cartRouter.post("/items", validate(cartItemSchema), async (req, res, next) => {
  try {
    res.status(201).json(await upsertCartItem(req.user.id, req.body));
  } catch (error) {
    next(error);
  }
});

cartRouter.patch("/items/:productId", validate(cartItemIdSchema.merge(cartItemQuantitySchema)), async (req, res, next) => {
  try {
    res.json(await updateCartItem(req.user.id, req.params.productId, req.body.quantity));
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/items/:productId", validate(cartItemIdSchema), async (req, res, next) => {
  try {
    res.json(await removeCartItem(req.user.id, req.params.productId));
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/", async (req, res, next) => {
  try {
    res.json(await clearCart(req.user.id));
  } catch (error) {
    next(error);
  }
});
