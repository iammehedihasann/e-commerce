function createProductArtwork(title, accent, emoji) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" rx="32" fill="url(#bg)" />
      <circle cx="544" cy="96" r="72" fill="rgba(255,255,255,0.14)" />
      <circle cx="112" cy="376" r="84" fill="rgba(255,255,255,0.1)" />
      <text x="48" y="132" font-size="88">${emoji}</text>
      <text x="48" y="234" fill="#ffffff" font-size="38" font-weight="700" font-family="Arial, sans-serif">${title}</text>
      <text x="48" y="286" fill="rgba(255,255,255,0.82)" font-size="24" font-family="Arial, sans-serif">Fresh grocery essential</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const sampleProducts = [
  {
    id: "fallback-apple",
    title: "Premium Red Apple",
    slug: "premium-red-apple",
    price: 180,
    category: "Fruits",
    image: createProductArtwork("Premium Red Apple", "#dc2626", "🍎"),
    description: "Crisp imported red apples selected for everyday snacking and juice.",
    inStock: true,
    stock: 42,
    rating: 4.8,
    reviews: 124,
    weight: "1kg",
    origin: "Rajshahi",
    currency: "BDT"
  },
  {
    id: "fallback-banana",
    title: "Sweet Banana Bunch",
    slug: "sweet-banana-bunch",
    price: 95,
    category: "Fruits",
    image: createProductArtwork("Sweet Banana Bunch", "#ca8a04", "🍌"),
    description: "Naturally sweet bananas ideal for breakfast, smoothies, and quick snacks.",
    inStock: true,
    stock: 60,
    rating: 4.6,
    reviews: 98,
    weight: "12 pcs",
    origin: "Narsingdi",
    currency: "BDT"
  },
  {
    id: "fallback-tomato",
    title: "Farm Fresh Tomato",
    slug: "farm-fresh-tomato",
    price: 85,
    category: "Vegetables",
    image: createProductArtwork("Farm Fresh Tomato", "#ef4444", "🍅"),
    description: "Bright ripe tomatoes for salads, curries, and everyday cooking.",
    inStock: true,
    stock: 50,
    rating: 4.5,
    reviews: 75,
    weight: "1kg",
    origin: "Bogura",
    currency: "BDT"
  },
  {
    id: "fallback-spinach",
    title: "Organic Spinach",
    slug: "organic-spinach",
    price: 60,
    category: "Vegetables",
    image: createProductArtwork("Organic Spinach", "#16a34a", "🥬"),
    description: "Tender spinach leaves washed and packed for fast healthy meals.",
    inStock: true,
    stock: 35,
    rating: 4.4,
    reviews: 54,
    weight: "500g",
    origin: "Jessore",
    currency: "BDT"
  },
  {
    id: "fallback-milk",
    title: "Full Cream Milk",
    slug: "full-cream-milk",
    price: 110,
    category: "Dairy & Eggs",
    image: createProductArtwork("Full Cream Milk", "#2563eb", "🥛"),
    description: "Pasteurized full cream milk with rich taste for tea, coffee, and desserts.",
    inStock: true,
    stock: 80,
    rating: 4.7,
    reviews: 143,
    weight: "1L",
    origin: "Savar",
    currency: "BDT"
  },
  {
    id: "fallback-eggs",
    title: "Brown Farm Eggs",
    slug: "brown-farm-eggs",
    price: 145,
    category: "Dairy & Eggs",
    image: createProductArtwork("Brown Farm Eggs", "#92400e", "🥚"),
    description: "Fresh brown eggs from local farms, packed carefully for safe delivery.",
    inStock: true,
    stock: 70,
    rating: 4.8,
    reviews: 165,
    weight: "12 pcs",
    origin: "Gazipur",
    currency: "BDT"
  },
  {
    id: "fallback-chicken",
    title: "Dressed Broiler Chicken",
    slug: "dressed-broiler-chicken",
    price: 320,
    category: "Meat & Seafood",
    image: createProductArtwork("Dressed Broiler Chicken", "#b91c1c", "🍗"),
    description: "Cleaned and chilled chicken prepared for curry, roast, and grilling.",
    inStock: true,
    stock: 24,
    rating: 4.5,
    reviews: 69,
    weight: "1kg",
    origin: "Dhaka",
    currency: "BDT"
  },
  {
    id: "fallback-fish",
    title: "Fresh Rui Fish Cut",
    slug: "fresh-rui-fish-cut",
    price: 420,
    category: "Meat & Seafood",
    image: createProductArtwork("Fresh Rui Fish Cut", "#0f766e", "🐟"),
    description: "Popular Bengali fish cut and cleaned on order for home delivery.",
    inStock: true,
    stock: 18,
    rating: 4.7,
    reviews: 88,
    weight: "1kg",
    origin: "Mymensingh",
    currency: "BDT"
  },
  {
    id: "fallback-rice",
    title: "Miniket Rice",
    slug: "miniket-rice",
    price: 760,
    category: "Grains & Cereals",
    image: createProductArtwork("Miniket Rice", "#a16207", "🌾"),
    description: "Premium miniket rice with fluffy texture, suitable for daily family meals.",
    inStock: true,
    stock: 40,
    rating: 4.9,
    reviews: 201,
    weight: "5kg",
    origin: "Naogaon",
    currency: "BDT"
  },
  {
    id: "fallback-lentils",
    title: "Masoor Dal",
    slug: "masoor-dal",
    price: 160,
    category: "Grains & Cereals",
    image: createProductArtwork("Masoor Dal", "#f97316", "🫘"),
    description: "Clean masoor dal with quick cooking time and rich everyday nutrition.",
    inStock: true,
    stock: 55,
    rating: 4.6,
    reviews: 110,
    weight: "1kg",
    origin: "Sirajগঞ্জ",
    currency: "BDT"
  },
  {
    id: "fallback-turmeric",
    title: "Turmeric Powder",
    slug: "turmeric-powder",
    price: 90,
    category: "Spices & Condiments",
    image: createProductArtwork("Turmeric Powder", "#d97706", "🫚"),
    description: "Aromatic turmeric powder ground from quality roots for authentic flavor.",
    inStock: true,
    stock: 65,
    rating: 4.7,
    reviews: 92,
    weight: "200g",
    origin: "Cumilla",
    currency: "BDT"
  },
  {
    id: "fallback-tea",
    title: "Black Tea Pack",
    slug: "black-tea-pack",
    price: 190,
    category: "Beverages",
    image: createProductArtwork("Black Tea Pack", "#065f46", "🍵"),
    description: "Strong black tea leaves for milk tea or classic liquor tea at home.",
    inStock: true,
    stock: 47,
    rating: 4.8,
    reviews: 131,
    weight: "500g",
    origin: "Sylhet",
    currency: "BDT"
  },
  {
    id: "fallback-juice",
    title: "Mango Juice",
    slug: "mango-juice",
    price: 140,
    category: "Beverages",
    image: createProductArtwork("Mango Juice", "#f59e0b", "🥭"),
    description: "Refreshing mango juice made for family breakfasts and lunch boxes.",
    inStock: true,
    stock: 36,
    rating: 4.4,
    reviews: 57,
    weight: "1L",
    origin: "Dhaka",
    currency: "BDT"
  },
  {
    id: "fallback-biscuits",
    title: "Butter Biscuits",
    slug: "butter-biscuits",
    price: 75,
    category: "Snacks",
    image: createProductArtwork("Butter Biscuits", "#7c3aed", "🍪"),
    description: "Crunchy tea-time biscuits with buttery flavor and family-friendly price.",
    inStock: true,
    stock: 90,
    rating: 4.3,
    reviews: 81,
    weight: "300g",
    origin: "Chattogram",
    currency: "BDT"
  },
  {
    id: "fallback-chips",
    title: "Salted Potato Chips",
    slug: "salted-potato-chips",
    price: 50,
    category: "Snacks",
    image: createProductArtwork("Salted Potato Chips", "#be123c", "🥔"),
    description: "Crispy lightly salted chips for movie nights, school snacks, and parties.",
    inStock: true,
    stock: 120,
    rating: 4.2,
    reviews: 67,
    weight: "120g",
    origin: "Dhaka",
    currency: "BDT"
  }
];

export default sampleProducts;
