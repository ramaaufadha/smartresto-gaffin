import { useMemo, useState } from "react";

const DELIVERY_FEE = 10000;
const SERVICE_FEE = 3000;

function CheckoutPage({ items, subtotal, formatPrice, onBack, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    deliveryAddress: "",
    orderNotes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const deliveryFee = itemCount > 0 ? DELIVERY_FEE : 0;
  const serviceFee = itemCount > 0 ? SERVICE_FEE : 0;
  const totalPrice = subtotal + deliveryFee + serviceFee;

  const errors = {
    customerName: !formData.customerName.trim(),
    phoneNumber: !formData.phoneNumber.trim(),
    deliveryAddress: !formData.deliveryAddress.trim(),
  };

  const hasError = Object.values(errors).some(Boolean);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (items.length === 0 || hasError) {
      return;
    }

    onPlaceOrder({
      customerName: formData.customerName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      deliveryAddress: formData.deliveryAddress.trim(),
      orderNotes: formData.orderNotes.trim(),
      items,
      subtotal,
      deliveryFee,
      serviceFee,
      totalPrice,
    });
  };

  return (
    <section className="mb-10 animate-pop-in">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
        <button
          onClick={onBack}
          className="pressable rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
        >
          Back
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.95fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Customer Name</label>
            <input
              value={formData.customerName}
              onChange={(event) =>
                setFormData((current) => ({ ...current, customerName: event.target.value }))
              }
              placeholder="Enter your full name"
              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
                isSubmitted && errors.customerName
                  ? "border-rose-300 bg-rose-50 focus:ring-rose-100"
                  : "border-slate-200 bg-slate-50 focus:border-emerald-400 focus:bg-white focus:ring-emerald-100"
              }`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Phone Number</label>
            <input
              value={formData.phoneNumber}
              onChange={(event) =>
                setFormData((current) => ({ ...current, phoneNumber: event.target.value }))
              }
              placeholder="08xxxxxxxxxx"
              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
                isSubmitted && errors.phoneNumber
                  ? "border-rose-300 bg-rose-50 focus:ring-rose-100"
                  : "border-slate-200 bg-slate-50 focus:border-emerald-400 focus:bg-white focus:ring-emerald-100"
              }`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Delivery Address
            </label>
            <textarea
              rows={3}
              value={formData.deliveryAddress}
              onChange={(event) =>
                setFormData((current) => ({ ...current, deliveryAddress: event.target.value }))
              }
              placeholder="Street, building, district, city"
              className={`w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
                isSubmitted && errors.deliveryAddress
                  ? "border-rose-300 bg-rose-50 focus:ring-rose-100"
                  : "border-slate-200 bg-slate-50 focus:border-emerald-400 focus:bg-white focus:ring-emerald-100"
              }`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Order Notes</label>
            <textarea
              rows={3}
              value={formData.orderNotes}
              onChange={(event) =>
                setFormData((current) => ({ ...current, orderNotes: event.target.value }))
              }
              placeholder="Optional notes (less sugar, no ice, etc.)"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <button
            type="submit"
            disabled={items.length === 0}
            className="pressable w-full rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/35 transition hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            Place Order
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>
          <p className="mt-1 text-xs text-slate-500">{itemCount} item(s)</p>

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
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Service Fee</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;
