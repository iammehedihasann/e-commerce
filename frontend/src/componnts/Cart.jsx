import React from 'react';

function Cart({ cart, onRemove, onUpdateQuantity, onClearCart, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemove(itemId);
    } else {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
        <div className="text-center py-8 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <p>Your cart is empty</p>
          <p className="text-sm">Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Shopping Cart ({cart.length} items)</h3>
        <button
          onClick={onClearCart}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Clear Cart
        </button>
      </div>
      
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
              onError={(e) => {
                e.target.src = `https://picsum.photos/64/64?random=${item.id}`;
              }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm text-gray-500">{item.weight}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <div className="font-medium text-emerald-600">
                ৳{item.price * item.quantity}
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-emerald-600">৳{total}</span>
        </div>
        <button 
          onClick={onCheckout}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
