// Types for the PettahBazaar application

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
  distance: string; // e.g., "150m", "0.3km"
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
  cartItemId: string; // composite key e.g. `${productId}-${size}-${color}`
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number; // e.g. 10 for 10%
  discountAmount?: number; // e.g. 500 for LKR 500
  minSpend: number;
  description: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  estimatedDays: string;
  cost: number;
  description: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userLocation?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  shopId: string;
  shopName: string;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cod" | "card" | "koko" | "lankaqr";

export interface Order {
  id: string; // e.g. "PB-84920"
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid";
  shippingMethod: string;
  shippingMethodId: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning";
}

export type UserRole = "customer" | "seller";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  shopId?: string; // If role is seller, links to their registered shop
}

