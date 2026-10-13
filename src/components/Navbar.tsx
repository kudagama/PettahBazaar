"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, ShoppingBag, Sparkles, X } from "lucide-react";

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount: number;
}

const SUGGESTIONS = [
  "silk saree",
  "ceylon cinnamon",
  "smartwatch",
  "wireless earbuds",
  "travel luggage",
  "leather shoes",
  "linen shirt",
  "gold bangles",
  "black pepper",
  "backpack",
];

export default function Navbar({ onSearch, cartCount }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    if (val.trim().length > 0) {
      const filtered = SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
    onSearch(val);
  };

  const handleSuggestionClick = (s: string) => {
    setQuery(s);
    setShowSuggestions(false);
    onSearch(s);
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
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold font-[Sora] gradient-text">
                Pettah
              </span>
              <span className="text-lg font-bold font-[Sora] text-white">
                Bazaar
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 relative max-w-2xl">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-orange-400 pointer-events-none z-10" />
              <input
                id="main-search"
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => query && setShowSuggestions(suggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Search clothes, electronics, spices, jewellery, bags, shoes..."
                className="search-input w-full bg-white/5 border border-white/10 text-white placeholder-neutral-500 rounded-xl pl-10 pr-10 py-2.5 text-sm transition-all duration-200 hover:bg-white/8 hover:border-white/15"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 text-neutral-500 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-up">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={() => handleSuggestionClick(s)}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                  >
                    <Search className="w-3 h-3 text-orange-400" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 bg-white/5 rounded-lg px-3 py-2 border border-white/8">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Pettah, CMB 11</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-white/5 rounded-lg px-3 py-2 border border-white/8">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">6 Shops</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
