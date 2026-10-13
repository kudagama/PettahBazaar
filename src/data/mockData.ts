import { Shop, Product } from "@/types";

// Pettah, Colombo GPS center: ~6.9355° N, 79.8530° E
export const PETTAH_CENTER = { lat: 6.9355, lng: 79.853 };

export const shops: Shop[] = [
  {
    id: "shop-001",
    name: "Al-Ameen Footwear & Leather",
    ownerName: "Mr. Mohamed Al-Ameen",
    description:
      "Three generations of footwear and genuine leather goods in the heart of Pettah. Formal Oxford shoes, leather belts, and handcrafted sandals sourced directly from local artisans.",
    category: "Shoes & Footwear",
    address: "No. 47, Main Street, Pettah, Colombo 11",
    area: "Main Street",
    stallNumber: "Stall #47-B",
    phone: "+94 11 234 5678",
    whatsapp: "+94 77 234 5678",
    email: "alameen.footwear@gmail.com",
    openHours: "Mon–Sat: 8:00 AM – 7:00 PM, Sun: 9:00 AM – 3:00 PM",
    coordinates: { lat: 6.9368, lng: 79.8521 },
    distance: "120m",
    rating: 4.7,
    reviewCount: 342,
    verified: true,
    imageUrl: "https://picsum.photos/seed/shop1/400/300",
    specialties: ["Leather Shoes", "Formal Footwear", "Leather Wallets & Belts"],
    established: 1987,
  },
  {
    id: "shop-002",
    name: "Lanka Tech & Mobile City",
    ownerName: "Mr. Sanjay Perera",
    description:
      "Pettah's go-to tech emporium on 1st Cross Street. Wholesale & retail electronics, original smartphone accessories, Bluetooth headphones, smartwatches, and cables at bazaar prices.",
    category: "Electronics & Gadgets",
    address: "No. 12, 1st Cross Street, Pettah, Colombo 11",
    area: "Cross Street",
    stallNumber: "Shop #12-Tech",
    phone: "+94 11 345 6789",
    whatsapp: "+94 76 345 6789",
    openHours: "Mon–Sat: 8:30 AM – 8:00 PM",
    coordinates: { lat: 6.9341, lng: 79.8548 },
    distance: "150m",
    rating: 4.8,
    reviewCount: 420,
    verified: true,
    imageUrl: "https://picsum.photos/seed/shoptech/400/300",
    specialties: ["Smartwatch", "Wireless Audio", "Mobile Accessories", "Fast Chargers"],
    established: 2008,
  },
  {
    id: "shop-003",
    name: "Raja Silks & Textile Emporium",
    ownerName: "Ms. Priya Jayawardena",
    description:
      "Renowned 2nd Cross Street textile merchant. Authentic Kanchipuram silk sarees, pure linen fabrics, readymade shirts, festive kurtas, and custom tailoring materials.",
    category: "Clothes & Textiles",
    address: "No. 88, 2nd Cross Street, Pettah, Colombo 11",
    area: "Cross Street",
    stallNumber: "Stall #88-Silk",
    phone: "+94 11 456 7890",
    whatsapp: "+94 75 456 7890",
    email: "rajasilks.pettah@gmail.com",
    openHours: "Mon–Sun: 9:00 AM – 7:30 PM",
    coordinates: { lat: 6.9378, lng: 79.8509 },
    distance: "240m",
    rating: 4.9,
    reviewCount: 512,
    verified: true,
    imageUrl: "https://picsum.photos/seed/shopsilk/400/300",
    specialties: ["Silk Sarees", "Linen Shirts", "Batik Shirts", "Cotton Fabrics"],
    established: 1974,
  },
  {
    id: "shop-004",
    name: "Old Moor Spice & Ayurvedic Traders",
    ownerName: "Mr. Farook Cassim",
    description:
      "World-famous Ceylon spices directly from Old Moor Street traders. Grade-A Ceylon cinnamon quills, black pepper, cardamom, whole cloves, and certified pure local bee honey.",
    category: "Spices & Grocery",
    address: "No. 115, Old Moor Street, Pettah, Colombo 11",
    area: "Main Street",
    stallNumber: "Stall #115-Spice",
    phone: "+94 11 567 8901",
    whatsapp: "+94 71 567 8901",
    openHours: "Mon–Sat: 7:30 AM – 6:30 PM",
    coordinates: { lat: 6.935, lng: 79.8535 },
    distance: "310m",
    rating: 4.9,
    reviewCount: 680,
    verified: true,
    imageUrl: "https://picsum.photos/seed/shopspice/400/300",
    specialties: ["Ceylon Cinnamon", "Cardamom", "Black Pepper", "Local Pure Honey"],
    established: 1965,
  },
  {
    id: "shop-005",
    name: "Swarna Mahal Jewellers & Gold Crafts",
    ownerName: "Mr. Thilagaraj Nadar",
    description:
      "Located in Pettah's sparkling Sea Street jewellery haven. Traditional 22K gold rings, intricate silver anklets, gemstone jewelry, and custom goldsmith craftsmanship.",
    category: "Jewellery & Watches",
    address: "No. 64, Sea Street, Pettah, Colombo 11",
    area: "Sea Street",
    stallNumber: "Showroom #64",
    phone: "+94 11 678 9012",
    whatsapp: "+94 77 678 9012",
    openHours: "Mon–Sat: 9:30 AM – 7:00 PM",
    coordinates: { lat: 6.9362, lng: 79.8562 },
    distance: "390m",
    rating: 4.8,
    reviewCount: 395,
    verified: true,
    imageUrl: "https://picsum.photos/seed/shopgold/400/300",
    specialties: ["22K Gold Jewellery", "Silver Items", "Luxury Watches", "Custom Crafting"],
    established: 1982,
  },
  {
    id: "shop-006",
    name: "Metro Bags & Travel Bazaar",
    ownerName: "Mr. Kasun Karunaratne",
    description:
      "Wholesale & retail bags on Keyzer Street. Sturdy waterproof backpacks, durable hard-shell travel luggage, school bags, stylish leather handbags, and laptop sleeves.",
    category: "Bags & Luggage",
    address: "No. 9, Keyzer Street, Pettah, Colombo 11",
    area: "Keyzer Street",
    stallNumber: "Stall #9-Ground",
    phone: "+94 11 789 0123",
    whatsapp: "+94 70 789 0123",
    email: "metrobags.pettah@gmail.com",
    openHours: "Mon–Sun: 8:30 AM – 8:00 PM",
    coordinates: { lat: 6.9332, lng: 79.852 },
    distance: "280m",
    rating: 4.6,
    reviewCount: 230,
    verified: true,
    imageUrl: "https://picsum.photos/seed/shopbags/400/300",
    specialties: ["Travel Suitcases", "School Backpacks", "Office Bags", "Luggage Accessories"],
    established: 2012,
  },
];

