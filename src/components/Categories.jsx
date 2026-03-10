function Categories({ categories, activeCategory, onSelect }) {
  return (
    <section className="mb-8 sm:mb-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Categories</h2>
        {activeCategory && (
          <button
            onClick={() => onSelect("")}
            className="pressable rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 hover:text-emerald-800"
          >
            Clear
          </button>
        )}
      </div>

      <div className="hide-scrollbar swipe-row -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.name;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.name)}
              className={`pressable swipe-item group relative flex min-w-[98px] flex-col items-center rounded-2xl border px-3 py-3 transition-all duration-300 ${
                isActive
                  ? "border-emerald-500 bg-gradient-to-b from-emerald-100 to-emerald-50 shadow-md shadow-emerald-200/80"
                  : "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <span
                className={`absolute inset-x-3 bottom-0 h-1 rounded-full transition ${
                  isActive ? "bg-emerald-500/85" : "bg-transparent"
                }`}
              />
              <span
                className={`mb-2 grid h-11 w-11 place-items-center rounded-2xl text-xl transition ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-400/40"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {category.icon}
              </span>
              <span
                className={`text-xs font-semibold ${
                  isActive ? "text-emerald-900" : "text-slate-700"
                }`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;
