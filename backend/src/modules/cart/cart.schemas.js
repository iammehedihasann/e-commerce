import { z } from "zod";

export const cartItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1),
    quantity: z.coerce.number().int().min(1).max(99).default(1)
  })
});

export const cartItemQuantitySchema = z.object({
  body: z.object({
    quantity: z.coerce.number().int().min(0).max(99)
  })
});

export const cartItemIdSchema = z.object({
  params: z.object({
    productId: z.string().min(1)
  })
});
