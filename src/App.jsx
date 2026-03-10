import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import MenuSection from "./components/MenuSection";
import FoodModal from "./components/FoodModal";
import CartDrawer from "./components/CartDrawer";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import CheckoutPage from "./components/CheckoutPage";
import CheckoutSuccess from "./components/CheckoutSuccess";
import QRMenuSection from "./components/QRMenuSection";
import RestaurantMap from "./components/RestaurantMap";
import foods from "./data/foods";
import categories from "./data/categories";

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const WHATSAPP_NUMBER = "6285700249949";

const formatWhatsappRupiah = (value) => `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;

const buildWhatsappMessage = (items, total) => {
  const itemLines = items
    .map(
      ({ food, quantity }) =>
        `${quantity}x ${food.name} - ${formatWhatsappRupiah(food.price * quantity)}`
    )
    .join("\n");

  return `New Order

Items:
${itemLines}

Total: ${formatWhatsappRupiah(total)}

Thank you.`;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePage, setActivePage] = useState("menu");
  const [latestOrder, setLatestOrder] = useState(null);
  const [cart, setCart] = useState({});

  const filteredFoods = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return foods.filter((food) => {
      const matchCategory = !activeCategory || food.category === activeCategory;
      const matchSearch =
        query.length === 0 ||
        `${food.name} ${food.description}`.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [searchQuery, activeCategory]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([foodId, quantity]) => {
          const food = foods.find((item) => item.id === foodId);
          return food ? { food, quantity } : null;
        })
        .filter(Boolean),
    [cart]
  );

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.food.price * item.quantity, 0),
    [cartItems]
  );

  const handleAddToCart = (food, quantity = 1) => {
    setCart((current) => ({
      ...current,
      [food.id]: (current[food.id] || 0) + quantity,
    }));
  };

  const handleUpdateQuantity = (foodId, delta) => {
    setCart((current) => {
      const currentQty = current[foodId] || 0;
      const nextQty = currentQty + delta;

      if (nextQty <= 0) {
        const { [foodId]: _, ...rest } = current;
        return rest;
      }

      return { ...current, [foodId]: nextQty };
    });
  };

  const handleRemoveItem = (foodId) => {
    setCart((current) => {
      const { [foodId]: _, ...rest } = current;
      return rest;
    });
  };

  const handleOpenFoodModal = (food) => {
    setSelectedFood(food);
    setIsFoodModalOpen(true);
  };

  const handleCloseFoodModal = () => {
    setIsFoodModalOpen(false);
  };

  const handleOpenCheckout = () => {
    if (cartCount === 0) {
      return;
    }
    setIsCartOpen(false);
    setIsFoodModalOpen(false);
    setActivePage("checkout");
  };

  const handlePlaceOrder = (orderPayload) => {
    const message = buildWhatsappMessage(orderPayload.items, orderPayload.subtotal);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setLatestOrder(orderPayload);
    setCart({});
    setIsCartOpen(false);
    setActivePage("success");
  };

  const handleBackToMenu = () => {
    setIsCartOpen(false);
    setIsFoodModalOpen(false);
    setSelectedFood(null);
    setActivePage("menu");
  };

  useEffect(() => {
    if (isFoodModalOpen) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setSelectedFood(null);
    }, 240);

    return () => clearTimeout(timeoutId);
  }, [isFoodModalOpen]);

  return (
    <div className="min-h-screen">
      <Navbar
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        {activePage === "menu" && (
          <>
            <Hero />
            <PromoBanner />

            <Categories
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />

            <MenuSection
              foods={filteredFoods}
              onFoodSelect={handleOpenFoodModal}
              onAddToCart={handleAddToCart}
              formatPrice={formatPrice}
            />

            <section className="mb-10 rounded-3xl bg-white p-5 shadow-lg shadow-slate-200/70 sm:p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Restaurant Info</h2>
              <div className="space-y-3 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Address:</span> Jl. Diponegoro
                  No. 10, Salatiga, Central Java
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Phone:</span> +62 857-002-49949
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Opening Hours:</span> 08:00 -
                  22:00 WIB
                </p>
              </div>
            </section>

            <RestaurantMap />
            <QRMenuSection />
          </>
        )}

        {activePage === "checkout" && (
          <CheckoutPage
            items={cartItems}
            subtotal={subtotal}
            formatPrice={formatPrice}
            onBack={handleBackToMenu}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {activePage === "success" && (
          <CheckoutSuccess
            order={latestOrder}
            formatPrice={formatPrice}
            onBackHome={handleBackToMenu}
          />
        )}
      </main>

      {activePage === "menu" && (
        <button
          onClick={() => setIsCartOpen(true)}
          className={`pressable fixed bottom-4 left-4 right-4 z-20 rounded-2xl bg-[var(--brand)] px-4 py-3 text-left text-white shadow-2xl shadow-emerald-600/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-dark)] sm:bottom-7 sm:left-auto sm:right-7 sm:w-[230px] ${
            isCartOpen ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"
          }`}
        >
          <p
            key={`count-${cartCount}`}
            className="pop-on-change text-xs font-medium text-emerald-100"
          >
            {cartCount} item(s) in cart
          </p>
          <p key={`total-${subtotal}`} className="pop-on-change text-sm font-bold">
            {formatPrice(subtotal)}
          </p>
        </button>
      )}

      {activePage === "menu" && (
        <FoodModal
          food={selectedFood}
          isOpen={isFoodModalOpen}
          onClose={handleCloseFoodModal}
          onAddToCart={handleAddToCart}
          formatPrice={formatPrice}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleOpenCheckout}
        items={cartItems}
        subtotal={subtotal}
        onUpdateQty={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        formatPrice={formatPrice}
      />

      <Footer />
    </div>
  );
}

export default App;
