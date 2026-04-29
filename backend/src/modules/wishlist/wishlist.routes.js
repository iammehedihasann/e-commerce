import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { wishlistItemIdSchema, wishlistItemSchema } from "./wishlist.schemas.js";
import { addWishlistItem, getWishlist, removeWishlistItem } from "./wishlist.service.js";

export const wishlistRouter = Router();

wishlistRouter.use(requireAuth);

wishlistRouter.get("/", async (req, res, next) => {
  try {
    res.json(await getWishlist(req.user.id));
  } catch (error) {
    next(error);
  }
});

wishlistRouter.post("/items", validate(wishlistItemSchema), async (req, res, next) => {
  try {
    res.status(201).json(await addWishlistItem(req.user.id, req.body.productId));
  } catch (error) {
    next(error);
  }
});

wishlistRouter.delete("/items/:productId", validate(wishlistItemIdSchema), async (req, res, next) => {
  try {
    res.json(await removeWishlistItem(req.user.id, req.params.productId));
  } catch (error) {
    next(error);
  }
});
