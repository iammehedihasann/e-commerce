import { prisma } from "../../config/prisma.js";
import { productToResponse } from "../../utils/money.js";

export async function getWishlist(userId) {
  const items = await prisma.wishlistItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "desc" }
  });

  return {
    items: items.map((item) => productToResponse(item.product))
  };
}

export async function addWishlistItem(userId, productId) {
  await prisma.wishlistItem.upsert({
    where: { userId_productId: { userId, productId } },
    update: {},
    create: { userId, productId }
  });

  return getWishlist(userId);
}

export async function removeWishlistItem(userId, productId) {
  await prisma.wishlistItem.deleteMany({ where: { userId, productId } });
  return getWishlist(userId);
}
