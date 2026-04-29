import { z } from "zod";

export const listProductsSchema = z.object({
  query: z.object({
    category: z.string().trim().optional(),
    search: z.string().trim().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(32)
  })
});

export const productIdSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});

export const productWriteSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1),
    slug: z.string().trim().min(1).regex(/^[a-z0-9-]+$/),
    description: z.string().trim().min(1),
    category: z.string().trim().min(1),
    price: z.coerce.number().positive(),
    imageUrl: z.string().url().optional(),
    weight: z.string().trim().optional(),
    origin: z.string().trim().optional(),
    stock: z.coerce.number().int().min(0).default(0),
    isActive: z.boolean().default(true)
  })
});
