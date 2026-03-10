import FoodCard from "./FoodCard";

function MenuSection({ foods, onFoodSelect, onAddToCart, formatPrice }) {
  return (
    <section className="mb-10 sm:mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Popular Menu</h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {foods.length} items
        </span>
      </div>

      {foods.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No menu items found. Try another search or category.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onOpen={onFoodSelect}
              onAdd={onAddToCart}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MenuSection;
