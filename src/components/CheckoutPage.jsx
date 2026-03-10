import { useMemo } from "react";
import CheckoutForm from "./CheckoutForm";

function CheckoutPage({ items, subtotal, tableNumber, formatPrice, onBack, onPlaceOrder }) {
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const handleSubmitCustomerInfo = (customerInfo) => {
    onPlaceOrder({
      ...customerInfo,
      items,
      subtotal,
      totalPrice: subtotal,
      tableNumber,
    });
  };

  return (
    <section className="mb-10 animate-pop-in">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
          {tableNumber && <p className="mt-1 text-sm font-medium text-emerald-700">Table {tableNumber}</p>}
        </div>
        <button
          onClick={onBack}
          className="pressable rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
        >
          Back
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <CheckoutForm onSubmit={handleSubmitCustomerInfo} isDisabled={items.length === 0} />

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>
          <p className="mt-1 text-xs text-slate-500">{itemCount} item(s)</p>

          {tableNumber && (
            <p className="mt-3 inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Table {tableNumber}
            </p>
          )}

          <div className="mt-4 space-y-3">
            {items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                No items in your cart.
              </p>
            ) : (
              items.map(({ food, quantity }) => (
                <div key={food.id} className="flex items-center justify-between text-sm">
                  <div className="max-w-[70%]">
                    <p className="font-semibold text-slate-900">{food.name}</p>
                    <p className="text-xs text-slate-500">
                      {quantity} x {formatPrice(food.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-700">
                    {formatPrice(food.price * quantity)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <div className="flex items-center justify-between pt-1 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;
