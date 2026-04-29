import { prisma } from "../../config/prisma.js";
import { notFound } from "../../utils/httpError.js";
import { productToResponse } from "../../utils/money.js";

function amountToCents(amount) {
  return Math.round(Number(amount) * 100);
}

export async function listProducts({ category, search, page, limit }) {
  const where = {
    isActive: true,
    ...(category ? { category } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } }
          ]
        }
      : {})
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.product.count({ where })
  ]);

  return {
    products: products.map(productToResponse),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  };
}

export async function getProduct(id) {
  const product = await prisma.product.findFirst({
    where: { id, isActive: true }
  });

  if (!product) {
    throw notFound("Product not found");
  }

  return productToResponse(product);
}

export async function createProduct(input) {
  const product = await prisma.product.create({
    data: {
      ...input,
      priceCents: amountToCents(input.price)
    }
  });

  return productToResponse(product);
}

export async function updateProduct(id, input) {
  await getProduct(id);

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...input,
      priceCents: amountToCents(input.price)
    }
  });

  return productToResponse(product);
}
