import { z } from "zod";

export const wishlistItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1)
  })
});

export const wishlistItemIdSchema = z.object({
  params: z.object({
    productId: z.string().min(1)
  })
});
