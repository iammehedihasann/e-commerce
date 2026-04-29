import { api } from "../lib/api";

export async function fetchProducts(params = {}) {
  const { data } = await api.get("/products", { params });
  return data.products;
}

export async function fetchProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data.product;
}
