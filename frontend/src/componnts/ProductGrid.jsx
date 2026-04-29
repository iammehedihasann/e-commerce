import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

function ProductGrid({ products, onAdd, onAddToWishlist, wishlist }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No products found</div>
        <div className="text-gray-500 text-sm">Try adjusting your search or filter</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
            onClick={() => handleProductClick(product)}
            onAddToWishlist={onAddToWishlist}
            isInWishlist={wishlist.some(item => item.id === product.id)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAdd={onAdd}
        />
      )}
    </>
  );
}

export default ProductGrid;
