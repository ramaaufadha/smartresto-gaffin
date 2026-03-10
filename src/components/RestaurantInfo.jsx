function RestaurantInfo() {
  const infoItems = [
    {
      label: "Location",
      value: "Jl. Diponegoro, Salatiga, Central Java",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: "+62 85 7002 49949",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M6.6 2h3.2l1.2 4-1.9 1.9a14.6 14.6 0 006.2 6.2L17.2 12l4 1.2v3.2A1.6 1.6 0 0119.6 18C9.9 18 6 8.1 6 4.4A1.6 1.6 0 017.6 2.8z" />
        </svg>
      ),
    },
    {
      label: "Opening Hours",
      value: "08:00 - 22:00",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 10.4V7h-2v6.2l4.9 2.8 1-1.7z" />
        </svg>
      ),
    },
    {
      label: "Preparation Time",
      value: "15-20 minutes",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 1.8a10.2 10.2 0 1010.2 10.2A10.2 10.2 0 0012 1.8zm.9 5.2v5.4l3.9 2.3-1 1.7-5-3V7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200/70 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
        Restaurant Info
      </p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">SmartResto Gaffin Coffee</h2>
      <p className="mt-1 text-sm text-slate-600">Your neighborhood coffee and comfort food spot.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {infoItems.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                {item.icon}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-800">{item.value}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RestaurantInfo;
