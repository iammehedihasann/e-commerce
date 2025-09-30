import React from 'react';

function CategoryFilter({ categories, active, setActive }) {
  return (
    <div className="space-y-2">
      <button
        onClick={() => setActive(null)}
        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
          active === null
            ? 'bg-emerald-100 text-emerald-700 font-medium'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActive(category)}
          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
            active === category
              ? 'bg-emerald-100 text-emerald-700 font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
