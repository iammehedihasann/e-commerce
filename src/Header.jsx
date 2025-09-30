import SearchBar from "./componnts/SearchBar.jsx";
import { Link } from "react-router-dom";
function Header({ cartCount, onCartClick, user, onAuthClick, onLogout, searchValue, onSearchChange, onHome, onCategories, onOffers, onBlogs }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-extrabold text-emerald-600">
              Mohammod Glocery Shop
            </div>
            <nav className="hidden md:flex gap-4 text-sm text-gray-600">
              <Link className="hover:underline" to="/">Home</Link>
              <Link className="hover:underline" to="/categories">Categories</Link>
              <Link className="hover:underline" to="/offers">Offers</Link>
              <Link className="hover:underline" to="/blogs">Blogs</Link>
            </nav>
          </div>
          <div className="flex-1 mx-4 max-w-xl">
            <SearchBar value={searchValue} onChange={onSearchChange} />
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm text-gray-700">
                  Welcome, {user.firstName}!
                </span>
                <button
                  onClick={onLogout}
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden sm:inline-block px-3 py-1 border rounded text-sm hover:bg-gray-50"
              >
                Sign in
              </button>
            )}
            <div className="relative">
              <button 
                onClick={onCartClick}
                className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                <Link to="/cart" className="hidden sm:inline">Cart</Link>
                <span className="bg-emerald-600 text-white rounded-full px-2 py-0.5 text-xs">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
