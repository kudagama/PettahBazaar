"use client";

import { SearchFilters } from "@/types";
import { shopLocations } from "@/data/mockData";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
  ChevronDown,
  MapPin,
  CheckCircle2,
  X,
  CircleDollarSign,
} from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  resultCount: number;
}

const PRIMARY_CATEGORIES = [
  "All",
  "Clothes",
  "Electronics",
  "Spices",
  "Jewellery",
  "Bags",
  "Shoes",
  "Formal",
  "Casual",
  "Sports",
];

const PRICE_PRESETS = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under LKR 3,000", min: 0, max: 3000 },
  { label: "LKR 3,000 – 6,000", min: 3000, max: 6000 },
  { label: "LKR 6,000 – 10,000", min: 6000, max: 10000 },
  { label: "Above LKR 10,000", min: 10000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating", label: "Best Rated" },
  { value: "distance", label: "Nearest First" },
];

export default function FilterBar({
  filters,
  onFilterChange,
  resultCount,
}: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [priceDropdown, setPriceDropdown] = useState(false);
  const [sortDropdown, setSortDropdown] = useState(false);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === filters.sortBy)?.label || "Relevance";

  const closeAllDropdowns = () => {
    setCategoryDropdown(false);
    setLocationDropdown(false);
    setPriceDropdown(false);
    setSortDropdown(false);
  };

  const getPriceLabel = () => {
    if (filters.minPrice === 0 && filters.maxPrice === Infinity) return "All Prices";
    if (filters.maxPrice < Infinity && filters.minPrice === 0)
      return `Under LKR ${filters.maxPrice.toLocaleString()}`;
    if (filters.minPrice > 0 && filters.maxPrice === Infinity)
      return `Above LKR ${filters.minPrice.toLocaleString()}`;
    return `LKR ${filters.minPrice.toLocaleString()} - ${filters.maxPrice.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      {/* FILTER CONTROL BAR: Category, Price, Shop Location, Availability & Sort */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-3">
          {/* Left: Quick Dropdown Filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto pb-1 sm:pb-0">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                id="filter-category-dropdown"
                onClick={() => {
                  setCategoryDropdown(!categoryDropdown);
                  setLocationDropdown(false);
                  setPriceDropdown(false);
                  setSortDropdown(false);
                }}
                className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border transition-all whitespace-nowrap flex-shrink-0 ${
                  filters.category !== "All"
                    ? "bg-orange-500/20 border-orange-500/60 text-orange-300"
                    : "bg-white/5 border-white/10 text-neutral-300 hover:border-white/20 hover:text-white"
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  Category: <strong className="font-semibold text-white">{filters.category}</strong>
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${categoryDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {categoryDropdown && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-[#1c1c1c] border border-white/15 rounded-xl shadow-2xl z-40 overflow-hidden animate-fade-in-up py-1">
                  {PRIMARY_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      id={`dropdown-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => {
                        onFilterChange({ category: cat });
                        setCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                        filters.category === cat
                          ? "bg-orange-500/15 text-orange-400 font-semibold"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{cat}</span>
                      {filters.category === cat && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shop Location Dropdown (Main Street, Cross Street, Keyzer Street) */}
            <div className="relative">
              <button
                id="filter-location-dropdown"
                onClick={() => {
                  setLocationDropdown(!locationDropdown);
                  setCategoryDropdown(false);
                  setPriceDropdown(false);
                  setSortDropdown(false);
                }}
                className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border transition-all whitespace-nowrap flex-shrink-0 ${
                  filters.location && filters.location !== "All Locations"
                    ? "bg-orange-500/20 border-orange-500/60 text-orange-300"
                    : "bg-white/5 border-white/10 text-neutral-300 hover:border-white/20 hover:text-white"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  Location:{" "}
                  <strong className="font-semibold text-white">
                    {filters.location || "All Locations"}
                  </strong>
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${locationDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {locationDropdown && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-[#1c1c1c] border border-white/15 rounded-xl shadow-2xl z-40 overflow-hidden animate-fade-in-up py-1">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-white/5">
                    Pettah Streets
                  </div>
                  {shopLocations.map((loc) => (
                    <button
                      key={loc}
                      id={`dropdown-loc-${loc.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => {
                        onFilterChange({ location: loc });
                        setLocationDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                        (filters.location || "All Locations") === loc
                          ? "bg-orange-500/15 text-orange-400 font-semibold"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{loc}</span>
                      {(filters.location || "All Locations") === loc && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Dropdown */}
            <div className="relative">
              <button
                id="filter-price-dropdown"
                onClick={() => {
                  setPriceDropdown(!priceDropdown);
                  setCategoryDropdown(false);
                  setLocationDropdown(false);
                  setSortDropdown(false);
                }}
                className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border transition-all whitespace-nowrap flex-shrink-0 ${
                  filters.minPrice > 0 || filters.maxPrice < Infinity
                    ? "bg-orange-500/20 border-orange-500/60 text-orange-300"
                    : "bg-white/5 border-white/10 text-neutral-300 hover:border-white/20 hover:text-white"
                }`}
              >
                <CircleDollarSign className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  Price: <strong className="font-semibold text-white">{getPriceLabel()}</strong>
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${priceDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {priceDropdown && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-[#1c1c1c] border border-white/15 rounded-xl shadow-2xl z-40 overflow-hidden animate-fade-in-up py-1">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-white/5">
                    Price Range (LKR)
                  </div>
                  {PRICE_PRESETS.map((preset) => {
                    const isSelected =
                      filters.minPrice === preset.min && filters.maxPrice === preset.max;
                    return (
                      <button
                        key={preset.label}
                        onClick={() => {
                          onFilterChange({ minPrice: preset.min, maxPrice: preset.max });
                          setPriceDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-orange-500/15 text-orange-400 font-semibold"
                            : "text-neutral-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{preset.label}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Availability / In Stock Toggle Button */}
            <button
              id="filter-availability-toggle"
              onClick={() => onFilterChange({ inStockOnly: !filters.inStockOnly })}
              className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border transition-all whitespace-nowrap flex-shrink-0 ${
                filters.inStockOnly
                  ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/10"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  filters.inStockOnly ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
                }`}
              />
              <span>In Stock Only</span>
            </button>
          </div>

          {/* Right: Sort and Reset / Advanced */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                id="sort-button"
                onClick={() => {
                  setSortDropdown(!sortDropdown);
                  closeAllDropdowns();
                  setSortDropdown(true);
                }}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white rounded-xl px-3.5 py-2 transition-colors"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-orange-400" />
                <span>{activeSortLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${sortDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {sortDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#1c1c1c] border border-white/15 rounded-xl shadow-2xl z-40 overflow-hidden animate-fade-in-up py-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onFilterChange({
                          sortBy: opt.value as SearchFilters["sortBy"],
                        });
                        setSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors ${
                        filters.sortBy === opt.value
                          ? "text-orange-400 bg-orange-500/15 font-semibold"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom slider toggle */}
            <button
              id="slider-filter-toggle"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 rounded-xl border transition-colors ${
                showAdvanced
                  ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
              }`}
              title="Toggle Custom Range Slider"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Custom Price Slider Drawer (when user expands) */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold uppercase tracking-wider">Custom Price Limit</span>
                <span className="text-white font-bold">
                  Up to LKR {filters.maxPrice >= 15000 ? "15,000+" : filters.maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={15000}
                step={500}
                value={filters.maxPrice >= 15000 ? 15000 : filters.maxPrice}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  onFilterChange({ maxPrice: val >= 15000 ? Infinity : val });
                }}
                className="w-full accent-orange-500"
              />
            </div>

            {/* Active Filters Clear Bar */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
              <button
                onClick={() =>
                  onFilterChange({
                    category: "All",
                    location: "All Locations",
                    minPrice: 0,
                    maxPrice: Infinity,
                    inStockOnly: false,
                  })
                }
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-orange-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Header + Category Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 px-1">
        <div className="text-xs sm:text-sm text-neutral-400">
          Showing <span className="text-white font-bold">{resultCount}</span> items in{" "}
          <span className="text-orange-400 font-medium">
            {filters.location || "Pettah Bazaar"}
          </span>
        </div>

        {/* Quick category pill scrolling */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-xl">
          {["Clothes", "Electronics", "Spices", "Jewellery", "Bags", "Shoes"].map((cat) => (
            <button
              key={cat}
              onClick={() =>
                onFilterChange({
                  category: filters.category === cat ? "All" : cat,
                })
              }
              className={`flex-shrink-0 text-xs px-3 py-1 rounded-full border transition-all ${
                filters.category === cat
                  ? "bg-orange-500 border-orange-500 text-white font-medium shadow-md shadow-orange-500/20"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
