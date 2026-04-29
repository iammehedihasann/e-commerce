import { prisma } from "../../config/prisma.js";
import { HttpError, notFound } from "../../utils/httpError.js";
import { centsToAmount } from "../../utils/money.js";
import { createOrderNumber } from "../../utils/orderNumber.js";

const paymentMap = {
  cash: "CASH",
  card: "CARD",
  mobile: "MOBILE"
};

function deliveryFeeFor(subtotalCents) {
  return subtotalCents > 50000 ? 0 : 5000;
}

function formatOrder(order) {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status.toLowerCase(),
    createdAt: order.createdAt,
    customer: {
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      postalCode: order.postalCode
    },
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      title: item.title,
      quantity: item.quantity,
      price: centsToAmount(item.unitPriceCents),
      image: item.imageUrl,
      lineTotal: centsToAmount(item.totalPriceCents)
    })),
    subtotal: centsToAmount(order.subtotalCents),
    deliveryFee: centsToAmount(order.deliveryFeeCents),
    total: centsToAmount(order.totalCents),
    currency: order.currency
  };
}

export async function createCheckoutOrder(input, userId) {
  const requestedIds = input.items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: requestedIds }, isActive: true }
  });

  const productsById = new Map(products.map((product) => [product.id, product]));

  const orderItems = input.items.map((item) => {
    const product = productsById.get(item.productId);

    if (!product || product.stock < item.quantity) {
      throw new HttpError(400, "One or more products are unavailable");
    }

    return {
      productId: product.id,
      title: product.title,
      quantity: item.quantity,
      unitPriceCents: product.priceCents,
      totalPriceCents: product.priceCents * item.quantity,
      imageUrl: product.imageUrl
    };
  });

  const subtotalCents = orderItems.reduce((sum, item) => sum + item.totalPriceCents, 0);
  const deliveryFeeCents = deliveryFeeFor(subtotalCents);

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        orderNumber: createOrderNumber(),
        userId,
        email: input.customer.email,
        firstName: input.customer.firstName,
        lastName: input.customer.lastName,
        phone: input.customer.phone,
        address: input.customer.address,
        city: input.customer.city,
        postalCode: input.customer.postalCode,
        deliveryInstructions: input.deliveryInstructions,
        paymentMethod: paymentMap[input.paymentMethod],
        subtotalCents,
        deliveryFeeCents,
        totalCents: subtotalCents + deliveryFeeCents,
        items: { create: orderItems }
      },
      include: { items: true }
    });

    await Promise.all(
      orderItems.map((item) =>
        tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        })
      )
    );

    if (userId) {
      await tx.cartItem.deleteMany({ where: { userId } });
    }

    return createdOrder;
  });

  return formatOrder(order);
}

export async function listOrders(user) {
  const where = user.role === "ADMIN" ? {} : { userId: user.id };
  const orders = await prisma.order.findMany({
    where,
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });

  return { orders: orders.map(formatOrder) };
}

export async function getOrder(id, user) {
  const order = await prisma.order.findFirst({
    where: user.role === "ADMIN" ? { id } : { id, userId: user.id },
    include: { items: true }
  });

  if (!order) {
    throw notFound("Order not found");
  }

  return formatOrder(order);
}

export async function updateOrderStatus(id, status) {
  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: { items: true }
  });

  return formatOrder(order);
}
