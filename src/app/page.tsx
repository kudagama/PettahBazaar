"use client";

import { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import MapModal from "@/components/MapModal";
import ShopCard from "@/components/ShopCard";
import Pagination from "@/components/Pagination";
import PromoCarousel from "@/components/PromoCarousel";
import Footer from "@/components/Footer";
import { Product, Shop, SearchFilters } from "@/types";
import { searchProducts, shops, products } from "@/data/mockData";
import { LayoutGrid, List, Store, ChevronUp, Home, Navigation, Search } from "lucide-react";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 8;

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
  const [currentPage, setCurrentPage] = useState(1);
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

  // Reset to page 1 whenever search filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

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

  // Pagination slicing
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, startIndex, endIndex]);

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
      <Navbar
        onSearch={handleSearch}
        onCategorySelect={(cat) => handleFilterChange({ category: cat })}
        onLocationSelect={(loc) => handleFilterChange({ location: loc })}
        cartCount={0}
      />

      {/* Hero */}
      <Hero onSearch={handleSearch} initialQuery={filters.query} />

      {/* Interactive Highlights & Deals Carousel */}
      <PromoCarousel
        products={featuredProducts}
        onProductClick={handleProductClick}
      />

      {/* Main content */}
      <main className="px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-28 sm:pb-20">
        {/* Tab navigation */}
        <div className="flex items-center justify-between mb-5 sm:mb-6 gap-2">
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/8">
            <button
              id="tab-products"
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all ${
                activeTab === "products"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Products</span>
            </button>
            <button
              id="tab-shops"
              onClick={() => setActiveTab("shops")}
              className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all ${
                activeTab === "shops"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Shops ({shops.length})</span>
            </button>
          </div>

          {/* Grid / List toggle */}
          {activeTab === "products" && (
            <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/8">
              <button
                id="view-grid"
                onClick={() => setView("grid")}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
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
                className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
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
              <>
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "flex flex-col gap-3"
                  }
                >
                  {paginatedProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                      index={i}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    // Smoothly scroll to the top of products section
                    const el = document.getElementById("tab-products");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  totalItems={filteredProducts.length}
                  startIndex={startIndex}
                  endIndex={endIndex}
                />
              </>
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
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 transition-all hover:scale-110 animate-fade-in-up z-30"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Enhanced Rich Footer */}
      <Footer
        onCategorySelect={(cat) => handleFilterChange({ category: cat })}
        onLocationSelect={(loc) => handleFilterChange({ location: loc })}
      />

      {/* Mobile Sticky Bottom Navigation Dock */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-2xl border-t border-white/10 px-3 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-neutral-400 hover:text-white transition-colors py-1 px-2 active:scale-95"
          >
            <Home className="w-4 h-4 text-orange-400" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("products");
              const el = document.getElementById("tab-products");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 transition-colors active:scale-95 ${
              activeTab === "products" ? "text-orange-400 font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Products</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("shops");
              const el = document.getElementById("tab-shops");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 transition-colors active:scale-95 ${
              activeTab === "shops" ? "text-orange-400 font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Shops</span>
          </button>

          <button
            onClick={() => {
              if (shops.length > 0) handleShowMap(shops[0]);
            }}
            className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-neutral-400 hover:text-white transition-colors py-1 px-2 active:scale-95"
          >
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Map</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById("hero-large-search");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.focus();
              }
            }}
            className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-neutral-400 hover:text-white transition-colors py-1 px-2 active:scale-95"
          >
            <Search className="w-4 h-4 text-orange-400" />
            <span>Search</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
