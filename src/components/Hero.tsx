"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ShoppingBag, MapPin, X, ArrowRight, Sparkles, Tag } from "lucide-react";
import { products, shops } from "@/data/mockData";

interface HeroProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
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

export default function Hero({ onSearch, initialQuery = "" }: HeroProps) {
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
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-36 -left-36 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -top-20 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-orange-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Hub location Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
          <MapPin className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-semibold text-orange-300">
            Colombo 11 · Main St, Cross St & Keyzer St Bazaar
          </span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black font-[Sora] leading-tight mb-4 tracking-tight animate-fade-in-up"
          style={{ animationDelay: "80ms" }}
        >
          <span className="text-white">Find the Best </span>
          <span className="gradient-text">Deals</span>
          <br />
          <span className="text-white">in </span>
          <span className="gradient-text">Pettah Bazaar</span>
        </h1>

        <p
          className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "160ms" }}
        >
          Pettah has it all — from{" "}
          <span className="text-orange-400 font-semibold">textiles, silk sarees, mobile electronics, pure Ceylon spices, Sea Street jewellery, travel bags</span>,
          to wholesale footwear. Compare prices and get directions to the exact stall.
        </p>

        {/* PROMINENT LARGE SEARCH BAR WITH AUTO-SUGGESTIONS */}
        <div
          ref={containerRef}
          className="relative max-w-2xl mx-auto mb-8 animate-fade-in-up z-30"
          style={{ animationDelay: "220ms" }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center bg-[#161616]/90 border border-white/15 focus-within:border-orange-500/80 rounded-2xl shadow-2xl backdrop-blur-xl p-2 transition-all group hover:border-white/25"
          >
            <div className="pl-3 pr-2 text-orange-400">
              <Search className="w-6 h-6" />
            </div>

            <input
              id="hero-large-search"
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => {
                if (query.trim().length > 0) setShowDropdown(true);
              }}
              placeholder="Search clothes, spices, jewellery, electronics, bags, shoes..."
              className="w-full bg-transparent text-white placeholder-neutral-400 text-base sm:text-lg py-2.5 px-1 focus:outline-none"
              autoComplete="off"
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors mr-1"
                aria-label="Clear query"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <button
              type="submit"
              id="hero-search-submit"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold text-sm sm:text-base px-5 sm:px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/25 flex-shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </form>

          {/* Auto-suggestions Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#181818] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-left z-50 animate-fade-in-up backdrop-blur-2xl">
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-white/5 flex items-center justify-between">
                <span>Matching Products & Stalls</span>
                <span className="text-[10px] text-orange-400">{suggestions.length} items</span>
              </div>
              <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                {suggestions.map((item) => {
                  const shop = shops.find((s) => s.id === item.shopId);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(item.name)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors group/item text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-orange-400">
                          <Tag className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-semibold text-white group-hover/item:text-orange-400 transition-colors truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-neutral-400 truncate">
                            {shop?.name} · {shop?.area} ({shop?.stallNumber || "Pettah"})
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
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

        {/* Stats row */}
        <div
          className="flex items-center justify-center gap-6 sm:gap-12 mb-8 animate-fade-in-up"
          style={{ animationDelay: "280ms" }}
        >
          {[
            { icon: ShoppingBag, value: "19+", label: "Verified Products" },
            { icon: MapPin, value: "6", label: "Street Merchants" },
            { icon: Sparkles, value: "LKR 3.2k+", label: "Best Pettah Deals" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-4 h-4 text-orange-400 mb-0.5" />
              <span className="text-lg sm:text-xl font-black text-white">{value}</span>
              <span className="text-xs text-neutral-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Popular searches / category quick tags */}
        <div
          className="flex items-center justify-center gap-2 flex-wrap animate-fade-in-up"
          style={{ animationDelay: "340ms" }}
        >
          <span className="text-xs text-neutral-400 font-medium">Quick find:</span>
          {POPULAR_TAGS.map((term) => (
            <button
              key={term}
              id={`popular-${term.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => handleSelectSuggestion(term)}
              className="text-xs bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/30 text-neutral-300 hover:text-orange-300 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
