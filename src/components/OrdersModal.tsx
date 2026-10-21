"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
  RotateCcw,
  Search,
  Store,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Order, OrderStatus } from "@/types";

export default function OrdersModal() {
  const {
    orders,
    isOrdersModalOpen,
    closeOrdersModal,
    viewOrderConfirmation,
    addToCart,
    openCart,
    addToast,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  if (!isOrdersModalOpen) return null;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "placed":
        return (
          <span className="text-[11px] font-bold bg-blue-500/15 border border-blue-500/30 text-blue-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Order Placed
          </span>
        );
      case "confirmed":
      case "processing":
        return (
          <span className="text-[11px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Packing in Stall
          </span>
        );
      case "shipped":
        return (
          <span className="text-[11px] font-bold bg-purple-500/15 border border-purple-500/30 text-purple-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Truck className="w-3 h-3 text-purple-400" />
            Out for Delivery
          </span>
        );
      case "delivered":
        return (
          <span className="text-[11px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="text-[11px] font-bold bg-rose-500/15 border border-rose-500/30 text-rose-400 px-2.5 py-0.5 rounded-full">
            Cancelled
          </span>
        );
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-LK", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOrdersModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="My Orders History"
    >
      <div className="glass-card bg-[#141414] border border-white/15 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                My Orders & Deliveries
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                  {orders.length} Total
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Track status and order receipts from Pettah merchants
              </p>
            </div>
          </div>

          <button
            onClick={closeOrdersModal}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close orders modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by Order ID, item, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["all", "placed", "processing", "shipped", "delivered"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all capitalize ${
                  filterStatus === st
                    ? "bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {st === "all" ? "All Orders" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <Package className="w-12 h-12 text-neutral-600 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No orders found</h3>
              <p className="text-xs text-neutral-400 max-w-xs mb-4">
                {searchQuery || filterStatus !== "all"
                  ? "Try clearing your filters or search terms."
                  : "You haven't placed any orders yet. Explore Pettah deals and shop now!"}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-4"
              >
                {/* Order Top Summary */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-white text-sm sm:text-base">
                      #{order.id}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {formatDate(order.createdAt)}
                    </span>
                    <span className="text-neutral-500 hidden sm:inline">·</span>
                    <span className="text-xs text-neutral-300 hidden sm:inline">
                      {order.shippingMethod}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <button
                      onClick={() => {
                        closeOrdersModal();
                        viewOrderConfirmation(order);
                      }}
                      className="text-xs text-orange-400 hover:text-orange-300 font-semibold px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors flex items-center gap-1"
                    >
                      <span>Receipt</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center gap-3"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-950 flex-shrink-0">
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-semibold text-white line-clamp-1">
                          {item.productName}
                        </h4>
                        <div className="text-[11px] text-neutral-400 mt-0.5 truncate">
                          Qty: {item.quantity} · {item.selectedSize} ·{" "}
                          <span className="text-orange-300">{item.shopName}</span>
                        </div>
                        <div className="text-xs font-bold text-white mt-1">
                          LKR {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar: Total & Quick Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs">
                  <div className="flex items-center gap-4 text-neutral-300">
                    <div>
                      <span className="text-neutral-500">Total: </span>
                      <span className="text-white font-black text-sm">
                        LKR {order.total.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Payment: </span>
                      <span className="text-orange-400 font-semibold uppercase">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Destination: </span>
                      <span className="text-neutral-200">
                        {order.customer.city}, {order.customer.district}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        closeOrdersModal();
                        viewOrderConfirmation(order);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-orange-400" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
