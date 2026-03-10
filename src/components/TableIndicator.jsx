function TableIndicator({ tableNumber }) {
  if (!tableNumber) {
    return null;
  }

  return (
    <section className="mb-4 animate-pop-in rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 shadow-sm shadow-emerald-100 sm:mb-5 sm:px-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
        Dine-in Session
      </p>
      <p className="mt-1 text-lg font-bold text-emerald-900">Table {tableNumber}</p>
    </section>
  );
}

export default TableIndicator;
