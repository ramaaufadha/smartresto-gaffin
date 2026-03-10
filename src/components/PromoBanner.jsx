const promoItems = [
  {
    id: "coffee-20",
    icon: "🔥",
    title: "20% OFF Coffee Today",
    desc: "Use code KOPI20 for all hot coffee menu.",
    gradient: "from-emerald-500 to-emerald-400",
    shadow: "shadow-emerald-500/30",
  },
  {
    id: "croissant-bogo",
    icon: "🥐",
    title: "Buy 1 Get 1 Croissant",
    desc: "Limited until 5 PM. Perfect with cappuccino.",
    gradient: "from-sky-600 to-cyan-500",
    shadow: "shadow-cyan-500/30",
  },
  {
    id: "lunch-free",
    icon: "⚡",
    title: "Free Delivery for 100K+",
    desc: "Auto-applied for nearby area orders.",
    gradient: "from-fuchsia-600 to-pink-500",
    shadow: "shadow-pink-500/30",
  },
];

function PromoBanner() {
  return (
    <section className="mb-8 sm:mb-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Today's Promo</h2>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Limited
        </span>
      </div>

      <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
        {promoItems.map((promo) => (
          <article
            key={promo.id}
            className={`min-w-[280px] flex-1 snap-start rounded-3xl bg-gradient-to-r ${promo.gradient} p-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 ${promo.shadow}`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">Promo</p>
            <h3 className="mt-2 flex items-center gap-2 text-lg font-bold">
              <span>{promo.icon}</span>
              <span>{promo.title}</span>
            </h3>
            <p className="mt-2 text-sm text-white/90">{promo.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PromoBanner;
