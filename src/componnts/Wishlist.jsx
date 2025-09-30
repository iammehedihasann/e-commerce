import React from 'react';

function Wishlist({ wishlist, onRemove, onAddToCart }) {
  if (wishlist.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Wishlist</h3>
        <div className="text-center py-8 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p>Your wishlist is empty</p>
          <p className="text-sm">Add some products to your wishlist!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Wishlist ({wishlist.length} items)</h3>
      
      <div className="space-y-4">
        {wishlist.map((item) => (
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
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xs">
                      {i < Math.floor(item.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 text-xs ml-2">
                  {item.rating} ({item.reviews})
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-emerald-600 mb-2">
                ৳{item.price}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onAddToCart(item)}
                  className="bg-emerald-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-emerald-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
