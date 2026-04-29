import React, { useEffect, useState } from "react";
import { fetchDashboardMetrics } from "../services/adminService";

function AdminDashboard({ user }) {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role !== "ADMIN") return;

    fetchDashboardMetrics()
      .then(setMetrics)
      .catch(() => setError("Unable to load admin metrics."));
  }, [user]);

  if (user?.role !== "ADMIN") {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Admin access is required.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 text-sm">Live store metrics from the backend.</p>
      </div>

      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Users", metrics?.users ?? 0],
          ["Products", metrics?.products ?? 0],
          ["Orders", metrics?.orders ?? 0],
          ["Revenue", `৳${metrics?.revenue ?? 0}`]
        ].map(([label, value]) => (
          <div key={label} className="bg-white p-5 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
