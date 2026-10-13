"use client";

import { MapPin, Star, Phone, BadgeCheck, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Shop } from "@/types";
import { getProductsByShop } from "@/data/mockData";

interface ShopCardProps {
  shop: Shop;
  onViewShop: () => void;
}

export default function ShopCard({ shop, onViewShop }: ShopCardProps) {
  const products = getProductsByShop(shop.id);

  return (
    <div
      className="glass-card overflow-hidden cursor-pointer group product-card"
      onClick={onViewShop}
      id={`shop-card-${shop.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onViewShop()}
    >
      <div className="relative h-32 overflow-hidden bg-neutral-900">
        <Image
          src={shop.imageUrl}
          alt={shop.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">
              {shop.name}
            </h3>
            <p className="text-xs text-neutral-300">{shop.area}</p>
          </div>
          {shop.verified && (
            <BadgeCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
          )}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white">{shop.rating}</span>
            <span className="text-xs text-neutral-500">({shop.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <MapPin className="w-3 h-3 text-orange-400" />
            {shop.distance}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Phone className="w-3 h-3 text-green-400" />
          {shop.phone}
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">{products.length} products</span>
          <button className="flex items-center gap-0.5 text-orange-400 hover:text-orange-300 font-medium transition-colors group/btn">
            Browse
            <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
