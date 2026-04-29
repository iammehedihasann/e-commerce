import React from "react";

const blogs = [
  {
    title: "How to Build a Weekly Grocery Routine",
    excerpt: "A simple plan to reduce waste, save money, and keep your kitchen stocked with essentials.",
    author: "GloceryShop Team",
    date: "2026-01-12"
  },
  {
    title: "Freshness Matters: Storage Tips for Daily Produce",
    excerpt: "Learn the best ways to store fruits and vegetables to keep them crisp longer.",
    author: "GloceryShop Team",
    date: "2026-02-02"
  },
  {
    title: "Budget-Friendly Shopping: Smart Substitutions",
    excerpt: "Discover simple swaps that keep your meals tasty without overspending.",
    author: "GloceryShop Team",
    date: "2026-03-05"
  }
];

function BlogsPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <p className="text-sm text-gray-600 mt-1">Practical tips for healthier and smarter grocery shopping.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <article key={b.title} className="bg-white rounded-lg shadow-sm border p-5">
            <div className="text-sm text-gray-500">
              {new Date(b.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} ·{" "}
              {b.author}
            </div>
            <h2 className="mt-3 text-lg font-semibold text-slate-900">{b.title}</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.excerpt}</p>
            <div className="mt-4 text-sm text-emerald-700 font-medium">Read more (coming soon)</div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogsPage;
