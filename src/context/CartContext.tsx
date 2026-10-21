"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  Product,
  CartItem,
  Coupon,
  ShippingMethod,
  Order,
  OrderCustomer,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  ProductReview,
  ToastNotification,
} from "@/types";
import {
  shippingMethods as defaultShippingMethods,
  initialCoupons,
  initialReviews,
  initialOrders,
  getShopById,
} from "@/data/mockData";

interface CartContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  grandTotal: number;
  appliedCoupon: Coupon | null;
  addToCart: (
    product: Product,
    options?: { quantity?: number; selectedSize?: string; selectedColor?: string }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  selectedShippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  availableShippingMethods: ShippingMethod[];
  freeShippingThreshold: number;

  // Drawers & Modals
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  isOrdersModalOpen: boolean;
  openOrdersModal: () => void;
  closeOrdersModal: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (
    customer: OrderCustomer,
    paymentMethod: PaymentMethod,
    notes?: string
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  closeOrderConfirm: () => void;
  isOrderConfirmOpen: boolean;
  viewOrderConfirmation: (order: Order) => void;

  // Reviews
  reviews: ProductReview[];
  addReview: (reviewData: Omit<ProductReview, "id" | "date">) => void;
  getProductReviews: (productId: string) => ProductReview[];

  // Toasts
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEY_CART = "pettah_bazaar_cart_v2";
const STORAGE_KEY_WISHLIST = "pettah_bazaar_wishlist_v2";
const STORAGE_KEY_ORDERS = "pettah_bazaar_orders_v2";
const STORAGE_KEY_REVIEWS = "pettah_bazaar_reviews_v2";
const FREE_SHIPPING_THRESHOLD = 8000; // Free islandwide shipping on orders above LKR 8,000

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod>(
    defaultShippingMethods[0]
  );
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Modal controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY_CART);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(STORAGE_KEY_WISHLIST);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(initialOrders));
      }

      const savedReviews = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(initialReviews));
      }
    } catch (e) {
      console.error("Failed to load e-commerce state from storage:", e);
    }
  }, []);

  // Save Cart to LocalStorage
  const persistCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  };

  // Save Wishlist to LocalStorage
  const persistWishlist = (newWishlist: string[]) => {
    setWishlist(newWishlist);
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(newWishlist));
    } catch (e) {
      console.error(e);
    }
  };

  // Save Orders to LocalStorage
  const persistOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(newOrders));
    } catch (e) {
      console.error(e);
    }
  };

  // Save Reviews to LocalStorage
  const persistReviews = (newReviews: ProductReview[]) => {
    setReviews(newReviews);
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(newReviews));
    } catch (e) {
      console.error(e);
    }
  };

  // Toast Helper
  const addToast = useCallback(
    (title: string, message: string, type: "success" | "info" | "warning" = "success") => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      setToasts((prev) => [...prev, { id, title, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Add to Cart
  const addToCart = useCallback(
    (
      product: Product,
      options?: { quantity?: number; selectedSize?: string; selectedColor?: string }
    ) => {
      const qty = options?.quantity || 1;
      const size = options?.selectedSize || product.sizes[0] || "Standard";
      const color = options?.selectedColor || product.colors[0]?.name || "Original";
      const cartItemId = `${product.id}-${size}-${color}`;

      setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
        let updated: CartItem[];

        if (existingIndex > -1) {
          const newQty = prev[existingIndex].quantity + qty;
          const cappedQty = Math.min(newQty, product.stockCount || 99);
          updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: cappedQty,
          };
        } else {
          updated = [
            ...prev,
            {
              cartItemId,
              product,
              quantity: Math.min(qty, product.stockCount || 99),
              selectedSize: size,
              selectedColor: color,
            },
          ];
        }
        persistCart(updated);
        return updated;
      });

      addToast(
        "Added to Bag!",
        `${product.name} (${size}) was added to your cart.`,
        "success"
      );
    },
    [addToast]
  );

  // Remove from Cart
  const removeFromCart = useCallback(
    (cartItemId: string) => {
      setCart((prev) => {
        const item = prev.find((i) => i.cartItemId === cartItemId);
        const updated = prev.filter((i) => i.cartItemId !== cartItemId);
        persistCart(updated);
        if (item) {
          addToast("Removed item", `${item.product.name} removed from your bag.`, "info");
        }
        return updated;
      });
    },
    [addToast]
  );

  // Update Item Quantity
  const updateQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }
      setCart((prev) => {
        const updated = prev.map((item) => {
          if (item.cartItemId === cartItemId) {
            const capped = Math.min(quantity, item.product.stockCount || 99);
            return { ...item, quantity: capped };
          }
          return item;
        });
        persistCart(updated);
        return updated;
      });
    },
    [removeFromCart]
  );

  // Clear Cart
  const clearCart = useCallback(() => {
    persistCart([]);
    setAppliedCoupon(null);
  }, []);

  // Totals calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  // Delivery fee calculation
  // Free delivery if subtotal exceeds threshold or pickup selected or coupon applied
  const isFreeDeliveryEligible = subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.code === "BAZAARFREE";
  const deliveryFee =
    selectedShippingMethod.cost === 0 || isFreeDeliveryEligible
      ? 0
      : selectedShippingMethod.cost;

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Coupon handling
  const applyCoupon = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase();
      const coupon = initialCoupons.find((c) => c.code === normalized);

      if (!coupon) {
        addToast("Invalid Code", `Promo code "${code}" is not recognized.`, "warning");
        return { success: false, message: "Invalid promo code" };
      }

      if (subtotal < coupon.minSpend) {
        const diff = coupon.minSpend - subtotal;
        const msg = `Minimum spend of LKR ${coupon.minSpend.toLocaleString()} required. Add LKR ${diff.toLocaleString()} more!`;
        addToast("Minimum Spend Not Met", msg, "warning");
        return { success: false, message: msg };
      }

      setAppliedCoupon(coupon);
      addToast(
        "Promo Code Applied!",
        `You unlocked ${coupon.description}!`,
        "success"
      );
      return { success: true, message: `Code ${coupon.code} applied successfully!` };
    },
    [subtotal, addToast]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    addToast("Coupon Removed", "Promo code was removed from order.", "info");
  }, [addToast]);

  // Wishlist handling
  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        let updated: string[];
        if (prev.includes(productId)) {
          updated = prev.filter((id) => id !== productId);
          addToast("Removed from Wishlist", "Item removed from your favorites.", "info");
        } else {
          updated = [...prev, productId];
          addToast("Saved to Wishlist", "Item added to your saved favorites!", "success");
        }
        persistWishlist(updated);
        return updated;
      });
    },
    [addToast]
  );

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  // Place Order
  const placeOrder = useCallback(
    (
      customer: OrderCustomer,
      paymentMethod: PaymentMethod,
      notes?: string
    ): Order => {
      const orderId = `PB-${Math.floor(10000 + Math.random() * 90000)}`;

      const orderItems: OrderItem[] = cart.map((item) => {
        const shop = getShopById(item.product.shopId);
        return {
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.images[0] || "",
          price: item.product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          shopId: item.product.shopId,
          shopName: shop?.name || "Pettah Stall Merchant",
        };
      });

      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: {
          ...customer,
          notes: notes || customer.notes,
        },
        items: orderItems,
        subtotal,
        discount: discountAmount,
        deliveryFee,
        total: grandTotal,
        status: "placed",
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
        shippingMethod: selectedShippingMethod.name,
        shippingMethodId: selectedShippingMethod.id,
        estimatedDelivery:
          selectedShippingMethod.id === "ship-stall-pickup"
            ? "Ready in 2 Hours at Pettah Stall"
            : selectedShippingMethod.id === "ship-colombo-express"
            ? "Within 24 Hours (Colombo Express)"
            : "2 - 3 Business Days (Islandwide)",
        trackingNumber: `PB-${Date.now().toString().slice(-6)}`,
      };

      const updatedOrders = [newOrder, ...orders];
      persistOrders(updatedOrders);
      setLatestOrder(newOrder);

      // Clear cart
      persistCart([]);
      setAppliedCoupon(null);

      // Close checkout, open confirmation
      setIsCheckoutOpen(false);
      setIsOrderConfirmOpen(true);

      addToast(
        "Order Confirmed! 🎉",
        `Order #${orderId} placed successfully. We've notified the Pettah merchants!`,
        "success"
      );

      return newOrder;
    },
    [
      cart,
      subtotal,
      discountAmount,
      deliveryFee,
      grandTotal,
      selectedShippingMethod,
      orders,
      addToast,
    ]
  );

  // Update Order Status (Used by Seller or customer simulation)
  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      setOrders((prev) => {
        const updated = prev.map((ord) =>
          ord.id === orderId ? { ...ord, status } : ord
        );
        persistOrders(updated);
        return updated;
      });
      addToast("Order Status Updated", `Order ${orderId} is now ${status}.`, "info");
    },
    [addToast]
  );

  const viewOrderConfirmation = useCallback((order: Order) => {
    setLatestOrder(order);
    setIsOrderConfirmOpen(true);
  }, []);

  const closeOrderConfirm = useCallback(() => {
    setIsOrderConfirmOpen(false);
  }, []);

  // Product Reviews handling
  const addReview = useCallback(
    (reviewData: Omit<ProductReview, "id" | "date">) => {
      const newReview: ProductReview = {
        ...reviewData,
        id: `rev-${Date.now()}`,
        date: "Just now",
        verifiedPurchase: true,
      };
      const updated = [newReview, ...reviews];
      persistReviews(updated);
      addToast("Review Submitted", "Thank you for rating this Pettah merchant product!", "success");
    },
    [reviews, addToast]
  );

  const getProductReviews = useCallback(
    (productId: string) => {
      return reviews.filter((r) => r.productId === productId);
    },
    [reviews]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discountAmount,
        deliveryFee,
        grandTotal,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        selectedShippingMethod,
        setShippingMethod: setSelectedShippingMethod,
        availableShippingMethods: defaultShippingMethods,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,

        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        isOrdersModalOpen,
        openOrdersModal: () => setIsOrdersModalOpen(true),
        closeOrdersModal: () => setIsOrdersModalOpen(false),

        wishlist,
        toggleWishlist,
        isInWishlist,

        orders,
        latestOrder,
        placeOrder,
        updateOrderStatus,
        closeOrderConfirm,
        isOrderConfirmOpen,
        viewOrderConfirmation,

        reviews,
        addReview,
        getProductReviews,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
