function PromoBanner() {
  return (
    <section className="mb-8 grid gap-3 sm:grid-cols-2">
      <article className="rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-400 p-5 text-white shadow-lg shadow-emerald-500/30">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-100">Promo Today</p>
        <h3 className="mt-1 text-xl font-bold">20% OFF Coffee Today</h3>
        <p className="mt-2 text-sm text-emerald-50">
          Use code <span className="font-bold">KOPI20</span> for all hot coffee menu.
        </p>
      </article>

      <article className="rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-5 text-white shadow-lg shadow-cyan-500/30">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">Fresh Bake Deal</p>
        <h3 className="mt-1 text-xl font-bold">Buy 1 Get 1 Croissant</h3>
        <p className="mt-2 text-sm text-cyan-50">Limited until 5 PM. Perfect with cappuccino.</p>
      </article>
    </section>
  );
}

export default PromoBanner;
