import React, { useMemo } from "react";
import ProductGrid from "../componnts/ProductGrid.jsx";

function computeOffers(products) {
  const discounts = [0.08, 0.12, 0.15, 0.18, 0.22, 0.25, 0.3];
  return products.slice(0, 12).map((p, idx) => {
    const discount = discounts[idx % discounts.length];
    const discountedPrice = Math.max(1, p.price * (1 - discount));
    return {
      ...p,
      _offer: {
        discountPercent: Math.round(discount * 100),
        originalPrice: p.price,
        discountedPrice
      },
      // Keep ProductCard compatible: it reads product.price and product.inStock.
      price: discountedPrice
    };
  });
}

function OffersPage({ products, onAdd, onAddToWishlist, wishlist }) {
  const offers = useMemo(() => computeOffers(products), [products]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Today’s Offers</h1>
        <p className="text-sm text-gray-600 mt-1">Limited-time discounts on selected grocery essentials.</p>
      </div>

      <ProductGrid products={offers} onAdd={onAdd} onAddToWishlist={onAddToWishlist} wishlist={wishlist} />

      <div className="mt-6 text-sm text-gray-500">
        Offer pricing is applied at checkout time by the backend based on products and stock.
      </div>
    </div>
  );
}

export default OffersPage;
