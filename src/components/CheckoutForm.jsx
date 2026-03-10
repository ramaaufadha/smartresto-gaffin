import { useMemo, useState } from "react";

function CheckoutForm({ onSubmit, isDisabled }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    orderNotes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = useMemo(
    () => ({
      name: !formData.name.trim(),
      phoneNumber: !formData.phoneNumber.trim(),
    }),
    [formData.name, formData.phoneNumber]
  );

  const hasError = errors.name || errors.phoneNumber;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (isDisabled || hasError) {
      return;
    }

    onSubmit({
      customerName: formData.name.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      orderNotes: formData.orderNotes.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900">Customer Info</h3>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
        <input
          value={formData.name}
          onChange={(event) =>
            setFormData((current) => ({ ...current, name: event.target.value }))
          }
          placeholder="Your name"
          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
            isSubmitted && errors.name
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
        disabled={isDisabled}
        className="pressable w-full rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/35 transition hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        Checkout via WhatsApp
      </button>
    </form>
  );
}

export default CheckoutForm;