export const products: Product[] = [
  // Al-Ameen Footwear & Leather products
  {
    id: "prod-001",
    name: "Classic Black Oxford Leather Shoes",
    category: "Formal",
    tags: ["leather", "black", "formal", "oxford", "dress shoes", "men"],
    price: 4500,
    originalPrice: 5500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Jet Black", hex: "#1a1a1a" },
      { name: "Dark Brown", hex: "#3d1f00" },
    ],
    description:
      "Premium genuine leather Oxford shoes crafted with meticulous attention to detail. Features a Goodyear-welted construction for longevity, cushioned insole for all-day comfort, and a classic cap-toe design that never goes out of style. Perfect for office wear, formal events, and business meetings.",
    material: "Genuine Cowhide Leather",
    brand: "Al-Ameen Private Label",
    inStock: true,
    stockCount: 34,
    shopId: "shop-001",
    rating: 4.8,
    reviewCount: 89,
    featured: true,
  },
  {
    id: "prod-002",
    name: "Genuine Brown Leather Loafers",
    category: "Casual",
    tags: ["leather", "brown", "loafers", "casual", "men", "slip-on"],
    price: 3800,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1582895163997-6a4a15998fbf?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Cognac Brown", hex: "#8b4513" },
      { name: "Dark Tan", hex: "#a0522d" },
    ],
    description:
      "Slip into effortless style with these handcrafted genuine leather loafers. The penny strap detail adds a timeless touch, while the soft leather lining ensures maximum comfort. A versatile shoe that pairs beautifully with both formal trousers and casual chinos.",
    material: "Full-Grain Leather",
    brand: "Al-Ameen Private Label",
    inStock: true,
    stockCount: 22,
    shopId: "shop-001",
    rating: 4.6,
    reviewCount: 54,
  },
  {
    id: "prod-003",
    name: "Formal Patent Leather Derby",
    category: "Formal",
    tags: ["patent leather", "formal", "derby", "black", "men", "wedding"],
    price: 6200,
    originalPrice: 7500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [{ name: "Glossy Black", hex: "#0d0d0d" }],
    description:
      "Stand out at any formal occasion with these stunning patent leather Derby shoes. The mirror-shine finish commands attention, while the padded leather collar ensures a comfortable fit. Ideal for weddings, gala events, and black-tie occasions.",
    material: "Patent Leather",
    brand: "Al-Ameen Premium",
    inStock: true,
    stockCount: 12,
    shopId: "shop-001",
    rating: 4.9,
    reviewCount: 37,
    featured: true,
  },

  // Sports & Outdoor products
  {
    id: "prod-004",
    name: "AeroRun Pro Running Shoes",
    category: "Sports",
    tags: ["running", "sports", "athletic", "jogging", "men", "women", "gym"],
    price: 5800,
    originalPrice: 7200,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Electric Blue", hex: "#0066ff" },
      { name: "Neon Green", hex: "#39ff14" },
      { name: "Stealth Black", hex: "#1a1a1a" },
    ],
    description:
      "Engineered for performance, the AeroRun Pro features an ultra-responsive foam midsole that returns energy with every stride. The breathable mesh upper keeps feet cool during intense workouts, while the strategically placed rubber outsole offers superior traction on all surfaces.",
    material: "Engineered Mesh + EVA Foam",
    brand: "AeroRun",
    inStock: true,
    stockCount: 45,
    shopId: "shop-002",
    rating: 4.7,
    reviewCount: 112,
    featured: true,
  },
  {
    id: "prod-005",
    name: "FlexTrail Waterproof Hiking Boots",
    category: "Outdoor",
    tags: ["hiking", "boots", "outdoor", "trail", "waterproof", "men"],
    price: 7500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549298916-f52d724204b4?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Khaki", hex: "#c3a869" },
      { name: "Forest Green", hex: "#228b22" },
    ],
    description:
      "Conquer any terrain with the FlexTrail Hiking Boots. Waterproof membrane keeps feet dry in wet conditions, while the aggressive lug outsole provides grip on rocky trails. The supportive ankle collar and cushioned midsole ensure fatigue-free adventures all day long.",
    material: "Nubuck Leather + Waterproof Membrane",
    brand: "FlexTrail",
    inStock: true,
    stockCount: 18,
    shopId: "shop-002",
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: "prod-006",
    name: "Court Ace Tennis & Trainer Shoes",
    category: "Sports",
    tags: ["tennis", "court shoes", "sports", "athletic", "grip"],
    price: 4200,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "White/Blue", hex: "#ffffff" },
      { name: "White/Red", hex: "#ff0000" },
    ],
    description:
      "Designed specifically for court sports, the Court Ace features a herringbone outsole pattern for optimal grip on hard and clay courts. The reinforced toe cap protects against drag, while the breathable upper ensures your feet stay fresh throughout the match.",
    material: "Synthetic Leather + Mesh",
    brand: "Court Ace",
    inStock: true,
    stockCount: 28,
    shopId: "shop-002",
    rating: 4.4,
    reviewCount: 43,
  },

  // Women's footwear
  {
    id: "prod-007",
    name: "Stiletto Evening Pointed Heels",
    category: "Women's Fashion",
    tags: ["heels", "women", "evening", "formal", "stiletto", "party"],
    price: 3500,
    originalPrice: 4200,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: [
      { name: "Classic Black", hex: "#1a1a1a" },
      { name: "Nude Beige", hex: "#d4a574" },
      { name: "Ruby Red", hex: "#9b1c1c" },
    ],
    description:
      "Elevate any evening look with these elegant stiletto heels. The 10cm heel height creates a stunning silhouette, while the padded toe box ensures wearability throughout long events. The pointed toe design adds a touch of sophistication to any outfit.",
    material: "Faux Leather with Satin Lining",
    brand: "Colombo Couture",
    inStock: true,
    stockCount: 31,
    shopId: "shop-003",
    rating: 4.3,
    reviewCount: 78,
    featured: true,
  },
  {
    id: "prod-008",
    name: "Boho Braided Leather Flat Sandals",
    category: "Women's Casual",
    tags: ["sandals", "women", "boho", "casual", "summer", "braided"],
    price: 2200,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    colors: [
      { name: "Tan", hex: "#d2691e" },
      { name: "Dusty Rose", hex: "#c9a89c" },
    ],
    description:
      "Perfect for casual outings, these braided leather sandals offer a bohemian vibe with everyday comfort. The adjustable ankle strap provides a secure fit, while the cushioned footbed ensures all-day comfort on warm Sri Lankan days.",
    material: "Genuine Leather Braided Straps",
    brand: "Coastal Comfort",
    inStock: true,
    stockCount: 55,
    shopId: "shop-003",
    rating: 4.5,
    reviewCount: 92,
  },
  {
    id: "prod-009",
    name: "Chunky Platform Sneakers",
    category: "Women's Sneakers",
    tags: ["platform", "sneakers", "women", "trendy", "chunky", "casual"],
    price: 4800,
    originalPrice: 5500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: [
      { name: "Triple White", hex: "#f5f5f5" },
      { name: "Pastel Pink", hex: "#ffb6c1" },
    ],
    description:
      "Make a bold fashion statement with these chunky platform sneakers. The 5cm platform sole adds height while the cushioned midsole keeps you comfortable. The mixed-material upper combines leather and mesh for a modern, streetwear-inspired look.",
    material: "Synthetic Leather + Mesh",
    brand: "Trend Collective",
    inStock: false,
    stockCount: 0,
    shopId: "shop-003",
    rating: 4.2,
    reviewCount: 56,
  },

  // Bata Wholesale Outlet products
  {
    id: "prod-010",
    name: "Bata School Shoes (Black)",
    category: "School Shoes",
    tags: ["school", "children", "kids", "formal", "black", "durable"],
    price: 1800,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["28", "29", "30", "31", "32", "33", "34", "35", "36", "37"],
    colors: [{ name: "Glossy Black", hex: "#1a1a1a" }],
    description:
      "The most trusted school shoe in Sri Lanka. These Bata school shoes are built to withstand the daily rigors of school life. Featuring a scuff-resistant toe cap, durable sole, and easy-to-clean surface. Available in bulk orders for schools.",
    material: "Durable Synthetic Leather",
    brand: "Bata",
    inStock: true,
    stockCount: 200,
    shopId: "shop-001",
    rating: 4.6,
    reviewCount: 234,
    featured: false,
  },
  {
    id: "prod-011",
    name: "Bata Power Work Boots",
    category: "Work & Safety",
    tags: ["work", "boots", "safety", "steel-toe", "industrial", "men"],
    price: 5200,
    originalPrice: 6000,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    colors: [{ name: "Brown", hex: "#6b3a1f" }],
    description:
      "Bata Power safety boots engineered for tough industrial environments. Features a steel toe cap that meets EN ISO 20345 safety standards, oil-resistant outsole, and anti-static protection. The water-resistant upper ensures dry comfort in demanding conditions.",
    material: "Full-Grain Leather with Steel Toe Cap",
    brand: "Bata Power",
    inStock: true,
    stockCount: 67,
    shopId: "shop-001",
    rating: 4.7,
    reviewCount: 148,
  },

  // Handcrafted Leather
  {
    id: "prod-012",
    name: "Handcrafted Brogue Oxford",
    category: "Handcrafted",
    tags: ["brogue", "oxford", "handcrafted", "leather", "formal", "men", "custom"],
    price: 8500,
    originalPrice: 10000,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Rich Burgundy", hex: "#722f37" },
      { name: "Deep Tan", hex: "#8b4513" },
      { name: "Midnight Black", hex: "#1a1a1a" },
    ],
    description:
      "Each pair of these handcrafted brogue Oxfords is a work of art, taking 3-4 days to complete by master cobbler Zahir Hussain. The full-grain leather upper is hand-stitched with waxed thread, and the ornate brogue detailing is punched by hand. Custom sizing available.",
    material: "Full-Grain Vegetable-Tanned Leather",
    brand: "Zahir's Artisan Collection",
    inStock: true,
    stockCount: 8,
    shopId: "shop-001",
    rating: 4.9,
    reviewCount: 63,
    featured: true,
  },
  {
    id: "prod-013",
    name: "Custom Monk Strap Leather Shoes",
    category: "Handcrafted",
    tags: ["monk strap", "custom", "handcrafted", "leather", "formal", "unique"],
    price: 9200,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1582895163997-6a4a15998fbf?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Mahogany", hex: "#c04000" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    description:
      "The double monk strap shoe, reimagined by Zahir. Two golden buckles fasten the shoe with precision, while the squared toe box gives a modern, fashion-forward silhouette. Custom embossing and initials available on request.",
    material: "Italian Calf Leather",
    brand: "Zahir's Artisan Collection",
    inStock: true,
    stockCount: 5,
    shopId: "shop-001",
    rating: 4.8,
    reviewCount: 41,
  },

  // Sneakers
  {
    id: "prod-014",
    name: "Retro Classic High-Top Sneakers",
    category: "Sneakers",
    tags: ["sneakers", "high-top", "retro", "classic", "streetwear", "men", "women"],
    price: 6500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Classic White", hex: "#f5f5f5" },
      { name: "All Black", hex: "#1a1a1a" },
      { name: "Red & White", hex: "#ff0000" },
    ],
    description:
      "Pay homage to sneaker culture with these retro high-top classics. The canvas upper with vulcanized rubber sole is a timeless formula, while the padded ankle collar provides added support. A must-have for any sneaker collection.",
    material: "Premium Canvas + Vulcanized Rubber",
    brand: "RetroKicks",
    inStock: true,
    stockCount: 33,
    shopId: "shop-002",
    rating: 4.6,
    reviewCount: 87,
    featured: true,
  },
  {
    id: "prod-015",
    name: "Limited Edition Urban Runner",
    category: "Sneakers",
    tags: ["limited", "urban", "runner", "sneakers", "exclusive", "hype"],
    price: 12000,
    originalPrice: 15000,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Gradient Sunset", hex: "#ff6b6b" },
      { name: "Deep Ocean", hex: "#003d82" },
    ],
    description:
      "Extremely limited — only 50 pairs available in Sri Lanka. These Urban Runners feature a knitted sock-like upper for a second-skin fit, a carbon-fiber plate in the midsole for explosive energy return, and a reflective 3M detailing that lights up at night.",
    material: "Primeknit Upper + Carbon Fiber Plate",
    brand: "UrbanElite",
    inStock: true,
    stockCount: 4,
    shopId: "shop-002",
    rating: 4.9,
    reviewCount: 29,
    featured: true,
  },
  {
    id: "prod-016",
    name: "Pure Linen Casual Button-Down Shirt",
    category: "Clothes",
    tags: ["clothes", "shirt", "linen", "casual", "summer", "men"],
    price: 3200,
    originalPrice: 4200,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sky Blue", hex: "#87ceeb" },
      { name: "Crisp White", hex: "#ffffff" },
      { name: "Olive Green", hex: "#556b2f" },
    ],
    description:
      "Crafted from 100% lightweight organic linen, ideal for warm tropical weather. Pre-washed for an ultra-soft feel and relaxed fit. Perfect for casual Fridays or weekends out.",
    material: "100% Organic Linen",
    brand: "IslandLoom",
    inStock: true,
    stockCount: 18,
    shopId: "shop-003",
    rating: 4.7,
    reviewCount: 42,
    featured: true,
  },
  {
    id: "prod-017",
    name: "Classic Denim Slim-Fit Jeans",
    category: "Clothes",
    tags: ["clothes", "jeans", "denim", "pants", "casual", "men"],
    price: 4200,
    originalPrice: 5000,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Dark Indigo", hex: "#1c2841" },
      { name: "Faded Blue", hex: "#4682b4" },
    ],
    description:
      "Durable stretch denim engineered with reinforced stitching and rivets. Retains shape all day while offering flexible movement and classic five-pocket styling.",
    material: "98% Cotton, 2% Elastane",
    brand: "Colombo Denim Co.",
    inStock: true,
    stockCount: 25,
    shopId: "shop-003",
    rating: 4.6,
    reviewCount: 38,
  },
  {
    id: "prod-018",
    name: "Noise-Cancelling Wireless Earbuds Pro",
    category: "Electronics",
    tags: ["electronics", "earbuds", "audio", "bluetooth", "wireless", "gadgets"],
    price: 8500,
    originalPrice: 11000,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["Universal"],
    colors: [
      { name: "Matte Black", hex: "#111111" },
      { name: "Gloss White", hex: "#f8f9fa" },
    ],
    description:
      "Active Noise Cancellation with transparency mode, deep bass drivers, and IPX5 sweat resistance. Enjoy up to 30 hours total battery life with fast Type-C charging case.",
    material: "Impact-Resistant Polycarbonate",
    brand: "SoundWave",
    inStock: true,
    stockCount: 15,
    shopId: "shop-002",
    rating: 4.8,
    reviewCount: 76,
    featured: true,
  },
  {
    id: "prod-019",
    name: "Ultra-Fast 65W GaN Multi-Port Charger",
    category: "Electronics",
    tags: ["electronics", "charger", "adapter", "gan", "usb-c", "fast-charge"],
    price: 4900,
    originalPrice: 6200,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["Compact"],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Space Gray", hex: "#4b4f56" },
    ],
    description:
      "Gallium Nitride (GaN) technology provides 65W charging for laptops, tablets, and phones simultaneously with dual USB-C and one USB-A port with surge protection.",
    material: "Fireproof ABS Plastic",
    brand: "VoltTech",
    inStock: true,
    stockCount: 18,
    shopId: "shop-002",
    rating: 4.5,
    reviewCount: 31,
  },
  {
    id: "prod-020",
    name: "Pure Ceylon Cinnamon Alba Grade (100g Pack)",
    category: "Spices",
    tags: ["spices", "cinnamon", "ceylon", "alba", "ayurveda", "cooking", "organic"],
    price: 1850,
    originalPrice: 2200,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["100g", "250g", "500g", "1kg"],
    colors: [{ name: "Golden Tan", hex: "#c68a4c" }],
    description:
      "Finest Alba grade true Ceylon cinnamon sourced directly from southern estates and packaged on Old Moor Street. Distinct sweet aroma, thin quill layers, and rich in natural antioxidants.",
    material: "100% Pure Ceylon Cinnamon (Cinnamomum Verum)",
    brand: "Old Moor Spice Co.",
    inStock: true,
    stockCount: 85,
    shopId: "shop-004",
    rating: 4.9,
    reviewCount: 142,
    featured: true,
  },
  {
    id: "prod-021",
    name: "Whole Black Pepper & Green Cardamom Combo (250g)",
    category: "Spices",
    tags: ["spices", "black pepper", "cardamom", "ceylon spices", "grocery", "curry"],
    price: 2450,
    originalPrice: 2900,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["250g Pack", "500g Pack"],
    colors: [{ name: "Natural", hex: "#3b302a" }],
    description:
      "Sun-dried organic black peppercorns paired with aromatic Jumbo green cardamom pods from the central hills. Hand-cleaned and freshly vacuum-sealed for maximum pungent flavor.",
    material: "Natural Spices",
    brand: "Old Moor Spice Co.",
    inStock: true,
    stockCount: 40,
    shopId: "shop-004",
    rating: 4.8,
    reviewCount: 88,
  },
  {
    id: "prod-022",
    name: "Pure Bee Honey - Raw Forest Honey (750ml Bottle)",
    category: "Spices",
    tags: ["honey", "bee honey", "organic", "ayurveda", "sweet", "grocery"],
    price: 3200,
    originalPrice: 3800,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["750ml Bottle", "375ml Bottle"],
    colors: [{ name: "Amber Gold", hex: "#ffbf00" }],
    description:
      "100% unpasteurized wild bee honey harvested by indigenous gatherers. Free from added sugars or preservatives. Used widely in Ayurvedic healing and natural wellness.",
    material: "100% Pure Forest Honey",
    brand: "Lanka Nectar",
    inStock: true,
    stockCount: 22,
    shopId: "shop-004",
    rating: 4.9,
    reviewCount: 95,
  },
  {
    id: "prod-023",
    name: "Traditional 22K Gold Plated Peacock Bangle Pair",
    category: "Jewellery",
    tags: ["jewellery", "gold", "bangles", "wedding", "traditional", "sea street", "women"],
    price: 6800,
    originalPrice: 8500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1611591475879-1100f40d85a1?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["2.4", "2.6", "2.8"],
    colors: [
      { name: "22K Gold Finish", hex: "#ffd700" },
      { name: "Antique Ruby Gold", hex: "#d4af37" },
    ],
    description:
      "Handcrafted on Pettah's famed Sea Street. Features micro-carved peacock motifs with micro-pavé ruby synthetic stone accents. High-durability micro gold plating guaranteed not to tarnish easily.",
    material: "Brass Core with 22K Micro Gold Plating",
    brand: "Swarna Mahal",
    inStock: true,
    stockCount: 16,
    shopId: "shop-005",
    rating: 4.8,
    reviewCount: 64,
    featured: true,
  },
  {
    id: "prod-024",
    name: "Classic Chronograph Men's Stainless Steel Watch",
    category: "Jewellery",
    tags: ["jewellery", "watch", "watches", "men", "chronograph", "steel", "gift"],
    price: 7900,
    originalPrice: 9800,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["42mm Dial"],
    colors: [
      { name: "Silver & Emerald Green", hex: "#004d40" },
      { name: "Silver & Midnight Blue", hex: "#0d47a1" },
    ],
    description:
      "Water-resistant quartz chronograph watch with hardened mineral crystal glass, stainless steel link bracelet, and working tachymeter stopwatch sub-dials. Elegant business style.",
    material: "316L Stainless Steel & Mineral Glass",
    brand: "SeaStreet Chrono",
    inStock: true,
    stockCount: 12,
    shopId: "shop-005",
    rating: 4.7,
    reviewCount: 41,
  },
  {
    id: "prod-025",
    name: "Waterproof Multi-Compartment Laptop Backpack (35L)",
    category: "Bags",
    tags: ["bags", "backpack", "laptop bag", "travel", "waterproof", "office", "luggage"],
    price: 4600,
    originalPrice: 5800,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["35 Liters (fits 16 inch laptop)"],
    colors: [
      { name: "Charcoal Black", hex: "#222222" },
      { name: "Navy Blue", hex: "#1e3a8a" },
    ],
    description:
      "High-density water-resistant Oxford fabric with padded laptop sleeve, USB charging pass-through port, ergonomic breathable back mesh, and anti-theft hidden pocket.",
    material: "Waterproof Oxford Fabric & Nylon",
    brand: "MetroGear",
    inStock: true,
    stockCount: 30,
    shopId: "shop-006",
    rating: 4.7,
    reviewCount: 83,
    featured: true,
  },
  {
    id: "prod-026",
    name: "Hard-Shell 4-Wheel Expandable Travel Trolley (24 Inch)",
    category: "Bags",
    tags: ["bags", "luggage", "travel", "suitcase", "trolley", "vacation"],
    price: 11500,
    originalPrice: 14500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["20 Inch (Cabin)", "24 Inch (Medium)", "28 Inch (Large)"],
    colors: [
      { name: "Champagne Gold", hex: "#fad6a5" },
      { name: "Gunmetal Grey", hex: "#4a4a4a" },
    ],
    description:
      "Ultra-durable ABS+PC hard shell with 360-degree silent spinner wheels, built-in 3-digit combination TSA lock, and telescopic aluminum handle. Best wholesale price on Keyzer Street.",
    material: "Polycarbonate ABS Compound",
    brand: "Voyager Pro",
    inStock: true,
    stockCount: 14,
    shopId: "shop-006",
    rating: 4.9,
    reviewCount: 52,
  },
  {
    id: "prod-027",
    name: "Kanchipuram Bridal Silk Saree with Zari Pallu",
    category: "Clothes",
    tags: ["clothes", "saree", "silk", "bridal", "wedding", "textiles", "women", "indian"],
    price: 13500,
    originalPrice: 16500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["6.2 Meters with Blouse Piece"],
    colors: [
      { name: "Crimson Red & Gold", hex: "#990000" },
      { name: "Royal Magenta", hex: "#8b008b" },
      { name: "Peacock Blue", hex: "#005f73" },
    ],
    description:
      "Exquisite soft silk saree woven with traditional temple borders and heavy metallic gold zari pallu. Sourced directly from South Indian master weavers to 2nd Cross Street.",
    material: "Blended Art Silk with Gold Zari",
    brand: "Raja Silks Collection",
    inStock: true,
    stockCount: 15,
    shopId: "shop-003",
    rating: 4.9,
    reviewCount: 78,
    featured: true,
  },
  {
    id: "prod-028",
    name: "AMOLED Display Bluetooth Calling Smartwatch",
    category: "Electronics",
    tags: ["electronics", "smartwatch", "gadgets", "fitness", "bluetooth", "watch"],
    price: 6500,
    originalPrice: 8500,
    currency: "LKR",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=700&auto=format&fit=crop&q=80",
    ],
    sizes: ["Standard (Interchangeable 22mm Strap)"],
    colors: [
      { name: "Midnight Black", hex: "#111111" },
      { name: "Silver Metal", hex: "#c0c0c0" },
    ],
    description:
      "1.43-inch crystal AMOLED display with always-on mode, clear Bluetooth calling with mic/speaker, 100+ sports modes, heart rate / SpO2 sensors, and 7-day battery life.",
    material: "Zinc Alloy Case + Silicone Strap",
    brand: "LankaTech Gear",
    inStock: true,
    stockCount: 20,
    shopId: "shop-002",
    rating: 4.6,
    reviewCount: 110,
    featured: true,
  },
];

