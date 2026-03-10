const DEFAULT_FOOD_IMAGE =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80";

const resolveImageUrl = (value) => {
  try {
    return new URL(value).toString();
  } catch {
    return DEFAULT_FOOD_IMAGE;
  }
};

const foods = [
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Coffee",
    description: "Rich espresso with steamed milk foam.",
    shortDescription: "Classic creamy coffee favorite.",
    price: 32000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "latte",
    name: "Latte",
    category: "Coffee",
    description: "Smooth espresso blended with silky steamed milk.",
    shortDescription: "Soft coffee with milk texture.",
    price: 34000,
    rating: 4.7,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "americano",
    name: "Americano",
    category: "Coffee",
    description: "Double espresso and hot water with balanced strength.",
    shortDescription: "Bold but clean coffee taste.",
    price: 29000,
    rating: 4.6,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "flat-white",
    name: "Flat White",
    category: "Coffee",
    description: "Velvety microfoam and espresso with a smooth finish.",
    shortDescription: "Silky texture and rich aroma.",
    price: 36000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    category: "Coffee",
    description: "Espresso, steamed milk, and caramel drizzle.",
    shortDescription: "Sweet caramel coffee treat.",
    price: 39000,
    rating: 4.9,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "iced-lemon-tea",
    name: "Iced Lemon Tea",
    category: "Drinks",
    description: "Fresh black tea with lemon slices and ice.",
    shortDescription: "Refreshing citrus iced tea.",
    price: 24000,
    rating: 4.6,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    category: "Drinks",
    description: "Premium matcha whisked with creamy milk.",
    shortDescription: "Earthy green tea latte.",
    price: 36000,
    rating: 4.7,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "chocolate-milk",
    name: "Chocolate Milk",
    category: "Drinks",
    description: "Chilled milk drink with rich chocolate flavor.",
    shortDescription: "Creamy sweet cocoa drink.",
    price: 30000,
    rating: 4.7,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "strawberry-soda",
    name: "Strawberry Soda",
    category: "Drinks",
    description: "Sparkling strawberry soda topped with fresh fruit.",
    shortDescription: "Fruity fizzy refreshment.",
    price: 28000,
    rating: 4.5,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "croissant",
    name: "Croissant",
    category: "Bakery",
    description: "Buttery pastry with flaky golden layers.",
    shortDescription: "Classic French baked delight.",
    price: 26000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a"
    ),
  },
  {
    id: "chocolate-croissant",
    name: "Chocolate Croissant",
    category: "Bakery",
    description: "Flaky croissant filled with melted dark chocolate.",
    shortDescription: "Sweet chocolate pastry layers.",
    price: 30000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "butter-toast",
    name: "Butter Toast",
    category: "Bakery",
    description: "Toasted bread with salted butter and honey glaze.",
    shortDescription: "Warm crisp buttery toast.",
    price: 22000,
    rating: 4.5,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "banana-bread",
    name: "Banana Bread",
    category: "Bakery",
    description: "Moist banana loaf with a hint of cinnamon.",
    shortDescription: "Soft baked banana loaf.",
    price: 28000,
    rating: 4.7,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    category: "Dessert",
    description: "Creamy vanilla cheesecake with biscuit crust.",
    shortDescription: "Rich and smooth dessert.",
    price: 42000,
    rating: 4.9,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    category: "Dessert",
    description: "Layered dark chocolate cake with ganache.",
    shortDescription: "Decadent cocoa indulgence.",
    price: 40000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    category: "Dessert",
    description: "Coffee-soaked ladyfingers with mascarpone cream.",
    shortDescription: "Italian coffee dessert classic.",
    price: 43000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "panna-cotta",
    name: "Panna Cotta",
    category: "Dessert",
    description: "Silky vanilla panna cotta with berry sauce.",
    shortDescription: "Light creamy chilled dessert.",
    price: 39000,
    rating: 4.7,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "chicken-sandwich",
    name: "Chicken Sandwich",
    category: "Food",
    description: "Grilled chicken, greens, and signature mayo sauce.",
    shortDescription: "Savory grilled chicken bite.",
    price: 47000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1592415499556-74fcb9f18667?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "beef-burger",
    name: "Beef Burger",
    category: "Food",
    description: "Juicy beef patty with cheese and special sauce.",
    shortDescription: "Classic gourmet burger.",
    price: 56000,
    rating: 4.9,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "chicken-rice-bowl",
    name: "Chicken Rice Bowl",
    category: "Food",
    description: "Soy glazed chicken with rice and vegetables.",
    shortDescription: "Hearty bowl for lunch.",
    price: 50000,
    rating: 4.7,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "pasta-carbonara",
    name: "Pasta Carbonara",
    category: "Food",
    description: "Creamy pasta with smoked beef and parmesan.",
    shortDescription: "Creamy comforting pasta.",
    price: 58000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "truffle-fries",
    name: "Truffle Fries",
    category: "Food",
    description: "Crispy fries tossed with truffle oil and parmesan.",
    shortDescription: "Crispy fries with truffle aroma.",
    price: 36000,
    rating: 4.7,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1200&q=80"
    ),
  },
    {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "Food",
    description: "Toasted sourdough topped with smashed avocado and olive oil.",
    shortDescription: "Healthy creamy avocado toast.",
    price: 42000,
    rating: 4.7,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "iced-caramel-latte",
    name: "Iced Caramel Latte",
    category: "Coffee",
    description: "Chilled espresso with milk and caramel syrup.",
    shortDescription: "Sweet iced caramel coffee.",
    price: 38000,
    rating: 4.8,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin",
    category: "Bakery",
    description: "Soft baked muffin filled with juicy blueberries.",
    shortDescription: "Sweet fluffy berry muffin.",
    price: 27000,
    rating: 4.6,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "iced-peach-tea",
    name: "Iced Peach Tea",
    category: "Drinks",
    description: "Refreshing iced tea infused with sweet peach flavor.",
    shortDescription: "Fruity refreshing iced tea.",
    price: 26000,
    rating: 4.6,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1200&q=80"
    ),
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    category: "Dessert",
    description: "Moist red velvet cake layered with cream cheese frosting.",
    shortDescription: "Classic creamy red velvet dessert.",
    price: 45000,
    rating: 4.9,
    image: resolveImageUrl(
      "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1200&q=80"
    ),
  },
];

export default foods;
