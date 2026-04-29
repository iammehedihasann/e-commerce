import { api } from "../lib/api";

export async function fetchWishlist() {
  const { data } = await api.get("/wishlist");
  return data.items;
}

export async function addWishlistItem(productId) {
  const { data } = await api.post("/wishlist/items", { productId });
  return data.items;
}

export async function removeWishlistItem(productId) {
  const { data } = await api.delete(`/wishlist/items/${productId}`);
  return data.items;
}
