import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-8 px-4 text-gray-700 text-sm mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-2">About GloceryShop</h4>
          <p className="leading-6">
            GloceryShop is your one-stop destination for fresh groceries, daily
            essentials, and household products. We are committed to providing
            quality items at affordable prices, delivered right to your
            doorstep.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <ul className="space-y-1">
            <li>
              Email:{" "}
              <a
                href="mailto:support@gloceryshop.com"
                className="text-blue-600"
              >
                support@gloceryshop.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+880123456789" className="text-blue-600">
                +880 1234 56789
              </a>
            </li>
            <li>Address: 123 Main Road, Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline text-blue-600">Home</a>
            </li>
            <li>
              <a href="/categories" className="hover:underline text-blue-600">Categories</a>
            </li>
            <li>
              <a href="/cart" className="hover:underline text-blue-600">Cart</a>
            </li>
            <li>
              <a href="/faq" className="hover:underline text-blue-600">FAQ</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        &copy; {new Date().getFullYear()} GloceryShop. All rights reserved.
      </div>
    </footer>
  );
}
