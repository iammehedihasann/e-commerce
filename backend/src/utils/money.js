export function centsToAmount(cents) {
  return Number((cents / 100).toFixed(2));
}

export function productToResponse(product) {
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    description: product.description,
    category: product.category,
    price: centsToAmount(product.priceCents),
    currency: product.currency,
    image: product.imageUrl,
    weight: product.weight,
    origin: product.origin,
    rating: product.rating,
    reviews: product.reviews,
    inStock: product.isActive && product.stock > 0,
    stock: product.stock
  };
}
