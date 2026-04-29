import { Router } from "express";
import { prisma } from "../../config/prisma.js";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import { centsToAmount } from "../../utils/money.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

adminRouter.get("/dashboard", async (_req, res, next) => {
  try {
    const [users, products, orders, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalCents: true },
        where: { status: { not: "CANCELLED" } }
      })
    ]);

    res.json({
      metrics: {
        users,
        products,
        orders,
        revenue: centsToAmount(revenue._sum.totalCents ?? 0),
        currency: "BDT"
      }
    });
  } catch (error) {
    next(error);
  }
});
