"use client";

import { Product, Shop } from "@/types";
import { getShopById } from "@/data/mockData";
import {
  X,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  BadgeCheck,
  Package,
  ChevronLeft,
  ChevronRight,
  Navigation,
  ShoppingBag,
  Store,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onShowMap: (shop: Shop) => void;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i <= Math.floor(rating)
                ? "text-amber-400 fill-amber-400"
                : i - rating < 1
                ? "text-amber-400 fill-amber-400/50"
                : "text-neutral-700"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-white">{rating.toFixed(1)}</span>
      <span className="text-xs text-neutral-400">({count} customer reviews)</span>
    </div>
  );
}

export default function ProductDetail({
  product,
  onClose,
  onShowMap,
}: ProductDetailProps) {
  const shop = getShopById(product.shopId) as Shop;
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors[0]?.name ?? null
  );

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const prevImage = () =>
    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImage = () =>
    setActiveImage((i) => (i + 1) % product.images.length);

  // Close on backdrop
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Clean phone numbers for tel: and whatsapp links
  const rawPhone = shop?.phone?.replace(/\s+/g, "") || "";
  const whatsappNum = (shop?.whatsapp || shop?.phone || "").replace(/[^0-9]/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hello ${shop?.name}! I am looking at "${product.name}" (LKR ${product.price.toLocaleString()}) on PettahBazaar. Is it currently available at your stall (${shop?.stallNumber || shop?.address})?`
  );

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop bg-black/85 flex items-end sm:items-center justify-center p-0 sm:p-5 animate-fade-in-up"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`Product details for ${product.name}`}
    >
      <div className="glass-card bg-[#141414] border-t sm:border border-white/15 w-full max-w-4xl h-[94vh] sm:h-auto sm:max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up flex flex-col">
        {/* Modal Top Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#141414]/95 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <span className="text-orange-400 font-semibold">{product.category}</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-300 font-medium truncate max-w-[180px] xs:max-w-[260px] sm:max-w-md">
              {product.name}
            </span>
          </div>
          <button
            id="close-product-detail"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close product detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1">
          {/* LEFT: Image Gallery / Main Photo (5 Cols) */}
          <div className="lg:col-span-5 bg-neutral-950 p-3.5 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              {/* Main Photo */}
              <div className="relative h-64 xs:h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                <Image
                  src={product.images[activeImage]}
                  alt={`${product.name} - view ${activeImage + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />

                {/* Nav arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      id="prev-image-btn"
                      onClick={prevImage}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white transition-colors backdrop-blur-md border border-white/10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      id="next-image-btn"
                      onClick={nextImage}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white transition-colors backdrop-blur-md border border-white/10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Discount Badge */}
                {discount && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                    -{discount}% OFF
                  </div>
                )}

                {/* Image counter indicator */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full border border-white/10">
                  {activeImage + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnails Gallery */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImage === idx
                          ? "border-orange-500 scale-105 shadow-md shadow-orange-500/20"
                          : "border-white/15 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumb ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick stock status badge */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Inventory Status:</span>
              <span
                className={`font-semibold flex items-center gap-1.5 ${
                  product.inStock ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.inStock ? "bg-emerald-400 animate-pulse" : "bg-rose-500"
                  }`}
                />
                {product.inStock
                  ? `In Stock (${product.stockCount} left in stall)`
                  : "Currently Out of Stock"}
              </span>
            </div>
          </div>

          {/* RIGHT: Product Specs + Shop Info Badge + Prominent Actions (7 Cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 space-y-5 overflow-y-auto">
            {/* Title & Brand */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {product.name}
              </h2>
              {product.brand && (
                <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mt-1">
                  Brand / Line: {product.brand}
                </p>
              )}
            </div>

            {/* Rating Stars */}
            <StarRating rating={product.rating} count={product.reviewCount} />

            {/* Price Box */}
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">
                LKR <span className="text-orange-400">{product.price.toLocaleString()}</span>
              </span>
              {product.originalPrice && (
                <span className="text-base text-neutral-400 line-through">
                  LKR {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="ml-auto text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                Pettah Bargain Price
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-300 leading-relaxed">
              {product.description}
            </p>

            {/* Sizes & Colors Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Available Sizes:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          selectedSize === sz
                            ? "bg-orange-500 border-orange-500 text-white font-bold"
                            : "bg-white/5 border-white/10 text-neutral-300 hover:text-white"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Color: <span className="text-white font-medium">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedColor === c.name
                            ? "border-orange-500 scale-125 shadow-md shadow-orange-500/30"
                            : "border-white/20 opacity-70"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SHOP INFO BADGE (Shop name, Phone number, Stall/Shop Number) */}
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/30">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{shop?.name}</span>
                      {shop?.verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div className="text-xs text-orange-300 font-medium">
                      {shop?.stallNumber || "Stall in Bazaar"} · {shop?.area}
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{shop?.distance} away</span>
                </div>
              </div>

              {/* Address and open hours info */}
              <div className="text-xs text-neutral-300 flex flex-col gap-1 pt-1 border-t border-orange-500/20">
                <div>📍 {shop?.address}</div>
                <div>🕒 {shop?.openHours}</div>
              </div>
            </div>

            {/* PROMINENT ACTION BUTTONS: Call shop, WhatsApp chat, and 'Show Location on Map' */}
            <div className="space-y-2 xs:space-y-2.5 pt-2">
              {/* Top Row: Call shop button (tel:) and WhatsApp chat button */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-2.5">
                {/* Call shop button (tel:) */}
                <a
                  id="call-shop-button"
                  href={`tel:${rawPhone}`}
                  className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white font-semibold text-xs sm:text-sm py-2.5 sm:py-3 px-3 rounded-xl border border-white/15 transition-all shadow-md group"
                >
                  <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="truncate">Call Shop</span>
                </a>

                {/* WhatsApp chat button */}
                <a
                  id="whatsapp-chat-button"
                  href={`https://wa.me/${whatsappNum}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs sm:text-sm py-2.5 sm:py-3 px-3 rounded-xl transition-all shadow-md shadow-emerald-600/25 group"
                >
                  <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="truncate">Chat WhatsApp</span>
                </a>
              </div>

              {/* Prominent CTA Button: 'Show Location on Map' */}
              <button
                id="show-location-on-map-cta"
                onClick={() => {
                  if (shop) onShowMap(shop);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 active:scale-98 text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 px-4 rounded-xl transition-all shadow-xl shadow-orange-500/30"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce" />
                <span>Show Location on Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
