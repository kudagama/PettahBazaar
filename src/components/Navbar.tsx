"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  ShoppingBag,
  Sparkles,
  X,
  Phone,
  Navigation,
  Store,
  Layers,
  ChevronDown,
  Clock,
  ShieldCheck,
  TrendingUp,
  Percent,
  Menu,
  ArrowRight,
  Flame,
  Radio,
  User as UserIcon,
} from "lucide-react";
import { products, shops, mainCategories, shopLocations } from "@/data/mockData";
import { useMarketplace } from "@/context/MarketplaceContext";

interface NavbarProps {
  onSearch: (query: string) => void;
  onCategorySelect?: (cat: string) => void;
  onLocationSelect?: (loc: string) => void;
  cartCount?: number;
  activePortal?: "customer" | "seller";
  onSwitchPortal?: (portal: "customer" | "seller") => void;
}

const MEGA_CATEGORIES = [
  {
    name: "Clothes & Sarees",
    query: "Clothes",
    icon: "🥻",
    popular: ["Kanchipuram Silk Saree", "Pure Linen Shirt", "Denim Jeans"],
    street: "2nd Cross Street",
    badge: "50+ Vendors",
  },
  {
    name: "Electronics & Audio",
    query: "Electronics",
    icon: "⚡",
    popular: ["AMOLED Smartwatch", "Wireless Earbuds Pro", "65W GaN Charger"],
    street: "1st Cross Street",
    badge: "Wholesale & Retail",
  },
  {
    name: "Ceylon Spices",
    query: "Spices",
    icon: "🌿",
    popular: ["Alba Cinnamon Quills", "Cardamom & Pepper", "Wild Bee Honey"],
    street: "Old Moor Street",
    badge: "Export Quality",
  },
  {
    name: "Sea Street Gold",
    query: "Jewellery",
    icon: "💎",
    popular: ["22K Gold Bangles", "Chronograph Watch", "Gemstone Rings"],
    street: "Sea Street",
    badge: "Traditional Goldsmiths",
  },
  {
    name: "Bags & Luggage",
    query: "Bags",
    icon: "🎒",
    popular: ["Hard-Shell Travel Trolley", "Waterproof Laptop Backpack", "Duffel Bags"],
    street: "Keyzer Street",
    badge: "Direct Importers",
  },
  {
    name: "Shoes & Footwear",
    query: "Shoes",
    icon: "👞",
    popular: ["Leather Oxford Shoes", "Penny Loafers", "Athletic Running Shoes"],
    street: "Main Street",
    badge: "Handcrafted & Bata",
  },
];

