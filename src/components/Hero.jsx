function Hero() {
  return (
    <section className="mb-8 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 sm:mb-10">
      <div className="relative h-64 w-full sm:h-72">
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80"
          alt="Restaurant banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/25 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Kopi Nusantara Signature</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-amber-300">
                <path d="M12 2l2.9 6 6.6.95-4.8 4.65 1.14 6.6L12 17.1l-5.84 3.1 1.14-6.6L2.5 8.95 9.1 8z" />
              </svg>
              4.8
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">15-25 min</span>
            <span className="rounded-full bg-emerald-400/90 px-3 py-1 text-emerald-950">
              Open Now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
