// Utility function to get product images by category and product number
export const getProductImage = (category, productNumber) => {
  const paddedNumber = productNumber.toString().padStart(3, '0');
  return new URL(`../assets/image/Glocery/productList${paddedNumber}.webp`, import.meta.url).href;
};

// Category-based image mapping
export const categoryImages = {
  'Fruits': {
    startIndex: 1,
    endIndex: 5,
    getImage: (index) => getProductImage('Fruits', index)
  },
  'Vegetables': {
    startIndex: 6,
    endIndex: 10,
    getImage: (index) => getProductImage('Vegetables', index)
  },
  'Dairy & Eggs': {
    startIndex: 11,
    endIndex: 14,
    getImage: (index) => getProductImage('Dairy & Eggs', index)
  },
  'Meat & Seafood': {
    startIndex: 15,
    endIndex: 17,
    getImage: (index) => getProductImage('Meat & Seafood', index)
  },
  'Grains & Cereals': {
    startIndex: 18,
    endIndex: 20,
    getImage: (index) => getProductImage('Grains & Cereals', index)
  },
  'Spices & Condiments': {
    startIndex: 21,
    endIndex: 23,
    getImage: (index) => getProductImage('Spices & Condiments', index)
  },
  'Beverages': {
    startIndex: 24,
    endIndex: 25,
    getImage: (index) => getProductImage('Beverages', index)
  },
  'Snacks': {
    startIndex: 26,
    endIndex: 27,
    getImage: (index) => getProductImage('Snacks', index)
  }
};

// Get image by product ID
export const getImageByProductId = (productId) => {
  return getProductImage('', productId);
};
