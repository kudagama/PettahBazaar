"use client";

import { Product, Shop } from "@/types";
import { getShopById } from "@/data/mockData";
import { Star, MapPin, ShoppingBag, Eye, BadgeCheck, Heart, Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

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
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const isFavorite = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, { quantity: 1 });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

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
              <span className="text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white px-2.5 py-0.5 rounded-md shadow-md backdrop-blur-sm">
                -{discount}% OFF
              </span>
            )}
            {product.featured && (
              <span className="text-xs font-bold bg-orange-500 text-white px-2.5 py-0.5 rounded-md shadow-md">
                ✦ Popular
              </span>
            )}
          </div>

          {/* Wishlist Heart & Stock Tag on Image */}
          <div className="absolute top-2.5 xs:top-3 right-2.5 xs:right-3 z-10 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleWishlistClick}
              className={`p-1.5 rounded-full backdrop-blur-md border transition-all ${
                isFavorite
                  ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 scale-105"
                  : "bg-black/50 text-neutral-300 border-white/20 hover:text-white hover:bg-black/80"
              }`}
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              title={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isFavorite ? "fill-white text-white" : ""
                }`}
              />
            </button>

            {product.inStock ? (
              <span className="text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                In Stock
              </span>
            ) : (
              <span className="text-xs font-semibold bg-red-950/90 border border-red-500/40 text-red-300 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                Sold Out
              </span>
            )}
          </div>

          {/* Bottom Bar on Image: Category Badge */}
          <div className="absolute bottom-2 xs:bottom-2.5 left-2.5 xs:left-3 right-2.5 xs:right-3 flex items-center justify-between text-xs z-10">
            <span className="bg-black/70 backdrop-blur-md text-neutral-100 px-2.5 py-0.5 rounded-md border border-white/10 text-xs font-semibold">
              {product.category}
            </span>
            {shop && (
              <span className="text-xs text-neutral-200 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10 flex items-center gap-1 truncate max-w-[140px] font-medium">
                <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span className="truncate">{shop.area}</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-3.5 xs:p-4 space-y-2 xs:space-y-2.5">
          {/* Shop Name & Stall Badge */}
          <div className="flex items-center justify-between gap-1 text-sm">
            <div className="flex items-center gap-1.5 text-neutral-400 truncate">
              <ShoppingBag className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <span className="font-bold text-neutral-200 truncate group-hover:text-orange-400 transition-colors">
                {shop?.name}
              </span>
              {shop?.verified && (
                <BadgeCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
              )}
            </div>
            {shop?.stallNumber && (
              <span className="text-xs text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded flex-shrink-0 font-medium">
                {shop.stallNumber}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm xs:text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-orange-200 transition-colors">
            {product.name}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-2 pt-0.5">
            <RatingStars rating={product.rating} />
            <span className="text-sm font-bold text-white">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-neutral-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Price in LKR and Action Buttons */}
      <div className="p-3.5 xs:p-4 pt-0">
        <div className="pt-2.5 xs:pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Wholesale Price</div>
            <div className="text-lg xs:text-xl font-black text-white leading-tight truncate">
              LKR{" "}
              <span className="text-orange-400">
                {product.price.toLocaleString()}
              </span>
            </div>
            {product.originalPrice && (
              <div className="text-xs text-neutral-400 line-through truncate font-medium">
                LKR {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          {/* Dual Action: Quick Add to Bag + Details */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {product.inStock && (
              <button
                type="button"
                id={`quick-add-${product.id}`}
                onClick={handleQuickAdd}
                className="flex items-center gap-1 text-xs xs:text-sm font-bold bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-3 py-2 rounded-xl transition-all shadow-md shadow-orange-500/20"
                title="Add to shopping bag"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Add</span>
              </button>
            )}

            <button
              type="button"
              id={`view-details-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="flex items-center gap-1 text-xs xs:text-sm font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl transition-all border border-white/15"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-300" />
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

