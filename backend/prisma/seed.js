import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const products = [
  {
    title: "Premium Red Apple",
    slug: "premium-red-apple",
    description: "Crisp imported red apples selected for everyday snacking and juice.",
    category: "Fruits",
    priceCents: 18000,
    imageUrl: createProductArtwork("Premium Red Apple", "#dc2626", "🍎"),
    weight: "1kg",
    origin: "Rajshahi",
    rating: 4.8,
    reviews: 124,
    stock: 42
  },
  {
    title: "Sweet Banana Bunch",
    slug: "sweet-banana-bunch",
    description: "Naturally sweet bananas ideal for breakfast, smoothies, and quick snacks.",
    category: "Fruits",
    priceCents: 9500,
    imageUrl: createProductArtwork("Sweet Banana Bunch", "#ca8a04", "🍌"),
    weight: "12 pcs",
    origin: "Narsingdi",
    rating: 4.6,
    reviews: 98,
    stock: 60
  },
  {
    title: "Farm Fresh Tomato",
    slug: "farm-fresh-tomato",
    description: "Bright ripe tomatoes for salads, curries, and everyday cooking.",
    category: "Vegetables",
    priceCents: 8500,
    imageUrl: createProductArtwork("Farm Fresh Tomato", "#ef4444", "🍅"),
    weight: "1kg",
    origin: "Bogura",
    rating: 4.5,
    reviews: 75,
    stock: 50
  },
  {
    title: "Organic Spinach",
    slug: "organic-spinach",
    description: "Tender spinach leaves washed and packed for fast healthy meals.",
    category: "Vegetables",
    priceCents: 6000,
    imageUrl: createProductArtwork("Organic Spinach", "#16a34a", "🥬"),
    weight: "500g",
    origin: "Jessore",
    rating: 4.4,
    reviews: 54,
    stock: 35
  },
  {
    title: "Full Cream Milk",
    slug: "full-cream-milk",
    description: "Pasteurized full cream milk with rich taste for tea, coffee, and desserts.",
    category: "Dairy & Eggs",
    priceCents: 11000,
    imageUrl: createProductArtwork("Full Cream Milk", "#2563eb", "🥛"),
    weight: "1L",
    origin: "Savar",
    rating: 4.7,
    reviews: 143,
    stock: 80
  },
  {
    title: "Brown Farm Eggs",
    slug: "brown-farm-eggs",
    description: "Fresh brown eggs from local farms, packed carefully for safe delivery.",
    category: "Dairy & Eggs",
    priceCents: 14500,
    imageUrl: createProductArtwork("Brown Farm Eggs", "#92400e", "🥚"),
    weight: "12 pcs",
    origin: "Gazipur",
    rating: 4.8,
    reviews: 165,
    stock: 70
  },
  {
    title: "Dressed Broiler Chicken",
    slug: "dressed-broiler-chicken",
    description: "Cleaned and chilled chicken prepared for curry, roast, and grilling.",
    category: "Meat & Seafood",
    priceCents: 32000,
    imageUrl: createProductArtwork("Dressed Broiler Chicken", "#b91c1c", "🍗"),
    weight: "1kg",
    origin: "Dhaka",
    rating: 4.5,
    reviews: 69,
    stock: 24
  },
  {
    title: "Fresh Rui Fish Cut",
    slug: "fresh-rui-fish-cut",
    description: "Popular Bengali fish cut and cleaned on order for home delivery.",
    category: "Meat & Seafood",
    priceCents: 42000,
    imageUrl: createProductArtwork("Fresh Rui Fish Cut", "#0f766e", "🐟"),
    weight: "1kg",
    origin: "Mymensingh",
    rating: 4.7,
    reviews: 88,
    stock: 18
  },
  {
    title: "Miniket Rice",
    slug: "miniket-rice",
    description: "Premium miniket rice with fluffy texture, suitable for daily family meals.",
    category: "Grains & Cereals",
    priceCents: 76000,
    imageUrl: createProductArtwork("Miniket Rice", "#a16207", "🌾"),
    weight: "5kg",
    origin: "Naogaon",
    rating: 4.9,
    reviews: 201,
    stock: 40
  },
  {
    title: "Masoor Dal",
    slug: "masoor-dal",
    description: "Clean masoor dal with quick cooking time and rich everyday nutrition.",
    category: "Grains & Cereals",
    priceCents: 16000,
    imageUrl: createProductArtwork("Masoor Dal", "#f97316", "🫘"),
    weight: "1kg",
    origin: "Sirajganj",
    rating: 4.6,
    reviews: 110,
    stock: 55
  },
  {
    title: "Turmeric Powder",
    slug: "turmeric-powder",
    description: "Aromatic turmeric powder ground from quality roots for authentic flavor.",
    category: "Spices & Condiments",
    priceCents: 9000,
    imageUrl: createProductArtwork("Turmeric Powder", "#d97706", "🫚"),
    weight: "200g",
    origin: "Cumilla",
    rating: 4.7,
    reviews: 92,
    stock: 65
  },
  {
    title: "Black Tea Pack",
    slug: "black-tea-pack",
    description: "Strong black tea leaves for milk tea or classic liquor tea at home.",
    category: "Beverages",
    priceCents: 19000,
    imageUrl: createProductArtwork("Black Tea Pack", "#065f46", "🍵"),
    weight: "500g",
    origin: "Sylhet",
    rating: 4.8,
    reviews: 131,
    stock: 47
  },
  {
    title: "Mango Juice",
    slug: "mango-juice",
    description: "Refreshing mango juice made for family breakfasts and lunch boxes.",
    category: "Beverages",
    priceCents: 14000,
    imageUrl: createProductArtwork("Mango Juice", "#f59e0b", "🥭"),
    weight: "1L",
    origin: "Dhaka",
    rating: 4.4,
    reviews: 57,
    stock: 36
  },
  {
    title: "Butter Biscuits",
    slug: "butter-biscuits",
    description: "Crunchy tea-time biscuits with buttery flavor and family-friendly price.",
    category: "Snacks",
    priceCents: 7500,
    imageUrl: createProductArtwork("Butter Biscuits", "#7c3aed", "🍪"),
    weight: "300g",
    origin: "Chattogram",
    rating: 4.3,
    reviews: 81,
    stock: 90
  },
  {
    title: "Salted Potato Chips",
    slug: "salted-potato-chips",
    description: "Crispy lightly salted chips for movie nights, school snacks, and parties.",
    category: "Snacks",
    priceCents: 5000,
    imageUrl: createProductArtwork("Salted Potato Chips", "#be123c", "🥔"),
    weight: "120g",
    origin: "Dhaka",
    rating: 4.2,
    reviews: 67,
    stock: 120
  }
];

async function main() {
  await Promise.all(
    products.map((product) =>
      prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product
      })
    )
  );

  const passwordHash = await bcrypt.hash("Admin12345!", 12);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { role: "ADMIN" },
    create: {
      firstName: "Store",
      lastName: "Admin",
      email: "admin@example.com",
      passwordHash,
      role: "ADMIN"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