export default function Navbar({
  onSearch,
  onCategorySelect,
  onLocationSelect,
  activePortal = "customer",
  onSwitchPortal,
}: NavbarProps) {
  const {
    currentUser,
    openAuthModal,
    allShops,
    allProducts,
    sellerShop,
  } = useMarketplace();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showLocationsMenu, setShowLocationsMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bazaarStatus, setBazaarStatus] = useState({
    isOpen: true,
    text: "Bazaar is Open Now",
    subtext: "Closes 7:30 PM",
  });

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Update live bazaar status based on Sri Lanka time
  useEffect(() => {
    const checkBazaarHours = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay(); // 0 = Sun

      if (day === 0) {
        if (hour >= 9 && hour < 15) {
          setBazaarStatus({
            isOpen: true,
            text: "Sunday Market Active",
            subtext: "Open till 3:00 PM",
          });
        } else {
          setBazaarStatus({
            isOpen: false,
            text: "Bazaar Opens Mon 8:00 AM",
            subtext: "Select Sunday Stalls Closed",
          });
        }
      } else {
        if (hour >= 8 && hour < 20) {
          setBazaarStatus({
            isOpen: true,
            text: "Pettah Bazaar Active",
            subtext: "Trading till 8:00 PM",
          });
        } else {
          setBazaarStatus({
            isOpen: false,
            text: "Bazaar Opens 8:00 AM",
            subtext: "Evening wholesale orders",
          });
        }
      }
    };

    checkBazaarHours();
    const interval = setInterval(checkBazaarHours, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    if (val.trim().length > 0) {
      const q = val.toLowerCase();
      const filtered = allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
    onSearch(val);
  };

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    setShowSuggestions(false);
    onSearch(name);
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    onSearch("");
  };

  const handleCategoryClick = (cat: string) => {
    setShowMegaMenu(false);
    setMobileMenuOpen(false);
    onCategorySelect?.(cat);
    const el = document.getElementById("tab-products");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLocationClick = (loc: string) => {
    setShowLocationsMenu(false);
    setMobileMenuOpen(false);
    onLocationSelect?.(loc);
    const el = document.getElementById("tab-products");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 1. TOP LIVE TICKER UTILITY BAR */}
      <div className="bg-[#070707] border-b border-white/5 py-1 sm:py-1.5 px-3 sm:px-6 lg:px-8 text-[10px] sm:text-[11px] text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Live Pettah District Status */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center gap-1.5 font-medium truncate">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    bazaarStatus.isOpen ? "bg-emerald-400" : "bg-amber-400"
                  } opacity-75`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    bazaarStatus.isOpen ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
              </span>
              <span className="text-white font-semibold truncate">{bazaarStatus.text}</span>
              <span className="hidden sm:inline text-neutral-500">· {bazaarStatus.subtext}</span>
            </div>

            <div className="hidden md:flex items-center gap-1 text-orange-400 font-semibold bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20 flex-shrink-0">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Live Street Updates</span>
            </div>
          </div>

          {/* Right: Quick District Facts & Support */}
          <div className="flex items-center gap-3 text-neutral-400 flex-shrink-0">
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-orange-400" />
              <span>Colombo 11</span>
            </span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <a
              href="tel:+94112345678"
              className="hover:text-white transition-colors flex items-center gap-1 text-neutral-300"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Merchant Desk:</span>
              <span className="font-semibold hidden xs:inline">+94 11 234 5678</span>
              <span className="font-semibold xs:hidden">Help</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#0c0c0c]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.85)] py-2.5"
            : "bg-black/60 backdrop-blur-xl border-b border-white/5 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-6">
            {/* BRAND LOGO */}
            <div
              onClick={() => {
                clearSearch();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 xs:gap-3 cursor-pointer group flex-shrink-0"
            >
              <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300 border border-white/20">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center leading-none">
                  <span className="text-lg xs:text-xl sm:text-2xl font-black font-[Sora] bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                    Pettah
                  </span>
                  <span className="text-lg xs:text-xl sm:text-2xl font-black font-[Sora] text-white">
                    Bazaar
                  </span>
                </div>
                <span className="text-[9px] xs:text-[10px] uppercase font-extrabold tracking-wider text-orange-400/90 hidden xs:block mt-0.5">
                  Direct Stall Finder
                </span>
              </div>
            </div>

            {/* NAV DROPDOWNS: MEGA MENU TRIGGER & STREETS (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 text-sm font-semibold text-neutral-300">
              {/* Mega Categories Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <button
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                    showMegaMenu
                      ? "bg-white/10 text-white"
                      : "hover:bg-white/5 hover:text-white text-neutral-300"
                  }`}
                >
                  <Layers className="w-4 h-4 text-orange-400" />
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      showMegaMenu ? "rotate-180 text-orange-400" : ""
                    }`}
                  />
                </button>

                {/* MEGA MENU FLYOUT */}
                {showMegaMenu && (
                  <div className="absolute top-full left-0 w-[680px] bg-[#141414] border border-white/15 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-5 z-50 animate-fade-in-up backdrop-blur-2xl grid grid-cols-2 gap-3">
                    <div className="col-span-2 pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-xs uppercase tracking-wider font-bold text-white">
                          Pettah Commercial Sectors
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        Select a category to view live stall inventory
                      </span>
                    </div>

                    {MEGA_CATEGORIES.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.query)}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-orange-500/40 text-left transition-all duration-200 group"
                      >
                        <span className="text-2xl p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                              {cat.name}
                            </span>
                            <span className="text-[9px] font-semibold bg-white/5 px-1.5 py-0.5 rounded text-neutral-400">
                              {cat.badge}
                            </span>
                          </div>
                          <span className="text-[11px] text-orange-300 font-medium block mt-0.5">
                            📍 {cat.street}
                          </span>
                          <span className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                            {cat.popular.join(" • ")}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Historic Streets Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setShowLocationsMenu(true)}
                onMouseLeave={() => setShowLocationsMenu(false)}
              >
                <button
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                    showLocationsMenu
                      ? "bg-white/10 text-white"
                      : "hover:bg-white/5 hover:text-white text-neutral-300"
                  }`}
                >
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Bazaar Streets</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      showLocationsMenu ? "rotate-180 text-orange-400" : ""
                    }`}
                  />
                </button>

                {/* STREETS DROPDOWN */}
                {showLocationsMenu && (
                  <div className="absolute top-full left-0 w-64 bg-[#161616] border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in-up backdrop-blur-2xl">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-white/5">
                      Pettah Lanes
                    </div>
                    {shopLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLocationClick(loc)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-orange-400 hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        <span>{loc}</span>
                        <ArrowRight className="w-3 h-3 text-neutral-500" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* LIVE HEADER SEARCH BAR WITH INTELLIGENT AUTO-COMPLETE */}
            <div
              ref={searchContainerRef}
              className="flex-1 relative max-w-md hidden md:block"
            >
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-orange-400 pointer-events-none z-10" />
                <input
                  id="header-nav-search"
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => query && setShowSuggestions(suggestions.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Quick search products, stalls or streets..."
                  className="w-full bg-white/[0.07] border border-white/15 text-white placeholder-neutral-400 rounded-2xl pl-10 pr-9 py-2 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-orange-500/80 focus:bg-white/[0.1] focus:ring-2 focus:ring-orange-500/20"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="p-1.5 absolute right-2 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-[#161616] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in-up backdrop-blur-2xl">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-white/5 flex items-center justify-between">
                    <span>Matching Bazaar Goods</span>
                    <span className="text-[10px] text-orange-400 font-semibold">
                      {suggestions.length} items
                    </span>
                  </div>
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      onMouseDown={() => handleSuggestionClick(p.name)}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                    >
                      <div className="truncate pr-2">
                        <span className="font-semibold text-white">{p.name}</span>
                        <span className="text-[11px] text-neutral-400 block">
                          {p.category}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-orange-400 flex-shrink-0">
                        LKR {p.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT ACTION BUTTONS */}
            <div className="flex items-center gap-1.5 xs:gap-2 flex-shrink-0">
              {/* Live Stalls Badge (Desktop) */}
              <div className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-orange-300 bg-orange-500/10 border border-orange-500/25 rounded-xl px-3 py-1.5 backdrop-blur-md">
                <Store className="w-3.5 h-3.5 text-orange-400" />
                <span>{allShops.length} Live Merchants</span>
              </div>

              {/* Seller Mode Toggle / Register Stall Trigger */}
              {currentUser?.role === "seller" ? (
                <button
                  id="nav-seller-portal-btn"
                  onClick={() => onSwitchPortal?.("seller")}
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                    activePortal === "seller"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25 ring-2 ring-orange-500/40"
                      : "bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 border border-orange-500/35"
                  }`}
                  title="Open Pettah Merchant Dashboard"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Seller Portal</span>
                  {sellerShop && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              ) : (
                <button
                  id="nav-sell-on-pettah-btn"
                  onClick={() => openAuthModal("seller")}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-600/20 text-orange-300 hover:text-white border border-orange-500/30 hover:border-orange-500/60 transition-all hover:scale-105"
                  title="Register your Pettah stall or wholesale store"
                >
                  <Store className="w-3.5 h-3.5 text-orange-400" />
                  <span>Sell on Pettah</span>
                </button>
              )}

              {/* Customer / User Account Button */}
              <button
                id="nav-account-btn"
                onClick={() => openAuthModal(currentUser?.role || "customer")}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 xs:px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors active:scale-95"
                title="Account & Role Switcher"
              >
                <UserIcon className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden md:inline max-w-[85px] truncate">
                  {currentUser ? currentUser.name.split(" ")[0] : "Login"}
                </span>
                <span
                  className={`text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded ${
                    currentUser?.role === "seller"
                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                      : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                  }`}
                >
                  {currentUser?.role === "seller" ? "Seller" : "cx"}
                </span>
              </button>

              {/* Interactive Map Button (Desktop/Tablet) */}
              <button
                onClick={() => {
                  if (activePortal === "seller") onSwitchPortal?.("customer");
                  const el = document.getElementById("tab-shops");
                  if (el) el.click();
                  const target = document.getElementById("tab-shops");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl px-3.5 py-2 shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>

              {/* Mobile Quick Map Button */}
              <button
                onClick={() => {
                  if (activePortal === "seller") onSwitchPortal?.("customer");
                  const el = document.getElementById("tab-shops");
                  if (el) el.click();
                  const target = document.getElementById("tab-shops");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="sm:hidden p-2 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 active:scale-95"
                title="Pettah Map & Shops"
                aria-label="Pettah Map"
              >
                <Navigation className="w-4 h-4" />
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white active:scale-95 transition-all"
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-orange-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SLIDE-DOWN DRAWER WITH BACKDROP */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 top-[90px] bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Body */}
            <div className="relative z-50 lg:hidden mt-2 px-3 sm:px-4 pt-3 pb-6 bg-[#121212] border-t border-white/10 space-y-4 animate-fade-in-up max-h-[calc(100vh-100px)] overflow-y-auto shadow-2xl">
              {/* Mobile User Role & Portal Switching Box */}
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs border border-orange-500/30 flex-shrink-0">
                      {currentUser?.role === "seller" ? (
                        <Store className="w-4 h-4" />
                      ) : (
                        <UserIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                        <span className="truncate">{currentUser?.name || "Guest Shopper"}</span>
                        <span
                          className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-extrabold flex-shrink-0 ${
                            currentUser?.role === "seller"
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          }`}
                        >
                          {currentUser?.role === "seller" ? "Seller" : "Customer (cx)"}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate">
                        {currentUser?.email || "Click login to switch accounts"}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal(currentUser?.role || "customer");
                    }}
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 flex-shrink-0"
                  >
                    Switch / Login
                  </button>
                </div>

                {/* Quick Portal Switch Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                  <button
                    onClick={() => {
                      onSwitchPortal?.("customer");
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      activePortal === "customer"
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                        : "bg-white/5 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Customer View</span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentUser?.role === "seller") {
                        onSwitchPortal?.("seller");
                      } else {
                        openAuthModal("seller");
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      activePortal === "seller"
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md shadow-orange-500/20"
                        : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>{currentUser?.role === "seller" ? "Seller Portal" : "Become Seller"}</span>
                  </button>
                </div>
              </div>
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Search products or stalls..."
                  className="w-full bg-white/5 border border-white/15 text-white placeholder-neutral-400 rounded-xl pl-10 pr-9 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="p-1 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Suggestions in mobile drawer */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl divide-y divide-white/5 overflow-hidden">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        handleSuggestionClick(p.name);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left text-neutral-200 hover:bg-white/10"
                    >
                      <span className="font-semibold text-white truncate mr-2">{p.name}</span>
                      <span className="text-orange-400 font-bold flex-shrink-0">
                        LKR {p.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Actions (Shops & Map) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("tab-shops");
                    if (el) el.click();
                    setMobileMenuOpen(false);
                    const target = document.getElementById("tab-shops");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-2.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-left text-xs font-bold text-orange-400 flex items-center gap-2 active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Interactive Map</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById("tab-products");
                    if (el) el.click();
                    setMobileMenuOpen(false);
                    const target = document.getElementById("tab-products");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-left text-xs font-bold text-white flex items-center gap-2 active:scale-95"
                >
                  <Store className="w-4 h-4 text-neutral-400" />
                  <span>Browse Products</span>
                </button>
              </div>

              {/* Categories Grid on Mobile */}
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Pettah Categories
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {MEGA_CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.query)}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-left text-xs font-semibold text-neutral-200 hover:text-orange-400 flex items-center gap-2 active:scale-95"
                    >
                      <span>{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Streets List on Mobile */}
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Pettah Streets
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {shopLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocationClick(loc)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300 hover:text-orange-400 active:scale-95"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Helpline call link */}
              <div className="pt-2 border-t border-white/10 text-center">
                <a
                  href="tel:+94112345678"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pettah Merchant Desk: +94 11 234 5678</span>
                </a>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
