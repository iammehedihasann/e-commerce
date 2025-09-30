import React from "react";
import CategoryFilter from "../componnts/CategoryFilter.jsx";
import ProductGrid from "../componnts/ProductGrid.jsx";

function CategoriesPage({
  categories,
  activeCategory,
  setActiveCategory,
  filteredProducts,
  onAdd,
  onAddToWishlist,
  wishlist
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-64">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-3">Browse Categories</h4>
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            setActive={setActiveCategory}
          />
        </div>
      </aside>

      <section className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {activeCategory ? activeCategory : 'All Products'}
          </h2>
          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} results
          </div>
        </div>

        <ProductGrid 
          products={filteredProducts} 
          onAdd={onAdd} 
          onAddToWishlist={onAddToWishlist}
          wishlist={wishlist}
        />
      </section>
    </div>
  );
}

export default CategoriesPage;


