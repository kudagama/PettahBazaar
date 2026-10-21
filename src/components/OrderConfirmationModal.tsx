"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  Clock,
  Printer,
  ShoppingBag,
  ArrowRight,
  Store,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function OrderConfirmationModal() {
  const {
    latestOrder,
    isOrderConfirmOpen,
    closeOrderConfirm,
    openOrdersModal,
    addToast,
  } = useCart();

  if (!isOrderConfirmOpen || !latestOrder) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(latestOrder.id);
    addToast("Copied!", `Order ID ${latestOrder.id} copied to clipboard.`, "info");
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-LK", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOrderConfirm();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Order Confirmation Receipt"
    >
      <div className="glass-card bg-[#141414] border border-white/15 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl p-5 sm:p-8 animate-slide-up flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header & Success Badge */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 animate-bounce">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Order Successfully Placed
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Thank You, {latestOrder.customer.name}!
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Your order has been transmitted directly to the Pettah stall merchant.
                </p>
              </div>
            </div>

            <button
              onClick={closeOrderConfirm}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close confirmation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reference Order Bar */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <div className="text-neutral-400 text-[11px]">Order Reference</div>
              <div className="text-white font-mono font-bold text-sm sm:text-base flex items-center gap-2">
                <span>{latestOrder.id}</span>
                <button
                  onClick={handleCopyOrderId}
                  className="text-neutral-400 hover:text-orange-400 transition-colors p-1"
                  title="Copy Order ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              <div className="text-neutral-400 text-[11px]">Date & Time</div>
              <div className="text-white font-medium">{formatDate(latestOrder.createdAt)}</div>
            </div>

            <div>
              <div className="text-neutral-400 text-[11px]">Payment Mode</div>
              <div className="text-orange-400 font-bold uppercase">
                {latestOrder.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : latestOrder.paymentMethod}
              </div>
            </div>

            <div>
              <div className="text-neutral-400 text-[11px]">Est. Delivery</div>
              <div className="text-emerald-400 font-semibold">
                {latestOrder.estimatedDelivery}
              </div>
            </div>
          </div>

          {/* Live Order Status Flow Tracker */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-400" />
              Live Order Progress
            </h4>
            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-emerald-500/30">
                  ✓
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-300">
                  Order Placed
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-orange-500/30 animate-pulse">
                  2
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-orange-300">
                  Stall Packing
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5 opacity-40">
                <div className="w-7 h-7 rounded-full bg-neutral-800 border border-white/20 text-neutral-400 flex items-center justify-center text-xs">
                  3
                </div>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">
                  Courier Transit
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5 opacity-40">
                <div className="w-7 h-7 rounded-full bg-neutral-800 border border-white/20 text-neutral-400 flex items-center justify-center text-xs">
                  4
                </div>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">
                  Delivered
                </span>
              </div>
            </div>
          </div>

          {/* Order Items Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-400" />
              Ordered Items ({latestOrder.items.length})
            </h4>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {latestOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-semibold text-white truncate">{item.productName}</h5>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-2 mt-0.5">
                        <span>Qty: {item.quantity}</span>
                        <span>·</span>
                        <span>Size: {item.selectedSize}</span>
                        <span>·</span>
                        <span className="text-orange-300">{item.shopName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 font-bold text-white">
                    LKR {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Financial Total */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-semibold text-neutral-400 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" /> Destination
              </div>
              <div className="text-white font-bold">{latestOrder.customer.name}</div>
              <div className="text-neutral-300">
                {latestOrder.customer.address}, {latestOrder.customer.city}
              </div>
              <div className="text-neutral-400">{latestOrder.customer.phone}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="text-white">LKR {latestOrder.subtotal.toLocaleString()}</span>
              </div>
              {latestOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Coupon Discount</span>
                  <span>- LKR {latestOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span className="text-white">
                  {latestOrder.deliveryFee === 0 ? "FREE" : `LKR ${latestOrder.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-white pt-1.5 border-t border-white/10">
                <span>Paid / Due</span>
                <span className="text-orange-400">LKR {latestOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all active:scale-95"
          >
            <Printer className="w-4 h-4 text-neutral-300" />
            <span>Print Receipt</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeOrderConfirm();
                openOrdersModal();
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all active:scale-95"
            >
              Track in My Orders
            </button>
            <button
              onClick={closeOrderConfirm}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-500/25 transition-all active:scale-95"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
