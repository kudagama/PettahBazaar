"use client";

import { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import MapModal from "@/components/MapModal";
import ShopCard from "@/components/ShopCard";
import { Product, Shop, SearchFilters } from "@/types";
import { searchProducts, shops, products } from "@/data/mockData";
import { LayoutGrid, List, Store, ChevronUp } from "lucide-react";
import { useEffect } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "All",
    location: "All Locations",
    minPrice: 0,
    maxPrice: Infinity,
    sortBy: "relevance",
    inStockOnly: false,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mapShop, setMapShop] = useState<Shop | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"products" | "shops">("products");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derived: filtered products
  const filteredProducts = useMemo(() => {
    let results = searchProducts(
      filters.query,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.sortBy,
      filters.location
    );
    if (filters.inStockOnly) {
      results = results.filter((p) => p.inStock);
    }
    return results;
  }, [filters]);

  const handleSearch = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }));
    if (query) setActiveTab("products");
  }, []);

  const handleFilterChange = useCallback((partial: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  }, []);

  const handleCloseProduct = useCallback(() => {
    setSelectedProduct(null);
    document.body.style.overflow = "";
  }, []);

  const handleShowMap = useCallback((shop: Shop) => {
    setMapShop(shop);
  }, []);

  const handleCloseMap = useCallback(() => {
    setMapShop(null);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Featured products for the hero carousel
  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured),
    []
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar onSearch={handleSearch} cartCount={0} />

      {/* Hero */}
      <Hero onSearch={handleSearch} initialQuery={filters.query} />

      {/* Featured strip */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Featured This Week
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {featuredProducts.map((product) => {
            const shop = shops.find((s) => s.id === product.shopId);
            return (
              <button
                key={product.id}
                id={`featured-${product.id}`}
                onClick={() => handleProductClick(product)}
                className="flex-shrink-0 flex items-center gap-3 glass-card px-4 py-2.5 hover:border-orange-500/40 transition-all group"
                style={{ minWidth: "220px" }}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-semibold text-white group-hover:text-orange-300 transition-colors line-clamp-1">
                    {product.name}
                  </span>
                  <span className="text-xs text-orange-400 font-bold">
                    LKR {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500 line-clamp-1">
                    {shop?.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main content */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        {/* Tab navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/8">
            <button
              id="tab-products"
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === "products"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Products
            </button>
            <button
              id="tab-shops"
              onClick={() => setActiveTab("shops")}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === "shops"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Store className="w-4 h-4" />
              Shops
            </button>
          </div>

          {/* Grid / List toggle */}
          {activeTab === "products" && (
            <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/8">
              <button
                id="view-grid"
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  view === "grid"
                    ? "bg-white/10 text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                id="view-list"
                onClick={() => setView("list")}
                className={`p-2 rounded-lg transition-colors ${
                  view === "list"
                    ? "bg-white/10 text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {activeTab === "products" ? (
          <>
            {/* FilterBar */}
            <div className="mb-6">
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                resultCount={filteredProducts.length}
              />
            </div>

            {/* Product Grid / List */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                  <LayoutGrid className="w-7 h-7 text-neutral-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  No products found
                </h3>
                <p className="text-neutral-500 text-sm max-w-xs">
                  Try adjusting your search or filters. Check our 6 local shops for
                  the latest inventory.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      query: "",
                      category: "All",
                      location: "All Locations",
                      minPrice: 0,
                      maxPrice: Infinity,
                      sortBy: "relevance",
                      inStockOnly: false,
                    })
                  }
                  className="mt-4 text-sm text-orange-400 hover:text-orange-300 border border-orange-500/30 hover:border-orange-500/50 px-4 py-2 rounded-lg transition-all"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-3"
                }
              >
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    index={i}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Shops view */
          <div>
            <p className="text-sm text-neutral-500 mb-4">
              <span className="text-white font-semibold">{shops.length}</span>{" "}
              merchants in Pettah, Colombo 11
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shops.map((shop) => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  onViewShop={() => {
                    setActiveTab("products");
                    handleFilterChange({ query: shop.name, category: "All" });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseProduct}
          onShowMap={(shop) => {
            handleCloseProduct();
            handleShowMap(shop);
          }}
        />
      )}

      {mapShop && <MapModal shop={mapShop} onClose={handleCloseMap} />}

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          id="scroll-to-top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 transition-all hover:scale-110 animate-fade-in-up z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 text-center">
        <p className="text-xs text-neutral-600">
          © 2026 PettahBazaar · Built for Pettah, Colombo 11 · Sri Lanka 🇱🇰
        </p>
      </footer>
    </div>
  );
}
