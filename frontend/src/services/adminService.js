import { api } from "../lib/api";

export async function fetchDashboardMetrics() {
  const { data } = await api.get("/admin/dashboard");
  return data.metrics;
}
