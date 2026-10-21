// Types for the PettahBazaar Mobile Application

export interface Product {
  id: string;
  name: string;
  category: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  sizes: string[];
  colors: ColorOption[];
  description: string;
  material?: string;
  brand?: string;
  inStock: boolean;
  stockCount: number;
  shopId: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Shop {
  id: string;
  name: string;
  ownerName: string;
  description: string;
  category: string;
  address: string;
  area: string;
  stallNumber?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  openHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance: string; // e.g., "120m", "0.3km"
  rating: number;
  reviewCount: number;
  verified: boolean;
  imageUrl: string;
  specialties: string[];
  established?: number;
}

export interface SearchFilters {
  query: string;
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  sortBy: "relevance" | "price_asc" | "price_desc" | "rating" | "distance";
  inStockOnly: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type UserRole = "customer" | "seller";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  shopId?: string;
}
