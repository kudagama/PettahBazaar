"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Product, Shop } from "@/types";
import { shops } from "@/data/mockData";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Eye,
  Store,
  Flame,
} from "lucide-react";

interface PromoCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function PromoCarousel({
  products,
  onProductClick,
}: PromoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Take top featured items across different bazaar categories
  const carouselItems = products.slice(0, 6);

  // Auto-play timer (slides every 4.5 seconds unless hovered)
  useEffect(() => {
    if (isPaused || carouselItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, carouselItems.length]);

  if (carouselItems.length === 0) return null;

  const currentItem = carouselItems[currentIndex];
  const shop = shops.find((s) => s.id === currentItem.shopId);

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  const discount = currentItem.originalPrice
    ? Math.round(
        ((currentItem.originalPrice - currentItem.price) /
          currentItem.originalPrice) *
          100
      )
    : null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
          <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Pettah Highlights & Deals</span>
            <span className="flex items-center gap-1 text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full lowercase">
              <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
              trending today
            </span>
          </h2>
        </div>

        {/* Small Navigation Arrows on Desktop */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevSlide}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            aria-label="Previous highlight"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            aria-label="Next highlight"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Banner Slide Container */}
      <div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-[#181818] to-neutral-900 border border-white/10 shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[260px] sm:min-h-[290px]">
          {/* LEFT: Product Description & Stall Callout (7 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between z-10">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-md">
                  {currentItem.category}
                </span>
                {discount && (
                  <span className="text-xs font-bold text-white bg-red-600 px-2.5 py-1 rounded-md shadow-md">
                    -{discount}% OFF
                  </span>
                )}
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 ml-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live in Stall
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight mb-2">
                {currentItem.name}
              </h3>

              {/* Shop Badge Snippet */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-3">
                <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                  <Store className="w-3.5 h-3.5 text-orange-400" />
                  <span>{shop?.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>
                    {shop?.area} ({shop?.stallNumber || "Pettah"})
                  </span>
                </div>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400">{shop?.distance} walk</span>
              </div>

              {/* Short snippet */}
              <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 max-w-xl leading-relaxed mb-4">
                {currentItem.description}
              </p>
            </div>

            {/* Price & Action Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  LKR{" "}
                  <span className="text-orange-400">
                    {currentItem.price.toLocaleString()}
                  </span>
                </span>
                {currentItem.originalPrice && (
                  <span className="text-xs sm:text-sm text-neutral-500 line-through">
                    LKR {currentItem.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                id={`carousel-view-${currentItem.id}`}
                onClick={() => onProductClick(currentItem)}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 active:scale-95"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Featured Image (5 Cols) */}
          <div className="md:col-span-5 relative h-56 md:h-auto min-h-[220px] bg-neutral-950 overflow-hidden">
            <Image
              src={currentItem.images[0]}
              alt={currentItem.name}
              fill
              className="object-cover transition-all duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            {/* Vignette gradients for seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900 via-transparent to-transparent opacity-90 md:opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          </div>
        </div>

        {/* Carousel Progress Indicators / Dots */}
        <div className="absolute bottom-3 left-6 sm:left-8 flex items-center gap-1.5 z-20">
          {carouselItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx
                  ? "w-7 bg-orange-500 shadow-md shadow-orange-500/40"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