export const mainCategories = [
  "All",
  "Shoes",
  "Clothes",
  "Electronics",
  "Spices",
  "Jewellery",
  "Bags",
];

export const shopLocations = [
  "All Locations",
  "Main Street",
  "Cross Street",
  "Keyzer Street",
  "Sea Street",
];

export const categories = [
  "All",
  "Shoes",
  "Clothes",
  "Electronics",
  "Spices",
  "Jewellery",
  "Bags",
  "Formal",
  "Casual",
  "Sports",
  "Women's Fashion",
  "Sneakers",
];

export const getShopById = (id: string): Shop | undefined =>
  shops.find((s) => s.id === id);

export const getProductsByShop = (shopId: string): Product[] =>
  products.filter((p) => p.shopId === shopId);

export const searchProducts = (
  query: string,
  category: string = "All",
  minPrice: number = 0,
  maxPrice: number = Infinity,
  sortBy: string = "relevance",
  location: string = "All Locations"
): Product[] => {
  let results = products;

  // Filter by search query
  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter((p) => {
      const shop = shops.find((s) => s.id === p.shopId);
      return (
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.brand?.toLowerCase().includes(q) ?? false) ||
        (shop?.name.toLowerCase().includes(q) ?? false) ||
        (shop?.area.toLowerCase().includes(q) ?? false) ||
        (shop?.stallNumber?.toLowerCase().includes(q) ?? false)
      );
    });
  }

  // Filter by category
  if (category !== "All") {
    results = results.filter((p) => {
      if (category === "Shoes") {
        return [
          "Formal",
          "Casual",
          "Sports",
          "Women's Fashion",
          "Women's Casual",
          "Women's Sneakers",
          "School Shoes",
          "Work & Safety",
          "Handcrafted",
          "Sneakers",
          "Shoes",
        ].includes(p.category);
      }
      return (
        p.category.toLowerCase() === category.toLowerCase() ||
        p.tags.some((t) => t.toLowerCase() === category.toLowerCase())
      );
    });
  }

  // Filter by Shop Location
  if (location && location !== "All Locations") {
    results = results.filter((p) => {
      const shop = shops.find((s) => s.id === p.shopId);
      return shop?.area.toLowerCase().includes(location.toLowerCase());
    });
  }

  // Filter by price
  results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // Sort
  switch (sortBy) {
    case "price_asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "distance":
      results.sort((a, b) => {
        const shopA = shops.find((s) => s.id === a.shopId);
        const shopB = shops.find((s) => s.id === b.shopId);
        const distA = parseFloat(shopA?.distance ?? "999");
        const distB = parseFloat(shopB?.distance ?? "999");
        return distA - distB;
      });
      break;
    default:
      // Relevance: featured first, then by rating
      results.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }

  return results;
};
