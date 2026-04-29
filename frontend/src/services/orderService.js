import { api } from "../lib/api";

export async function createOrder({ cart, customer, paymentMethod, deliveryInstructions }) {
  const payload = {
    items: cart.map((item) => ({
      productId: String(item.id),
      quantity: item.quantity
    })),
    customer,
    paymentMethod,
    deliveryInstructions
  };

  const { data } = await api.post("/orders/checkout", payload);
  return data.order;
}

export async function fetchOrders() {
  const { data } = await api.get("/orders");
  return data.orders;
}
