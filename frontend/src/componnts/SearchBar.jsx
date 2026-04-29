export default function SearchBar({ value, onChange, placeholder = "Search products, categories, origin..." }) {
  return (
    <label className="relative block">
      <span className="sr-only">Search products</span>
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14.5 14.5L18 18M16.4 9.2a7.2 7.2 0 11-14.4 0 7.2 7.2 0 0114.4 0z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}
