"use client";

import { Product, Shop } from "@/types";
import { getShopById } from "@/data/mockData";
import { Star, MapPin, ShoppingBag, Eye, BadgeCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index: number;
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-neutral-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product, onClick, index }: ProductCardProps) {
  const shop = getShopById(product.shopId) as Shop;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article
      className="product-card glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between border border-white/10 hover:border-orange-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      id={`product-card-${product.id}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View details for ${product.name}`}
    >
      <div>
        {/* Product Image Section */}
        <div className="relative h-48 xs:h-52 sm:h-60 overflow-hidden bg-neutral-900">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Badges: Discount & Featured */}
          <div className="absolute top-2.5 xs:top-3 left-2.5 xs:left-3 flex flex-col gap-1 z-10">
            {discount && (
              <span className="text-[10px] xs:text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white px-2 xs:px-2.5 py-0.5 rounded-md shadow-md backdrop-blur-sm">
                -{discount}% OFF
              </span>
            )}
            {product.featured && (
              <span className="text-[10px] xs:text-[11px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-md shadow-md">
                ✦ Popular
              </span>
            )}
          </div>

          {/* Stock Tag on Image */}
          <div className="absolute top-2.5 xs:top-3 right-2.5 xs:right-3 z-10">
            {product.inStock ? (
              <span className="text-[10px] xs:text-[11px] font-medium bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                In Stock
              </span>
            ) : (
              <span className="text-[10px] xs:text-[11px] font-semibold bg-red-950/90 border border-red-500/40 text-red-300 px-2 py-0.5 rounded-full backdrop-blur-md">
                Sold Out
              </span>
            )}
          </div>

          {/* Bottom Bar on Image: Category Badge */}
          <div className="absolute bottom-2 xs:bottom-2.5 left-2.5 xs:left-3 right-2.5 xs:right-3 flex items-center justify-between text-xs z-10">
            <span className="bg-black/60 backdrop-blur-md text-neutral-200 px-2 xs:px-2.5 py-0.5 rounded-md border border-white/10 text-[11px] font-medium">
              {product.category}
            </span>
            {shop && (
              <span className="text-[10px] xs:text-[11px] text-neutral-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1 truncate max-w-[130px]">
                <MapPin className="w-3 h-3 text-orange-400 flex-shrink-0" />
                <span className="truncate">{shop.area}</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-3.5 xs:p-4 space-y-2 xs:space-y-2.5">
          {/* Shop Name & Stall Badge */}
          <div className="flex items-center justify-between gap-1 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-400 truncate">
              <ShoppingBag className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <span className="font-semibold text-neutral-300 truncate group-hover:text-orange-400 transition-colors">
                {shop?.name}
              </span>
              {shop?.verified && (
                <BadgeCheck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              )}
            </div>
            {shop?.stallNumber && (
              <span className="text-[10px] text-neutral-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded flex-shrink-0">
                {shop.stallNumber}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-xs xs:text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-orange-200 transition-colors">
            {product.name}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-2 pt-0.5">
            <RatingStars rating={product.rating} />
            <span className="text-xs font-semibold text-white">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] xs:text-xs text-neutral-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Price in LKR and 'View Details' Button */}
      <div className="p-3.5 xs:p-4 pt-0">
        <div className="pt-2.5 xs:pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[10px] xs:text-xs text-neutral-400 font-medium">Price in LKR</div>
            <div className="text-base xs:text-lg font-black text-white leading-tight truncate">
              LKR{" "}
              <span className="text-orange-400">
                {product.price.toLocaleString()}
              </span>
            </div>
            {product.originalPrice && (
              <div className="text-[10px] xs:text-[11px] text-neutral-400 line-through truncate">
                LKR {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          {/* Quick 'View Details' prominent button */}
          <button
            type="button"
            id={`view-details-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center gap-1 xs:gap-1.5 text-[11px] xs:text-xs font-semibold bg-white/10 hover:bg-orange-500 text-white hover:text-white px-2.5 xs:px-3.5 py-2 rounded-xl transition-all duration-200 border border-white/15 hover:border-orange-500 shadow-md group/btn flex-shrink-0"
          >
            <Eye className="w-3.5 h-3.5 text-orange-400 group-hover/btn:text-white transition-colors" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </article>
  );
}
