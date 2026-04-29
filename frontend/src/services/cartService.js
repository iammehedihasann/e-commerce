import { api } from "../lib/api";

function normalizeCart(cartResponse) {
  return cartResponse.items.map((item) => ({
    ...item.product,
    quantity: item.quantity,
    lineTotal: item.lineTotal
  }));
}

export async function fetchCart() {
  const { data } = await api.get("/cart");
  return normalizeCart(data);
}

export async function addCartItem(productId, quantity = 1) {
  const { data } = await api.post("/cart/items", { productId, quantity });
  return normalizeCart(data);
}

export async function updateCartItem(productId, quantity) {
  const { data } = await api.patch(`/cart/items/${productId}`, { quantity });
  return normalizeCart(data);
}

export async function removeCartItem(productId) {
  const { data } = await api.delete(`/cart/items/${productId}`);
  return normalizeCart(data);
}

export async function clearCartItems() {
  const { data } = await api.delete("/cart");
  return normalizeCart(data);
}
