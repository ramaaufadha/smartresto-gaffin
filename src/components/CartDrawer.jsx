import { useEffect, useMemo } from "react";

function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
  items,
  subtotal,
  onUpdateQty,
  onRemove,
  formatPrice,
}) {
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Your Cart</h3>
            <p className="text-xs text-slate-500">{itemCount} item(s)</p>
          </div>
          <button
            onClick={onClose}
            className="pressable grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700"
            aria-label="Close cart"
          >
            X
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              Cart is still empty. Add your favorite menu first.
            </div>
          ) : (
            items.map(({ food, quantity }) => (
              <div key={food.id} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex gap-3">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{food.name}</p>
                    <p className="text-xs text-slate-500">{formatPrice(food.price)} each</p>
                    <p className="text-sm font-bold text-emerald-700">
                      {formatPrice(food.price * quantity)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQty(food.id, -1)}
                          className="pressable grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-700"
                        >
                          -
                        </button>
                        <span
                          key={`${food.id}-${quantity}`}
                          className="pop-on-change w-6 text-center text-sm font-semibold"
                        >
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(food.id, 1)}
                          className="pressable grid h-7 w-7 place-items-center rounded-lg bg-[var(--brand)] text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(food.id)}
                        className="pressable text-xs font-semibold text-rose-600 transition hover:text-rose-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 border-t border-slate-200 bg-slate-50 px-4 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Total</span>
            <span key={subtotal} className="pop-on-change text-lg font-bold text-slate-900">
              {formatPrice(subtotal)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="pressable w-full rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/35 transition hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            Checkout ({itemCount})
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;
