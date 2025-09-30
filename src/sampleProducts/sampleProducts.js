// Build products dynamically from all images in assets using Vite glob imports
const imageModules = import.meta.glob('../assets/image/Glocery/*.{webp,png,jpg,jpeg}', { eager: true });

const categoryOrder = [
  'Fruits',
  'Vegetables',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Grains & Cereals',
  'Spices & Condiments',
  'Beverages',
  'Snacks'
];

function deriveTitleFromFilename(filename) {
  const base = filename.replace(/^.*[\\\/]/, '').replace(/\.[^.]+$/, '');
  // productList001 -> Product 001
  const num = base.replace(/[^0-9]/g, '');
  return num ? `Product ${num}` : base.replace(/[-_]/g, ' ');
}

function priceFromIndex(index) {
  const bases = [60, 80, 100, 120, 150, 180, 200, 250, 300, 350, 400];
  return bases[index % bases.length];
}

const sortedEntries = Object.entries(imageModules)
  .map(([path, mod]) => ({ path, url: mod.default || mod }))
  .sort((a, b) => a.path.localeCompare(b.path));

const sampleProducts = sortedEntries.map((entry, idx) => {
  const id = idx + 1;
  const category = categoryOrder[idx % categoryOrder.length];
  return {
    id,
    title: deriveTitleFromFilename(entry.path),
    price: priceFromIndex(idx),
    category,
    image: entry.url,
    description: `High quality ${category.toLowerCase()} item`,
    inStock: true,
    rating: 4 + ((idx % 10) / 20),
    reviews: 50 + (idx % 200),
    weight: (idx % 2 === 0) ? '1kg' : '500g',
    origin: 'Local Supplier'
  };
});

export default sampleProducts;
