import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import MenuSlider from "./components/MenuSlider";
import FoodModal from "./components/FoodModal";
import CartDrawer from "./components/CartDrawer";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import CheckoutPage from "./components/CheckoutPage";
import CheckoutSuccess from "./components/CheckoutSuccess";
import QRMenuSection from "./components/QRMenuSection";
import RestaurantMap from "./components/RestaurantMap";
import RestaurantInfo from "./components/RestaurantInfo";
import TableIndicator from "./components/TableIndicator";
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

const buildWhatsappMessage = (orderData) => {
  const itemLines = orderData.items
    .map(
      ({ food, quantity }) =>
        `${quantity}x ${food.name} - ${formatWhatsappRupiah(food.price * quantity)}`
    )
    .join("\n");

  const tableLine = orderData.tableNumber ? `Table: ${orderData.tableNumber}\n` : "";
  const notesLine = orderData.orderNotes ? `\nNotes: ${orderData.orderNotes}\n` : "\n";

  return `New Order

Name: ${orderData.customerName}
Phone: ${orderData.phoneNumber}
${tableLine}
Items:
${itemLines}${notesLine}

Total: ${formatWhatsappRupiah(orderData.totalPrice)}

Thank you.`;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartBounceKey, setCartBounceKey] = useState(0);
  const [activePage, setActivePage] = useState("menu");
  const [tableNumber, setTableNumber] = useState(null);
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

  const triggerCartBounce = () => {
    setCartBounceKey((current) => current + 1);
  };

  const animateFlyToCart = (sourceImage, sourceRect) => {
    if (typeof window === "undefined" || !sourceRect) {
      triggerCartBounce();
      return;
    }

    const cartTarget = document.querySelector("[data-cart-icon='true']");
    if (!cartTarget) {
      triggerCartBounce();
      return;
    }

    const targetRect = cartTarget.getBoundingClientRect();
    const flyImage = document.createElement("img");
    flyImage.src = sourceImage;
    flyImage.className = "cart-fly-image";
    const startLeft = sourceRect.left + window.scrollX;
    const startTop = sourceRect.top + window.scrollY;
    const targetLeft = targetRect.left + window.scrollX;
    const targetTop = targetRect.top + window.scrollY;

    flyImage.style.left = `${startLeft}px`;
    flyImage.style.top = `${startTop}px`;
    flyImage.style.width = `${sourceRect.width}px`;
    flyImage.style.height = `${sourceRect.height}px`;
    document.body.appendChild(flyImage);

    const deltaX = targetLeft + targetRect.width / 2 - (startLeft + sourceRect.width / 2);
    const deltaY = targetTop + targetRect.height / 2 - (startTop + sourceRect.height / 2);

    window.requestAnimationFrame(() => {
      flyImage.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.18)`;
      flyImage.style.opacity = "0.2";
    });

    let isCleaned = false;
    const clearFlyImage = () => {
      if (isCleaned) {
        return;
      }
      isCleaned = true;
      flyImage.remove();
      triggerCartBounce();
    };

    flyImage.addEventListener("transitionend", clearFlyImage, { once: true });
    window.setTimeout(clearFlyImage, 620);
  };

  const handleAddToCart = (food, quantity = 1, options = {}) => {
    setCart((current) => ({
      ...current,
      [food.id]: (current[food.id] || 0) + quantity,
    }));

    if (options?.sourceRect && options?.sourceImage) {
      animateFlyToCart(options.sourceImage, options.sourceRect);
      return;
    }

    triggerCartBounce();
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
    const message = buildWhatsappMessage(orderPayload);
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

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const updateTableFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get("table")?.trim();
      setTableNumber(tableParam || null);
    };

    updateTableFromUrl();
    window.addEventListener("popstate", updateTableFromUrl);
    return () => window.removeEventListener("popstate", updateTableFromUrl);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar
        cartCount={cartCount}
        cartBounceKey={cartBounceKey}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        <TableIndicator tableNumber={tableNumber} />

        {activePage === "menu" && (
          <>
            <Hero />
            <PromoBanner />

            <Categories
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />

            <MenuSlider
              foods={filteredFoods}
              onFoodSelect={handleOpenFoodModal}
              onAddToCart={handleAddToCart}
              formatPrice={formatPrice}
            />

            <div className="mb-10 grid gap-6 lg:grid-cols-2">
              <RestaurantInfo />
              <RestaurantMap />
            </div>

            <QRMenuSection />
          </>
        )}

        {activePage === "checkout" && (
          <CheckoutPage
            items={cartItems}
            subtotal={subtotal}
            tableNumber={tableNumber}
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
