"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
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
import AuthModal from "@/components/AuthModal";
import SellerDashboard from "@/components/SellerDashboard";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import OrderConfirmationModal from "@/components/OrderConfirmationModal";
import OrdersModal from "@/components/OrdersModal";
import Toast from "@/components/Toast";
import { Product, Shop, SearchFilters } from "@/types";
import { searchProducts } from "@/data/mockData";
import { useMarketplace } from "@/context/MarketplaceContext";
import { useCart } from "@/context/CartContext";
import {
  LayoutGrid,
  List,
  Store,
  ChevronUp,
  Home,
  Navigation,
  Search,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 18;

export default function HomePage() {
  const {
    allProducts,
    allShops,
    currentUser,
    isAuthModalOpen,
    authModalInitialRole,
    closeAuthModal,
    openAuthModal,
  } = useMarketplace();

  const { cartCount, openCart } = useCart();

  const [activePortal, setActivePortal] = useState<"customer" | "seller">("customer");
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

  // Sync portal when user role switches
  useEffect(() => {
    if (currentUser?.role === "seller") {
      setActivePortal("seller");
    } else {
      setActivePortal("customer");
    }
  }, [currentUser?.role]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset to page 1 whenever search filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Derived: filtered products using dynamic marketplace state
  const filteredProducts = useMemo(() => {
    let results = searchProducts(
      filters.query,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.sortBy,
      filters.location,
      allProducts,
      allShops
    );
    if (filters.inStockOnly) {
      results = results.filter((p) => p.inStock);
    }
    return results;
  }, [filters, allProducts, allShops]);

  // Pagination slicing
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, startIndex, endIndex]);

  const handleSearch = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }));
    if (query) {
      setActivePortal("customer");
      setActiveTab("products");
    }
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
    () => allProducts.filter((p) => p.featured),
    [allProducts]
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar
        onSearch={handleSearch}
        onCategorySelect={(cat) => {
          setActivePortal("customer");
          handleFilterChange({ category: cat });
        }}
        onLocationSelect={(loc) => {
          setActivePortal("customer");
          handleFilterChange({ location: loc });
        }}
        activePortal={activePortal}
        onSwitchPortal={(p) => setActivePortal(p)}
        cartCount={cartCount}
      />

      {/* When in Seller Mode: Show Full Seller Portal & Shop Inventory Management */}
      {activePortal === "seller" ? (
        <SellerDashboard
          onViewProductAsCustomer={(product) => {
            setSelectedProduct(product);
            setActivePortal("customer");
          }}
          onSwitchToCustomerView={() => setActivePortal("customer")}
        />
      ) : (
        /* When in Customer Mode: Show Pettah Bazaar Shopper Experience */
        <>
          {/* Seller Customer Preview Banner */}
          {currentUser?.role === "seller" && (
            <aside aria-label="Customer preview mode banner" className="bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white py-2 px-3 sm:px-6 sticky top-[68px] sm:top-[76px] z-30 shadow-lg shadow-black/40">
              <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="font-bold truncate">
                    Previewing Customer Experience:
                  </span>
                  <span className="text-white/80 hidden sm:inline truncate">
                    This is how customers browse Pettah stalls and search products.
                  </span>
                </div>
                <button
                  onClick={() => setActivePortal("seller")}
                  className="bg-white text-neutral-900 font-bold px-3 py-1 rounded-lg text-xs hover:bg-neutral-100 flex items-center gap-1 flex-shrink-0 shadow transition-all active:scale-95"
                >
                  <Store className="w-3.5 h-3.5 text-orange-500" />
                  <span>My Seller Stall →</span>
                </button>
              </div>
            </aside>
          )}

          {/* Hero */}
          <Hero onSearch={handleSearch} initialQuery={filters.query} />

          {/* Interactive Highlights & Deals Carousel */}
          <PromoCarousel
            products={featuredProducts}
            onProductClick={handleProductClick}
          />

          {/* Main content */}
          <main className="px-3 sm:px-6 lg:px-8 xl:px-12 max-w-[1720px] mx-auto w-full pb-28 sm:pb-20">
            {/* Tab navigation */}
            <div className="flex items-center justify-between mb-5 sm:mb-6 gap-2">
              <div className="flex items-center gap-1.5 bg-white/5 rounded-xl p-1.5 border border-white/8">
                <button
                  id="tab-products"
                  onClick={() => setActiveTab("products")}
                  className={`flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-bold px-3.5 sm:px-5 py-2 rounded-lg transition-all ${
                    activeTab === "products"
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Products ({filteredProducts.length})</span>
                </button>
                <button
                  id="tab-shops"
                  onClick={() => setActiveTab("shops")}
                  className={`flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-bold px-3.5 sm:px-5 py-2 rounded-lg transition-all ${
                    activeTab === "shops"
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Shops ({allShops.length})</span>
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
                      Try adjusting your search or filters. Check our {allShops.length} local shops for
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
                          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3.5 sm:gap-4.5"
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
                  <span className="text-white font-semibold">{allShops.length}</span>{" "}
                  merchants in Pettah, Colombo 11
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {allShops.map((shop) => (
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
        </>
      )}

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

      {/* Customer & Seller Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialRole={authModalInitialRole}
      />

      {/* Real-World E-Commerce Drawers, Modals & Notifications */}
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrdersModal />
      <Toast />

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
        onCategorySelect={(cat) => {
          setActivePortal("customer");
          handleFilterChange({ category: cat });
        }}
        onLocationSelect={(loc) => {
          setActivePortal("customer");
          handleFilterChange({ location: loc });
        }}
      />

      {/* Mobile Sticky Bottom Navigation Dock */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-2xl border-t border-white/10 px-3 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => {
              setActivePortal("customer");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors py-1 px-2 active:scale-95 ${
              activePortal === "customer" && activeTab === "products"
                ? "text-orange-400 font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              setActivePortal("customer");
              setActiveTab("products");
              const el = document.getElementById("tab-products");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 transition-colors active:scale-95 ${
              activePortal === "customer" && activeTab === "products" ? "text-orange-400 font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Products</span>
          </button>

          <button
            onClick={() => {
              setActivePortal("customer");
              setActiveTab("shops");
              const el = document.getElementById("tab-shops");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 transition-colors active:scale-95 ${
              activePortal === "customer" && activeTab === "shops" ? "text-orange-400 font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Shops</span>
          </button>

          {/* Mobile Direct Cart / Shopping Bag Button */}
          <button
            onClick={openCart}
            className="relative flex flex-col items-center gap-0.5 text-[10px] font-semibold text-neutral-400 hover:text-white transition-colors py-1 px-2 active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-orange-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-orange-500 text-white text-[9px] font-black flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Bag</span>
          </button>

          {/* Seller Mode / Portal Mobile Dock Quick Switch */}
          {currentUser?.role === "seller" ? (
            <button
              onClick={() => setActivePortal(activePortal === "seller" ? "customer" : "seller")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
                activePortal === "seller"
                  ? "bg-red-500/20 text-red-300 border border-red-500/40"
                  : "text-orange-400"
              }`}
            >
              {activePortal === "seller" ? (
                <>
                  <ShoppingBag className="w-4 h-4 text-orange-400" />
                  <span>Cx View</span>
                </>
              ) : (
                <>
                  <Store className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>My Stall</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => openAuthModal("seller")}
              className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-neutral-400 hover:text-white transition-colors py-1 px-2 active:scale-95"
            >
              <Store className="w-4 h-4 text-red-400" />
              <span>Sell</span>
            </button>
          )}

          <button
            onClick={() => {
              if (allShops.length > 0) handleShowMap(allShops[0]);
            }}
            className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-neutral-400 hover:text-white transition-colors py-1 px-2 active:scale-95"
          >
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Map</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
