import { z } from "zod";

const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(99)
});

export const checkoutSchema = z.object({
  body: z.object({
    items: z.array(checkoutItemSchema).min(1),
    customer: z.object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      email: z.string().trim().email().toLowerCase(),
      phone: z.string().trim().min(1),
      address: z.string().trim().min(1),
      city: z.string().trim().min(1),
      postalCode: z.string().trim().min(1)
    }),
    paymentMethod: z.enum(["cash", "card", "mobile"]).default("cash"),
    deliveryInstructions: z.string().trim().optional()
  })
});

export const orderIdSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});

export const orderStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED"
    ])
  })
});
