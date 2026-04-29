import { prisma } from "../../config/prisma.js";
import { HttpError } from "../../utils/httpError.js";
import { centsToAmount, productToResponse } from "../../utils/money.js";

function formatCart(items) {
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0
  );
  const deliveryFeeCents = subtotalCents > 50000 || subtotalCents === 0 ? 0 : 5000;

  return {
    items: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: productToResponse(item.product),
      lineTotal: centsToAmount(item.product.priceCents * item.quantity)
    })),
    totals: {
      subtotal: centsToAmount(subtotalCents),
      deliveryFee: centsToAmount(deliveryFeeCents),
      total: centsToAmount(subtotalCents + deliveryFeeCents),
      currency: "BDT"
    }
  };
}

export async function getCart(userId) {
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "asc" }
  });

  return formatCart(items);
}

export async function upsertCartItem(userId, { productId, quantity }) {
  const product = await prisma.product.findFirst({
    where: { id: productId, isActive: true }
  });

  if (!product || product.stock < quantity) {
    throw new HttpError(400, "Product is unavailable");
  }

  await prisma.cartItem.upsert({
    where: { userId_productId: { userId, productId } },
    update: { quantity: { increment: quantity } },
    create: { userId, productId, quantity }
  });

  return getCart(userId);
}

export async function updateCartItem(userId, productId, quantity) {
  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({ where: { userId, productId } });
    return getCart(userId);
  }

  await prisma.cartItem.update({
    where: { userId_productId: { userId, productId } },
    data: { quantity }
  });

  return getCart(userId);
}

export async function removeCartItem(userId, productId) {
  await prisma.cartItem.deleteMany({ where: { userId, productId } });
  return getCart(userId);
}

export async function clearCart(userId) {
  await prisma.cartItem.deleteMany({ where: { userId } });
  return getCart(userId);
}
