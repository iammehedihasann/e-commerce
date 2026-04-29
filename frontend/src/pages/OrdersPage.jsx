import React, { useEffect, useState } from "react";
import { fetchOrders } from "../services/orderService.js";

function OrdersPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    (async () => {
      try {
        const data = await fetchOrders();
        setOrders(data ?? []);
      } catch {
        setError("Unable to load your orders right now.");
      }
    })();
  }, [user?.id]);

  if (!user?.id) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Orders</h1>
        <p className="text-gray-600">Sign in to view your order history.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Orders</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-600 mt-1">
          {user.role === "ADMIN" ? "All customer orders" : "Your recent orders"}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white p-5 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">
                    Order #{o.orderNumber}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-700 font-semibold">৳{o.total}</div>
                  <div className="text-sm text-gray-600 capitalize">{o.status}</div>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-700">
                {o.items.slice(0, 3).map((it) => (
                  <span key={it.id} className="mr-3">
                    {it.title} × {it.quantity}
                  </span>
                ))}
                {o.items.length > 3 ? <span>+ {o.items.length - 3} more</span> : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;

