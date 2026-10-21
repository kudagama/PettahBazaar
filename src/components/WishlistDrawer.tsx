"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Store,
  Star,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { getShopById } from "@/data/mockData";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    addToCart,
    openCart,
    addToast,
  } = useCart();

  const { allProducts } = useMarketplace();

  if (!isWishlistOpen) return null;

  const wishlistProducts = allProducts.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((p) => {
      addToCart(p, { quantity: 1 });
    });
    addToast("All Moved to Bag", `${wishlistProducts.length} items added to your cart!`, "success");
    closeWishlist();
    openCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop bg-black/80 backdrop-blur-sm flex justify-end animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeWishlist();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist Drawer"
    >
      <div className="w-full max-w-md bg-[#111111] border-l border-white/10 h-full flex flex-col shadow-2xl animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                My Wishlist
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {wishlist.length} saved
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">Favorite items to buy later</p>
            </div>
          </div>

          <button
            onClick={closeWishlist}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-neutral-600">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">No saved favorites yet</h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xs mb-6">
                Click the heart icon on any product in PettahBazaar to save items for later!
              </p>
              <button
                onClick={closeWishlist}
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const shop = getShopById(product.shopId);

              return (
                <div
                  key={product.id}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex gap-3.5 group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 flex-shrink-0">
                    <Image
                      src={product.images[0] || ""}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-orange-300 transition-colors">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-neutral-500 hover:text-rose-400 p-1 transition-colors flex-shrink-0"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-0.5 truncate">
                        <Store className="w-3 h-3 text-orange-400 flex-shrink-0" />
                        <span className="truncate">{shop?.name}</span>
                      </div>

                      <div className="text-xs font-black text-white mt-1">
                        LKR {product.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-orange-500/20"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 sm:p-5 bg-neutral-950/80 border-t border-white/10 space-y-2">
            <button
              onClick={handleMoveAllToCart}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/25 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Bag ({wishlistProducts.length} items)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
