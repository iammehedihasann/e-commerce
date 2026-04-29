import React from 'react';

function ProductCard({ product, onAdd, onClick, onAddToWishlist, isInWishlist }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAdd(product);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    onAddToWishlist(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative bg-gray-100 rounded-t-lg overflow-hidden">
        <div className="pt-[62.5%]"></div>
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = `https://picsum.photos/300/200?random=${product.id}`;
          }}
        />
        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
        >
          <svg
            className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center ml-2">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-gray-600 text-xs ml-1">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-emerald-600 font-bold text-lg">
            ৳{product.price}
          </div>
          <div className="text-gray-500 text-xs">
            {product.weight}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 text-xs">
            {product.reviews} reviews
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-emerald-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
        
        {!product.inStock && (
          <div className="mt-2 text-red-500 text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
