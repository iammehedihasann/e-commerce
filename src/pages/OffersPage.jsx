import React from "react";
import ProductCard from "../componnts/ProductCard.jsx";

function OffersPage({ products, onAdd, onAddToWishlist, wishlist }) {
  const offerItems = products.slice(0, 12).map((p, i) => {
    const discount = (i % 4 === 0) ? 25 : (i % 3 === 0) ? 20 : 15;
    const original = p.price;
    const discounted = Math.max(10, Math.round(original * (1 - discount / 100)));
    return { ...p, price: discounted, _discount: discount, _original: original };
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Today’s Best Offers</h1>
        <p className="text-gray-600">Exclusive discounts on your favorite groceries.</p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {offerItems.length} deals</div>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-gray-600">Sort by:</span>
          <button className="px-2 py-1 border rounded hover:bg-gray-50">Popularity</button>
          <button className="px-2 py-1 border rounded hover:bg-gray-50">Price</button>
          <button className="px-2 py-1 border rounded hover:bg-gray-50">Discount</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {offerItems.map((p) => (
          <div key={p.id} className="relative">
            {p._discount && (
              <span className="absolute z-10 top-2 left-2 bg-rose-600 text-white text-xs px-2 py-1 rounded">Save {p._discount}%</span>
            )}
            <ProductCard
              product={p}
              onAdd={onAdd}
              onClick={() => {}}
              onAddToWishlist={onAddToWishlist}
              isInWishlist={wishlist.some(w => w.id === p.id)}
            />
            {typeof p._original === 'number' && p._original > p.price && (
              <div className="px-4 pb-3 -mt-5">
                <div className="flex items-center justify-between   text-xs text-gray-600">
                  <span>
                    <span className="line-through">৳{p._original}</span>
                    <span className="ml-2  text-emerald-600 font-semibold">You save ৳{p._original - p.price}</span>
                  </span>
                  <span className="text-rose-600 font-medium">-{p._discount}%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersPage;


