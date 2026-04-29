import React from 'react';

function OrderConfirmation({ order, onClose, onContinueShopping }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600">Thank you for your order. We'll start preparing it right away.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Order Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium text-emerald-600">৳{order.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-orange-600 capitalize">{order.status}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Delivery Information</h3>
            <div className="text-sm text-gray-600">
              <p><strong>{order.customer.firstName} {order.customer.lastName}</strong></p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.postalCode}</p>
              <p>Phone: {order.customer.phone}</p>
              <p>Email: {order.customer.email}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-2 border rounded">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-cover rounded"
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/40/40?random=${item.id}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.title}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ৳{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• We'll send you a confirmation email shortly</li>
              <li>• Our team will prepare your order</li>
              <li>• You'll receive a call when your order is ready for delivery</li>
              <li>• Expected delivery time: 30-60 minutes</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onContinueShopping}
              className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded font-medium hover:bg-emerald-700 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
