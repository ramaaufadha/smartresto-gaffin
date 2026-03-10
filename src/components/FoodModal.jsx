import { useEffect, useState } from "react";

function FoodModal({ food, isOpen, onClose, onAddToCart, formatPrice }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [food?.id]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!food) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex items-end p-2 sm:items-center sm:justify-center sm:p-6 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 max-h-[92vh] w-full overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-out sm:max-w-lg ${
          isOpen ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-8 opacity-0 sm:scale-95"
        }`}
      >
        <div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-slate-200 sm:hidden" />
        <button
          onClick={onClose}
          className="pressable absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-sm font-semibold text-slate-700 shadow"
          aria-label="Close"
        >
          X
        </button>

        <img src={food.image} alt={food.name} className="h-60 w-full object-cover sm:h-72" />

        <div className="space-y-4 p-5 sm:p-6">
          <h3 className="text-2xl font-bold text-slate-900">{food.name}</h3>
          <p className="text-sm font-semibold text-slate-500">
            {food.shortDescription || "Freshly prepared signature menu item."}
          </p>
          <p className="text-sm leading-relaxed text-slate-600">{food.description}</p>
          <div className="text-lg font-bold text-emerald-700">{formatPrice(food.price)}</div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-2">
            <span className="pl-2 text-sm font-semibold text-slate-700">Quantity</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="pressable grid h-9 w-9 place-items-center rounded-xl bg-white text-xl text-slate-700 shadow-sm"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span key={quantity} className="pop-on-change w-8 text-center text-lg font-bold text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((current) => current + 1)}
                className="pressable grid h-9 w-9 place-items-center rounded-xl bg-[var(--brand)] text-xl text-white shadow-sm"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(food, quantity);
              onClose();
            }}
            className="pressable w-full rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-[var(--brand-dark)]"
          >
            Add to Cart - {formatPrice(food.price * quantity)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodModal;
