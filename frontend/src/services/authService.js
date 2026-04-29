import { api } from "../lib/api";

export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function fetchMe() {
  const { data } = await api.get("/auth/me");
  return data.user;
}
