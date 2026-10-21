"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
  ShieldCheck,
  Truck,
  Store,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getShopById } from "@/data/mockData";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    deliveryFee,
    grandTotal,
    appliedCoupon,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    isCartOpen,
    closeCart,
    openCheckout,
    freeShippingThreshold,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setCouponCode("");
    }
  };

  const handleQuickCoupon = (code: string) => {
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop bg-black/80 backdrop-blur-sm flex justify-end animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      <div className="w-full max-w-lg bg-[#111111] border-l border-white/10 h-full flex flex-col shadow-2xl animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Shopping Bag
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">Direct from Pettah Market stalls</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-neutral-400 hover:text-rose-400 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
                title="Empty shopping cart"
              >
                Clear All
              </button>
            )}
            <button
              onClick={closeCart}
              className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-4 sm:px-5 py-3 bg-white/5 border-b border-white/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <Truck className="w-4 h-4 text-orange-400" />
              {remainingForFreeShipping > 0 ? (
                <>
                  Add <span className="font-bold text-orange-400">LKR {remainingForFreeShipping.toLocaleString()}</span> more for <span className="text-emerald-400 font-bold">FREE Islandwide Delivery</span>
                </>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> You unlocked FREE Islandwide Delivery!
                </span>
              )}
            </span>
            <span className="text-[11px] font-bold text-neutral-400">
              {freeShippingProgress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                freeShippingProgress >= 100
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                  : "bg-gradient-to-r from-orange-500 to-amber-400"
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-neutral-600">
                <ShoppingBag className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">Your bag is empty</h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xs mb-6">
                Discover genuine wholesale and retail bargains across 500+ items directly from Pettah stalls.
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Browse Pettah Bazaar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const shop = getShopById(item.product.shopId);
              const maxStock = item.product.stockCount || 99;

              return (
                <div
                  key={item.cartItemId}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex gap-3 sm:gap-3.5 group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || ""}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-orange-300 transition-colors">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-neutral-500 hover:text-rose-400 p-1 transition-colors flex-shrink-0"
                          title="Remove from bag"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Stall / Merchant Badge */}
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-0.5 truncate">
                        <Store className="w-3 h-3 text-orange-400 flex-shrink-0" />
                        <span className="truncate">{shop?.name || "Pettah Stall"}</span>
                        {shop?.stallNumber && (
                          <span className="text-[10px] bg-white/5 border border-white/10 px-1 py-0.2 rounded text-neutral-300 flex-shrink-0">
                            {shop.stallNumber}
                          </span>
                        )}
                      </div>

                      {/* Variant Pills (Size & Color) */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <span className="text-[10px] bg-white/5 border border-white/10 text-neutral-300 px-2 py-0.5 rounded-md font-medium">
                          Size: {item.selectedSize}
                        </span>
                        <span className="text-[10px] bg-white/5 border border-white/10 text-neutral-300 px-2 py-0.5 rounded-md font-medium">
                          Color: {item.selectedColor}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-neutral-900 border border-white/10 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          disabled={item.quantity >= maxStock}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for this line */}
                      <div className="text-right">
                        <div className="text-xs sm:text-sm font-black text-white">
                          LKR {(item.product.price * item.quantity).toLocaleString()}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-neutral-400">
                            LKR {item.product.price.toLocaleString()} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Coupon Code & Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-neutral-950/80 border-t border-white/10 space-y-4">
            {/* Promo code entry */}
            <div className="space-y-2">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-950/50 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <div>
                      <span className="font-bold">{appliedCoupon.code}</span> applied:{" "}
                      {appliedCoupon.description}
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-400 hover:text-white underline font-semibold ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter promo coupon (e.g. PETTAH10)"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 uppercase font-mono tracking-wider"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-colors active:scale-95"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-rose-400 font-medium">{couponError}</p>
              )}

              {/* Quick coupons clickable suggestions */}
              {!appliedCoupon && (
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-neutral-400">Try codes:</span>
                  <button
                    type="button"
                    onClick={() => handleQuickCoupon("PETTAH10")}
                    className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-300 hover:bg-orange-500/20 font-mono"
                  >
                    PETTAH10 (10% off)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickCoupon("BAZAARFREE")}
                    className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 font-mono"
                  >
                    BAZAARFREE
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickCoupon("COLOMBO500")}
                    className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 font-mono"
                  >
                    COLOMBO500
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-300 border-t border-white/5 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">LKR {subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Coupon Discount
                  </span>
                  <span className="font-semibold">- LKR {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Courier Delivery</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `LKR ${deliveryFee.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base sm:text-lg font-black text-white pt-2 border-t border-white/10">
                <span>Grand Total</span>
                <span className="text-orange-400">LKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action CTA */}
            <div className="space-y-2">
              <button
                id="cart-proceed-checkout-btn"
                onClick={openCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 active:scale-98 text-white font-bold text-sm sm:text-base transition-all shadow-xl shadow-orange-500/25"
              >
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>Proceed to Checkout (LKR {grandTotal.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure Checkout
                </span>
                <span>•</span>
                <span>Cash on Delivery & Cards</span>
                <span>•</span>
                <span>Direct Stall Pickup</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
