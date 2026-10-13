"use client";

import { useState, useEffect } from "react";
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
  Heart,
} from "lucide-react";
import { products, shops } from "@/data/mockData";

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount?: number;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    if (val.trim().length > 0) {
      const q = val.toLowerCase();
      const filtered = products
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c0c0c]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* 1. BRAND LOGO */}
          <div
            onClick={() => {
              clearSearch();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300 border border-white/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center leading-none">
                <span className="text-xl font-black font-[Sora] bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  Pettah
                </span>
                <span className="text-xl font-black font-[Sora] text-white">
                  Bazaar
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400/90 block mt-0.5">
                Colombo 11 · Direct Finder
              </span>
            </div>
          </div>

          {/* 2. HEADER SEARCH BAR WITH LIVE MATCH DROPDOWN */}
          <div className="flex-1 relative max-w-xl hidden md:block">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-orange-400 pointer-events-none z-10" />
              <input
                id="header-nav-search"
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => query && setShowSuggestions(suggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search clothes, electronics, spices, jewellery, bags, shoes..."
                className="w-full bg-white/[0.07] border border-white/15 text-white placeholder-neutral-400 rounded-2xl pl-10 pr-9 py-2 text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-orange-500/80 focus:bg-white/[0.1] focus:ring-2 focus:ring-orange-500/20"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Header Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-[#161616] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in-up backdrop-blur-2xl">
                <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-white/5">
                  Quick Results
                </div>
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onMouseDown={() => handleSuggestionClick(p.name)}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                  >
                    <div className="truncate pr-2">
                      <span className="font-semibold text-white">{p.name}</span>
                      <span className="text-[11px] text-neutral-400 block">{p.category}</span>
                    </div>
                    <span className="text-xs font-bold text-orange-400 flex-shrink-0">
                      LKR {p.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. RIGHT ACTION PILLS & BADGES */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Live Pettah Badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-300 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Pettah, CMB 11</span>
            </div>

            {/* Merchant Count */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-300 bg-orange-500/10 border border-orange-500/25 rounded-xl px-3 py-1.5 backdrop-blur-md">
              <Store className="w-3.5 h-3.5 text-orange-400" />
              <span>{shops.length} Stalls Online</span>
            </div>

            {/* Map Shortcut Button */}
            <a
              href="#interactive-shop-map"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("tab-shops");
                if (el) el.click();
              }}
              className="flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl px-3.5 py-1.5 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explore Map</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
