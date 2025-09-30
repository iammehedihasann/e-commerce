import "./App.css";
import React, { useState } from "react";
import Header from "./Header.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import CategoryFilter from "./componnts/CategoryFilter.jsx";
import ProductGrid from "./componnts/ProductGrid.jsx";
import Cart from "./componnts/Cart.jsx";
import Checkout from "./componnts/Checkout.jsx";
import OrderConfirmation from "./componnts/OrderConfirmation.jsx";
import Auth from "./componnts/Auth.jsx";
import Wishlist from "./componnts/Wishlist.jsx";
import Footer from "./Footer.jsx";
import sampleProducts from "./sampleProducts/sampleProducts.js";

function App() {
  const navigate = useNavigate();
  const categories = Array.from(new Set(sampleProducts.map((p) => p.category)));
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const filtered = sampleProducts.filter((p) => {
    const matchesCat = activeCategory ? p.category === activeCategory : true;
    const matchesQuery = query
      ? p.title.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchesCat && matchesQuery;
  });

  // Show a smaller curated set on "All Products"; show all when a category is selected
  const displayed = activeCategory ? filtered : filtered.slice(0, 16);

  function handleAdd(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handleRemove(productId) {
    setCart(cart.filter(item => item.id !== productId));
  }

  function handleUpdateQuantity(productId, newQuantity) {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  }

  function handleClearCart() {
    setCart([]);
  }

  function handleCheckout() {
    setShowCheckout(true);
    setShowCart(false);
  }

  function handleOrderComplete(order) {
    setCurrentOrder(order);
    setShowCheckout(false);
    setShowOrderConfirmation(true);
    setCart([]);
  }

  function handleContinueShopping() {
    setShowOrderConfirmation(false);
    setCurrentOrder(null);
  }

  function handleLogin(userData) {
    setUser(userData);
    setShowAuth(false);
  }

  function handleLogout() {
    setUser(null);
  }

  function handleAddToWishlist(product) {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  }

  function handleRemoveFromWishlist(productId) {
    setWishlist(wishlist.filter(item => item.id !== productId));
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setShowCart(!showCart)}
        user={user}
        onAuthClick={() => setShowAuth(true)}
        onLogout={handleLogout}
        searchValue={query}
        onSearchChange={(e) => setQuery(e.target.value)}
        onHome={() => { setActiveCategory(null); setQuery(""); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onCategories={() => { document.querySelector('#categories-section')?.scrollIntoView({ behavior: 'smooth' }); }}
        onOffers={() => { setActiveCategory(null); setQuery("offer"); }}
        onBlogs={() => { alert('Blogs coming soon!'); }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 id="categories-section" className="font-semibold mb-3">Categories</h4>
              <CategoryFilter
                categories={categories}
                active={activeCategory}
                setActive={setActiveCategory}
              />

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Search</h4>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search items"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Cart Summary</h4>
                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="text-emerald-600 hover:text-emerald-700 text-sm"
                  >
                    {showCart ? 'Hide' : 'View'} Cart
                  </button>
                </div>
                <div className="text-sm text-gray-600">{cartCount} items</div>
                {cart.length > 0 && (
                  <div className="mt-2 text-sm">
                    <div className="font-medium text-emerald-600">
                      Total: ৳{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Wishlist</h4>
                  <button
                    onClick={() => setShowWishlist(!showWishlist)}
                    className="text-emerald-600 hover:text-emerald-700 text-sm"
                  >
                    {showWishlist ? 'Hide' : 'View'} Wishlist
                  </button>
                </div>
                <div className="text-sm text-gray-600">{wishlist.length} items</div>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {activeCategory ? activeCategory : 'All Products'}
              </h2>
              <div className="text-sm text-gray-600">
                Showing {displayed.length} results
              </div>
            </div>

            <ProductGrid 
              products={displayed} 
              onAdd={handleAdd} 
              onAddToWishlist={handleAddToWishlist}
              wishlist={wishlist}
            />
          </section>
        </div>
          } />

          <Route path="/categories" element={<CategoriesPage categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} filteredProducts={filtered} onAdd={handleAdd} onAddToWishlist={handleAddToWishlist} wishlist={wishlist} />} />
          <Route path="/offers" element={<OffersPage products={sampleProducts} onAdd={handleAdd} onAddToWishlist={handleAddToWishlist} wishlist={wishlist} />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/cart" element={<div className="max-w-3xl mx-auto"><h1 className="text-2xl font-bold mb-4">Your Cart</h1><Cart cart={cart} onRemove={handleRemove} onUpdateQuantity={handleUpdateQuantity} onClearCart={handleClearCart} onCheckout={handleCheckout} /></div>} />
          <Route path="/wishlist" element={<div className="max-w-3xl mx-auto"><h1 className="text-2xl font-bold mb-4">Wishlist</h1><Wishlist wishlist={wishlist} onRemove={handleRemoveFromWishlist} onAddToCart={handleAdd} /></div>} />
          <Route path="/faq" element={<div className="max-w-3xl mx-auto"><h1 className="text-2xl font-bold mb-4">FAQ</h1><p>Frequently asked questions will be here.</p></div>} />
        </Routes>

        {showCart && (
          <div className="mt-8">
            <Cart
              cart={cart}
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
              onCheckout={handleCheckout}
            />
          </div>
        )}

        {showCheckout && (
          <Checkout
            cart={cart}
            onClose={() => setShowCheckout(false)}
            onOrderComplete={handleOrderComplete}
          />
        )}

        {showOrderConfirmation && currentOrder && (
          <OrderConfirmation
            order={currentOrder}
            onClose={() => setShowOrderConfirmation(false)}
            onContinueShopping={handleContinueShopping}
          />
        )}

        {showAuth && (
          <Auth
            onClose={() => setShowAuth(false)}
            onLogin={handleLogin}
          />
        )}

        {showWishlist && (
          <div className="mt-8">
            <Wishlist
              wishlist={wishlist}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAdd}
            />
          </div>
        )}

        <div className="mt-12">
          <Footer />
        </div>
      </main>
    </div>
  );
}
export default App;
