import React from "react";

function BlogsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Latest from Our Blog</h1>
        <p className="text-gray-600">Tips, recipes, and grocery guides.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((id) => (
          <article key={id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative bg-gray-100">
              <div className="pt-[56%]"></div>
              <img src={`https://picsum.photos/seed/blog${id}/800/450`} alt="Blog cover" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{id % 2 === 0 ? 'Healthy Eating on a Budget' : 'Seasonal Fruits to Try This Month'}</h3>
              <p className="text-gray-600 text-sm mb-3">{id % 2 === 0 ? 'Practical ways to keep your meals nutritious without overspending.' : 'Discover the freshest picks and how to use them in your kitchen.'}</p>
              <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogsPage;


