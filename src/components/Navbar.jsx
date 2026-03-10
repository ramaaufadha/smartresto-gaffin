function Navbar({ cartCount, searchQuery, onSearchChange, onOpenCart }) {
  return (
    <nav className="sticky top-0 z-30 border-b border-white/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--brand)] text-white shadow-lg shadow-emerald-500/40">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M5 2h14v2H5zm2 4h10v4a4 4 0 01-4 4h-1v3h3v2H9v-2h3v-3h-1a4 4 0 01-4-4z" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
              SmartResto
            </p>
            <p className="text-sm font-semibold text-slate-900">Gaffin Demo</p>
          </div>
        </div>

        <div className="relative ml-auto flex-1 md:max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M10 2a8 8 0 105.293 13.707l4 4a1 1 0 001.414-1.414l-4-4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </span>
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search menu..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <button
          onClick={onOpenCart}
          className="pressable relative shrink-0 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          aria-label="Open cart"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M7 18a2 2 0 11-.001 3.999A2 2 0 017 18zm10 0a2 2 0 11-.001 3.999A2 2 0 0117 18zM5.4 4l.67 3H21l-1.76 7.03a2 2 0 01-1.94 1.47H8a2 2 0 01-1.95-1.56L3.04 2.94A1.5 1.5 0 001.58 2H1a1 1 0 000 2h.58z" />
          </svg>
          {cartCount > 0 && (
            <span
              key={cartCount}
              className="pop-on-change absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--brand)] text-[10px] font-semibold text-white"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
