"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { shops } from "@/data/mockData";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Eye,
  Store,
  Flame,
  Sparkles,
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

  // Auto-play timer (slides smoothly every 4.8 seconds unless hovered)
  useEffect(() => {
    if (isPaused || carouselItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4800);

    return () => clearInterval(timer);
  }, [isPaused, carouselItems.length]);

  if (carouselItems.length === 0) return null;

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
    if (diff > 40) nextSlide();
    if (diff < -40) prevSlide();
    touchStartX.current = null;
  };

  return (
    <section className="px-3 sm:px-6 lg:px-8 xl:px-12 max-w-[1720px] mx-auto w-full mb-8 sm:mb-10">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-gradient-to-b from-orange-500 via-amber-400 to-red-600 rounded-full" />
          <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Pettah Highlights</span>
            <span className="flex items-center gap-1 text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full lowercase shadow-sm">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
              trending
            </span>
          </h2>
        </div>

        {/* Small Navigation Arrows & Slide Counter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium hidden sm:inline">
            <span className="text-white font-bold">{currentIndex + 1}</span> / {carouselItems.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              className="p-2 rounded-xl bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-neutral-300 hover:text-white transition-all active:scale-95 shadow-sm"
              aria-label="Previous highlight"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-xl bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-neutral-300 hover:text-white transition-all active:scale-95 shadow-sm"
              aria-label="Next highlight"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Banner Slide Container */}
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-neutral-900 via-[#161618] to-neutral-900 border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.85)] group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animated Slide Track */}
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item, idx) => {
            const shop = shops.find((s) => s.id === item.shopId);
            const discount = item.originalPrice
              ? Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) * 100
                )
              : null;
            const isActive = idx === currentIndex;

            return (
              <div
                key={item.id}
                className="w-full flex-shrink-0 min-w-full"
                aria-hidden={!isActive}
              >
                <div className="flex flex-col md:grid md:grid-cols-12 min-h-0 md:min-h-[300px]">
                  {/* IMAGE SECTION (Mobile First, Desktop 5 Cols) */}
                  <div className="md:col-span-5 relative h-52 xs:h-60 sm:h-72 md:h-auto min-h-[220px] bg-neutral-950 overflow-hidden md:order-2">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className={`object-cover transition-transform duration-1000 ease-out ${
                        isActive ? "scale-105" : "scale-100"
                      } group-hover:scale-110`}
                      sizes="(max-width: 768px) 100vw, 42vw"
                      priority={idx === 0}
                    />
                    {/* Vignette gradients for seamless blend */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#161618] via-transparent to-transparent opacity-95 md:opacity-85" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-transparent to-transparent md:hidden" />

                    {/* Image Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                      {discount && (
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 px-2.5 py-1 rounded-lg shadow-md backdrop-blur-sm">
                          -{discount}% OFF
                        </span>
                      )}
                      {item.featured && (
                        <span className="text-xs font-bold bg-orange-500 text-white px-2.5 py-1 rounded-lg shadow-md">
                          ✦ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CONTENT SECTION (Desktop 7 Cols) */}
                  <div className="md:col-span-7 p-4 xs:p-6 sm:p-8 flex flex-col justify-between z-10 md:order-1">
                    <div
                      className={`transition-all duration-700 delay-100 ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-40 translate-y-2"
                      }`}
                    >
                      {/* Category & Badge */}
                      <div className="flex items-center gap-2 mb-2.5 sm:mb-3 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-orange-400 bg-orange-500/10 border border-orange-500/25 px-2.5 py-1 rounded-lg">
                          {item.category}
                        </span>
                        {discount && (
                          <span className="hidden md:inline text-xs font-bold text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 rounded-lg">
                            Bazaar Deal -{discount}%
                          </span>
                        )}
                        <span className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5 ml-auto">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Live in Stall
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2.5 line-clamp-2">
                        {item.name}
                      </h3>

                      {/* Shop Badge Snippet */}
                      <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-xs sm:text-sm text-neutral-300 font-medium mb-2.5 sm:mb-3">
                        <div className="flex items-center gap-1.5 text-neutral-100 font-bold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                          <Store className="w-4 h-4 text-orange-400 flex-shrink-0" />
                          <span className="truncate max-w-[150px] xs:max-w-none">{shop?.name}</span>
                        </div>
                        {shop?.stallNumber && (
                          <span className="text-neutral-400 text-xs bg-white/5 px-2 py-0.5 rounded">
                            {shop.stallNumber}
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-neutral-300">
                          <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                          <span>{shop?.area}</span>
                        </div>
                        <span className="text-neutral-500 hidden xs:inline">·</span>
                        <span className="text-neutral-400 hidden xs:inline">{shop?.distance} walk</span>
                      </div>

                      {/* Short Description */}
                      <p className="text-sm sm:text-base text-neutral-300 line-clamp-2 max-w-xl leading-relaxed mb-3 sm:mb-4 font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Action Button */}
                    <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 pt-3.5 border-t border-white/10">
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-2xl xs:text-3xl sm:text-4xl font-black text-white">
                          LKR{" "}
                          <span className="text-orange-400">
                            {item.price.toLocaleString()}
                          </span>
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs sm:text-sm text-neutral-400 line-through font-medium">
                            LKR {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        id={`carousel-view-${item.id}`}
                        onClick={() => onProductClick(item)}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs sm:text-base px-5 py-2.5 sm:py-3 rounded-xl transition-all shadow-lg shadow-orange-500/30 active:scale-95 hover:shadow-orange-500/50"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Smooth Indicators / Progress Dots */}
        <div className="p-3 sm:absolute sm:bottom-3 sm:left-8 flex items-center justify-center sm:justify-start gap-2 z-20 bg-black/40 sm:bg-transparent">
          {carouselItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                currentIndex === idx
                  ? "w-8 bg-gradient-to-r from-orange-500 to-red-500 shadow-md shadow-orange-500/50"
                  : "w-2.5 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
