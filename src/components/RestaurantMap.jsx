const EMBED_MAP_URL = "https://www.google.com/maps?q=-7.3316,110.5006&z=15&output=embed";
const OPEN_MAP_URL = "https://www.google.com/maps?q=-7.3316,110.5006";

function RestaurantMap() {
  return (
    <section className="mb-10 rounded-3xl bg-white p-5 shadow-lg shadow-slate-200/70 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
        Restaurant Location
      </p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">Find Us on Google Maps</h2>
      <p className="mt-1 text-sm text-slate-600">Visit our restaurant location</p>

      <div className="mt-4 overflow-hidden rounded-2xl shadow-lg shadow-slate-300/40">
        <iframe
          title="Restaurant location map"
          src={EMBED_MAP_URL}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[350px] w-full border-0"
        />
      </div>

      <a
        href={OPEN_MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pressable mt-4 inline-flex rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-[var(--brand-dark)]"
      >
        Open in Google Maps
      </a>
    </section>
  );
}

export default RestaurantMap;
