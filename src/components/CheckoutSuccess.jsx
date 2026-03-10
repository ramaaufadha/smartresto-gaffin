function CheckoutSuccess({ order, formatPrice, onBackHome }) {
  if (!order) {
    return null;
  }

  return (
    <section className="mb-10 flex min-h-[55vh] items-center justify-center animate-pop-in">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/70 sm:p-8">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
            <path d="M9.5 16.2l-4-4 1.4-1.4 2.6 2.6 7.6-7.6 1.4 1.4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Your order has been placed.</h2>
        <p className="mt-2 text-sm text-slate-600">
          Thank you, {order.customerName}. Your demo order is being prepared.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span>Phone</span>
            <span>{order.phoneNumber}</span>
          </div>
          {order.tableNumber && (
            <div className="mt-2 flex items-center justify-between text-slate-600">
              <span>Table</span>
              <span>{order.tableNumber}</span>
            </div>
          )}
          <div className="mt-2 flex items-center justify-between text-slate-600">
            <span>Total</span>
            <span className="font-semibold text-slate-900">{formatPrice(order.totalPrice)}</span>
          </div>
          {order.orderNotes && <p className="mt-3 text-xs text-slate-500">Notes: {order.orderNotes}</p>}
        </div>

        <button
          onClick={onBackHome}
          className="pressable mt-6 w-full rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/35 transition hover:bg-[var(--brand-dark)]"
        >
          Back to Menu
        </button>
      </div>
    </section>
  );
}

export default CheckoutSuccess;
