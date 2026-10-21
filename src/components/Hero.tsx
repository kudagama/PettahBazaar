"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  X,
  ArrowRight,
  Sparkles,
  Tag,
  Store,
  ShoppingBag,
  Gem,
  Tv,
  Shirt,
  Flame,
  BadgePercent,
  TrendingUp,
} from "lucide-react";
import { products, shops } from "@/data/mockData";

interface HeroProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  carousel?: React.ReactNode;
}

const POPULAR_TAGS = [
  "Clothes",
  "Electronics",
  "Spices",
  "Jewellery",
  "Bags & Luggage",
  "Shoes",
  "Silk Sarees",
  "Ceylon Cinnamon",
  "Smartwatch",
];

const QUICK_CATEGORIES = [
  { label: "Sarees & Clothes", icon: Shirt, query: "Clothes", color: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-300" },
  { label: "Tech & Gadgets", icon: Tv, query: "Electronics", color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-cyan-300" },
  { label: "Pure Spices", icon: Flame, query: "Spices", color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300" },
  { label: "Sea St Gold", icon: Gem, query: "Jewellery", color: "from-yellow-500/20 to-amber-500/10 border-yellow-500/30 text-yellow-300" },
  { label: "Bags & Travel", icon: ShoppingBag, query: "Bags", color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300" },
];

export default function Hero({
  onSearch,
  initialQuery = "",
  carousel,
}: HeroProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync initial query if updated externally
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute live auto-suggestions
  const suggestions = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleInputChange = (val: string) => {
    setQuery(val);
    setShowDropdown(val.trim().length > 0);
  };

  const handleSelectSuggestion = (text: string) => {
    setQuery(text);
    setShowDropdown(false);
    onSearch(text);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowDropdown(false);
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    setShowDropdown(false);
    onSearch("");
  };

  return (
    <section className="relative pt-24 xs:pt-28 sm:pt-34 lg:pt-40 pb-8 sm:pb-14 px-2 sm:px-4 lg:px-8 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[340px] xs:w-[500px] sm:w-[900px] h-[220px] sm:h-[360px] bg-gradient-to-b from-orange-500/20 via-red-600/10 to-transparent rounded-full blur-[70px] sm:blur-[110px]" />
        <div className="absolute top-1/4 -left-20 sm:-left-32 w-40 sm:w-80 h-40 sm:h-80 bg-orange-600/15 rounded-full blur-[70px] sm:blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 -right-20 sm:-right-32 w-40 sm:w-80 h-40 sm:h-80 bg-red-600/15 rounded-full blur-[70px] sm:blur-[100px]" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative w-full max-w-[1720px] mx-auto text-center">
        {/* 2. ULTRA-ATTRACTIVE MAIN HERO HEADING */}
        <h1
          className="text-[30px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-futura leading-[1.12] sm:leading-[1.08] tracking-tight mb-3 sm:mb-5 animate-fade-in-up"
          style={{ animationDelay: "80ms" }}
        >
          <span className="text-white drop-shadow-md">Find the Best </span>
          <span className="text-shine drop-shadow-lg">Deals</span>
          <br />
          <span className="text-white drop-shadow-md">in </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-red-500 bg-clip-text text-transparent font-black">
              Pettah Bazaar
            </span>
            {/* Ambient underline glow */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] sm:h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80 blur-[1px]" />
          </span>
        </h1>

        {/* 3. FULL-WIDTH PROMO & DEALS CAROUSEL DIRECTLY UNDER HEADING */}
        {carousel && (
          <div
            className="w-full my-4 sm:my-7 animate-fade-in-up text-left"
            style={{ animationDelay: "140ms" }}
          >
            {carousel}
          </div>
        )}

        {/* 4. QUICK DISCOVERY CHIPS (Pettah's Key Pillars) */}
        <div
          className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-5 sm:mb-8 animate-fade-in-up px-1"
          style={{ animationDelay: "200ms" }}
        >
          {QUICK_CATEGORIES.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleSelectSuggestion(item.query)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 xs:px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border text-[10px] sm:text-xs font-semibold bg-gradient-to-r ${item.color} backdrop-blur-md hover:scale-105 active:scale-95 transition-all shadow-md`}
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 5. PROMINENT LARGE SEARCH BAR WITH AUTO-SUGGESTIONS */}
        <div
          ref={containerRef}
          className="relative max-w-3xl mx-auto mb-6 sm:mb-8 animate-fade-in-up z-30 px-1"
          style={{ animationDelay: "240ms" }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center bg-[#161616]/95 border-2 border-white/15 focus-within:border-orange-500 rounded-xl sm:rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(249,115,22,0.15)] backdrop-blur-2xl p-1 xs:p-1.5 sm:p-2 transition-all duration-300 group hover:border-white/30"
          >
            <div className="pl-2 sm:pl-3.5 pr-1 sm:pr-2 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Search className="w-4 h-4 sm:w-6 sm:h-6 group-focus-within:scale-110 transition-transform" />
            </div>

            <input
              id="hero-large-search"
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => {
                if (query.trim().length > 0) setShowDropdown(true);
              }}
              placeholder="Search clothes, spices, gadgets, stalls..."
              className="w-full bg-transparent text-white placeholder-neutral-400 text-sm xs:text-base sm:text-xl py-2 sm:py-3 px-2 focus:outline-none min-w-0 font-medium"
              autoComplete="off"
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 sm:p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors mr-1 flex-shrink-0"
                aria-label="Clear query"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            <button
              type="submit"
              id="hero-search-submit"
              className="flex items-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-sm sm:text-lg px-4 xs:px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-orange-500/30 flex-shrink-0 active:scale-95"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </form>

          {/* Auto-suggestions Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-1 right-1 sm:left-0 sm:right-0 mt-2 bg-[#181818] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-left z-50 animate-fade-in-up backdrop-blur-2xl">
              <div className="px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-white/5 flex items-center justify-between">
                <span>Matching Products & Stalls</span>
                <span className="text-[10px] text-orange-400">{suggestions.length} items</span>
              </div>
              <div className="divide-y divide-white/5 max-h-60 sm:max-h-72 overflow-y-auto">
                {suggestions.map((item) => {
                  const shop = shops.find((s) => s.id === item.shopId);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(item.name)}
                      className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 hover:bg-white/5 transition-colors group/item text-left"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-orange-400">
                          <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs sm:text-sm font-semibold text-white group-hover/item:text-orange-400 transition-colors truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] sm:text-xs text-neutral-400 truncate">
                            {shop?.name} · {shop?.area} ({shop?.stallNumber || "Pettah"})
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2 sm:ml-3">
                        <span className="text-xs font-bold text-orange-400">
                          LKR {item.price.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 6. TRUST & BAZAAR METRICS ROW */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-6 lg:gap-14 mb-5 sm:mb-7 animate-fade-in-up"
          style={{ animationDelay: "280ms" }}
        >
          {[
            { icon: ShoppingBag, value: "28+", label: "Verified Products" },
            { icon: Store, value: "6 Major", label: "Street Districts" },
            { icon: TrendingUp, value: "LKR 1,800+", label: "Wholesale Bargains" },
            { icon: Sparkles, value: "100% Live", label: "Stall Navigation" },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-white/[0.03] sm:bg-transparent border border-white/5 sm:border-0 group"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-base xs:text-lg sm:text-2xl font-black text-white">{value}</span>
              <span className="text-xs sm:text-sm text-neutral-300 text-center font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* 7. QUICK TAGS */}
        <div
          className="flex items-center justify-center gap-2 flex-wrap animate-fade-in-up"
          style={{ animationDelay: "320ms" }}
        >
          <span className="text-xs sm:text-sm text-neutral-300 font-semibold">Popular now:</span>
          {POPULAR_TAGS.map((term) => (
            <button
              key={term}
              id={`popular-${term.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => handleSelectSuggestion(term)}
              className="text-xs sm:text-sm font-semibold bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/30 text-neutral-200 hover:text-orange-300 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
