import { useEffect, useMemo, useRef, useState } from "react";
import FoodCard from "./FoodCard";

const getItemsPerView = (width) => {
  if (width >= 1024) {
    return 9;
  }
  if (width >= 768) {
    return 6;
  }
  return 3;
};

const chunkItems = (items, chunkSize) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
};

function MenuSlider({ foods, onFoodSelect, onAddToCart, formatPrice }) {
  const scrollerRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(() =>
    typeof window === "undefined" ? 9 : getItemsPerView(window.innerWidth)
  );
  const [activePage, setActivePage] = useState(0);

  const pages = useMemo(() => chunkItems(foods, itemsPerView), [foods, itemsPerView]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActivePage(0);
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [itemsPerView, foods]);

  const scrollToPage = (pageIndex) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const safePage = Math.max(0, Math.min(pageIndex, pages.length - 1));
    scroller.scrollTo({
      left: safePage * scroller.clientWidth,
      behavior: "smooth",
    });
    setActivePage(safePage);
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const page = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActivePage(page);
  };

  return (
    <section className="mb-10 sm:mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Popular Menu</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {foods.length} items
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToPage(activePage - 1)}
              disabled={activePage === 0}
              className="pressable grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Previous menu items"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M15.7 5.3a1 1 0 010 1.4L10.41 12l5.3 5.3a1 1 0 11-1.42 1.4l-6-6a1 1 0 010-1.4l6-6a1 1 0 011.4 0z" />
              </svg>
            </button>
            <button
              onClick={() => scrollToPage(activePage + 1)}
              disabled={activePage >= pages.length - 1}
              className="pressable grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Next menu items"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M8.3 18.7a1 1 0 010-1.4L13.59 12 8.3 6.7a1 1 0 111.4-1.4l6 6a1 1 0 010 1.4l-6 6a1 1 0 01-1.4 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {foods.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No menu items found. Try another search or category.
        </div>
      ) : (
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="hide-scrollbar overflow-x-auto scroll-smooth"
        >
          <div className="flex min-w-full snap-x snap-mandatory gap-4">
            {pages.map((pageFoods, pageIndex) => (
              <div key={`menu-page-${pageIndex}`} className="w-full shrink-0 snap-start">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                  {pageFoods.map((food) => (
                    <FoodCard
                      key={food.id}
                      food={food}
                      onOpen={onFoodSelect}
                      onAdd={onAddToCart}
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default MenuSlider;
