import { useEffect, useRef, useState } from "react";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364758b' font-size='44' font-family='Arial,sans-serif'%3EFood%20Image%3C/text%3E%3C/svg%3E";

function FoodCard({ food, onOpen, onAdd, formatPrice }) {
  const [isAdding, setIsAdding] = useState(false);
  const [imageSrc, setImageSrc] = useState(food.image || FALLBACK_IMAGE);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const addAnimationTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (addAnimationTimeout.current) {
        clearTimeout(addAnimationTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    setImageSrc(food.image || FALLBACK_IMAGE);
    setIsImageLoading(true);
  }, [food.image]);

  const handleQuickAdd = (event) => {
    event.stopPropagation();
    onAdd(food, 1);
    setIsAdding(true);

    if (addAnimationTimeout.current) {
      clearTimeout(addAnimationTimeout.current);
    }
    addAnimationTimeout.current = setTimeout(() => setIsAdding(false), 520);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    if (imageSrc !== FALLBACK_IMAGE) {
      setImageSrc(FALLBACK_IMAGE);
      return;
    }
    setIsImageLoading(false);
  };

  return (
    <article
      onClick={() => onOpen(food)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-200/55 transition-all duration-300 will-change-transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-100/60"
    >
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-slate-100">
        {isImageLoading && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
        )}
        <img
          src={imageSrc}
          alt={food.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
          className={`h-[200px] w-full object-cover transition-all duration-700 ease-out ${
            isImageLoading
              ? "scale-[1.02] blur-[1px]"
              : "scale-100 blur-0 group-hover:scale-110 group-hover:brightness-105"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-85" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-amber-400">
            <path d="M12 2l2.9 6 6.6.95-4.8 4.65 1.14 6.6L12 17.1l-5.84 3.1 1.14-6.6L2.5 8.95 9.1 8z" />
          </svg>
          {food.rating?.toFixed(1) || "4.8"}
        </span>

        <button
          onClick={handleQuickAdd}
          className="pressable absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-2xl border border-emerald-300/40 bg-[var(--brand)] text-2xl leading-none text-white shadow-xl shadow-emerald-700/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 hover:bg-[var(--brand-dark)]"
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
