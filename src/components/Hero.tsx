"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  X,
  ArrowRight,
  Sparkles,
  Tag,
  Store,
  Compass,
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
    <section className="relative pt-24 xs:pt-28 sm:pt-36 lg:pt-44 pb-8 sm:pb-14 px-3 sm:px-6 lg:px-8 xl:px-12 overflow-hidden">
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

      <div className="relative max-w-[1600px] mx-auto text-center">
        {/* 1. NEXT-LEVEL LOCATION BADGE */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-orange-500/15 via-red-500/10 to-orange-500/15 border border-orange-500/30 backdrop-blur-xl rounded-full px-2.5 xs:px-3 sm:px-5 py-1 xs:py-1.5 sm:py-2 mb-3 sm:mb-6 shadow-lg shadow-orange-500/10 hover:border-orange-500/50 transition-all duration-300 group animate-fade-in-up">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/40 text-orange-400 group-hover:scale-110 transition-transform flex-shrink-0">
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <span className="text-xs sm:text-base font-semibold tracking-wide text-neutral-200">
            <span className="hidden sm:inline">Colombo 11 <span className="text-orange-400">·</span> Main St, Cross St & Keyzer St Bazaar</span>
            <span className="sm:hidden">Colombo 11 <span className="text-orange-400">·</span> Pettah Bazaar</span>
          </span>
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>

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

        {/* 3. CREATIVE & AESTHETIC NEXT-LEVEL BAZAAR HIGHLIGHTS BANNER */}
        <div
          className="max-w-5xl mx-auto mb-6 sm:mb-8 animate-fade-in-up"
          style={{ animationDelay: "160ms" }}
        >
          {/* Frosted Glass Container with subtle gradient border */}
          <div className="relative p-3 xs:p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden group">
            {/* Ambient backlight glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top lead tag */}
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest font-black text-orange-400 bg-orange-500/15 border border-orange-500/30 px-3 sm:px-4 py-1 rounded-full">
                ✦ Sri Lanka's Commercial Epicenter
              </span>
            </div>

            {/* Main Headline Lead */}
            <h2 className="text-sm xs:text-base sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-snug">
              Pettah has it all — <span className="text-neutral-400 font-normal">from heritage streets to modern stalls</span>
            </h2>

            {/* Interactive Feature Pills Showcase Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 xs:gap-2 sm:gap-3 mb-3 sm:mb-5">
              {[
                {
                  name: "Textiles",
                  fullName: "Textiles & Sarees",
                  image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80",
                  desc: "2nd Cross St",
                  query: "Clothes",
                  bg: "hover:border-pink-500/50 hover:bg-pink-500/10",
                },
                {
                  name: "Electronics",
                  fullName: "Electronics & Tech",
                  image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80",
                  desc: "1st Cross St",
                  query: "Electronics",
                  bg: "hover:border-cyan-500/50 hover:bg-cyan-500/10",
                },
                {
                  name: "Spices",
                  fullName: "Ceylon Spices",
                  image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=300&auto=format&fit=crop&q=80",
                  desc: "Old Moor St",
                  query: "Spices",
                  bg: "hover:border-amber-500/50 hover:bg-amber-500/10",
                },
                {
                  name: "Gold & Gems",
                  fullName: "Sea St Gold",
                  image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&auto=format&fit=crop&q=80",
                  desc: "Sea Street",
                  query: "Jewellery",
                  bg: "hover:border-yellow-500/50 hover:bg-yellow-500/10",
                },
                {
                  name: "Travel Bags",
                  fullName: "Bags & Luggage",
                  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80",
                  desc: "Keyzer St",
                  query: "Bags",
                  bg: "hover:border-purple-500/50 hover:bg-purple-500/10",
                },
                {
                  name: "Shoes",
                  fullName: "Wholesale Shoes",
                  image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&auto=format&fit=crop&q=80",
                  desc: "Main Street",
                  query: "Shoes",
                  bg: "hover:border-orange-500/50 hover:bg-orange-500/10",
                },
              ].map((cat) => (
                <button
                  key={cat.query}
                  type="button"
                  onClick={() => handleSelectSuggestion(cat.query)}
                  className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300 text-center cursor-pointer group/card active:scale-95 shadow-sm hover:shadow-lg ${cat.bg}`}
                >
                  <div className="relative w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 mb-1 xs:mb-1.5 sm:mb-2 rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-white/10 group-hover/card:ring-amber-400/50 shadow-md transition-all duration-300">
                    <Image
                      src={cat.image}
                      alt={cat.fullName}
                      fill
                      sizes="(max-width: 640px) 48px, 56px"
                      className="object-cover group-hover/card:scale-115 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover/card:opacity-20 transition-opacity" />
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-white group-hover/card:text-amber-300 transition-colors line-clamp-1">
                    <span className="sm:hidden">{cat.name}</span>
                    <span className="hidden sm:inline">{cat.fullName}</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-400 mt-0.5 line-clamp-1 hidden sm:block">
                    {cat.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Bottom Value Proposition Banner (Compare & Navigate) */}
            <div className="pt-2.5 sm:pt-3.5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 text-[10px] xs:text-[11px] sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-300">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 text-[10px] sm:text-xs font-bold flex-shrink-0">
                  ✓
                </div>
                <span>Compare verified street merchant prices</span>
              </div>

              <div className="hidden sm:block text-neutral-600">•</div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-300">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30 text-[10px] sm:text-xs flex-shrink-0">
                  📍
                </div>
                <span>Navigate straight to exact stall & walking route</span>
              </div>
            </div>
          </div>
        </div>

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
