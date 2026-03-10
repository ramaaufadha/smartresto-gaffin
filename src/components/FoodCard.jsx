import { useEffect, useRef, useState } from "react";

function FoodCard({ food, onOpen, onAdd, formatPrice }) {
  const [isAdding, setIsAdding] = useState(false);
  const addAnimationTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (addAnimationTimeout.current) {
        clearTimeout(addAnimationTimeout.current);
      }
    };
  }, []);

  const handleQuickAdd = (event) => {
    event.stopPropagation();
    onAdd(food, 1);
    setIsAdding(true);

    if (addAnimationTimeout.current) {
      clearTimeout(addAnimationTimeout.current);
    }
    addAnimationTimeout.current = setTimeout(() => setIsAdding(false), 520);
  };

  return (
    <article
      onClick={() => onOpen(food)}
      className="group cursor-pointer overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-md shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/45"
    >
      <div className="relative overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent opacity-70" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-amber-400">
            <path d="M12 2l2.9 6 6.6.95-4.8 4.65 1.14 6.6L12 17.1l-5.84 3.1 1.14-6.6L2.5 8.95 9.1 8z" />
          </svg>
          {food.rating?.toFixed(1) || "4.8"}
        </span>

        <button
          onClick={handleQuickAdd}
          className="pressable absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand)] text-2xl leading-none text-white shadow-lg shadow-emerald-600/50 transition-all duration-200 hover:scale-105 hover:bg-[var(--brand-dark)]"
          aria-label={`Add ${food.name}`}
        >
          {isAdding ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current animate-pop-in">
              <path d="M9.5 16.2l-4-4 1.4-1.4 2.6 2.6 7.6-7.6 1.4 1.4z" />
            </svg>
          ) : (
            <span>+</span>
          )}
        </button>
        {isAdding && (
          <span className="pointer-events-none absolute bottom-16 right-4 rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white shadow animate-rise-fade">
            +1
          </span>
        )}
      </div>

      <div className="space-y-2 p-4 sm:p-5">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{food.name}</h3>
        <p className="line-clamp-2 text-sm text-slate-500">
          {food.shortDescription || food.description}
        </p>
        <div className="pt-1 text-base font-bold text-emerald-700">{formatPrice(food.price)}</div>
      </div>
    </article>
  );
}

export default FoodCard;
