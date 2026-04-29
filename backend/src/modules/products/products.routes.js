import { Router } from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import {
  listProductsSchema,
  productIdSchema,
  productWriteSchema
} from "./products.schemas.js";
import { createProduct, getProduct, listProducts, updateProduct } from "./products.service.js";

export const productsRouter = Router();

productsRouter.get("/", validate(listProductsSchema), async (req, res, next) => {
  try {
    res.json(await listProducts(req.query));
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", validate(productIdSchema), async (req, res, next) => {
  try {
    res.json({ product: await getProduct(req.params.id) });
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", requireAuth, requireAdmin, validate(productWriteSchema), async (req, res, next) => {
  try {
    res.status(201).json({ product: await createProduct(req.body) });
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:id", requireAuth, requireAdmin, validate(productIdSchema.merge(productWriteSchema)), async (req, res, next) => {
  try {
    res.json({ product: await updateProduct(req.params.id, req.body) });
  } catch (error) {
    next(error);
  }
});
