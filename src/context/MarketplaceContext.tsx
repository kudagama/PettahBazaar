"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product, Shop, User, UserRole } from "@/types";
import { products as initialProducts, shops as initialShops } from "@/data/mockData";

interface MarketplaceContextType {
  currentUser: User | null;
  allProducts: Product[];
  allShops: Shop[];
  isAuthModalOpen: boolean;
  authModalInitialRole: UserRole;
  openAuthModal: (role?: UserRole) => void;
  closeAuthModal: () => void;
  login: (role: UserRole, userDetails?: Partial<User>) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  // Seller shop and product management
  sellerShop: Shop | null;
  sellerProducts: Product[];
  registerShop: (shopData: Partial<Shop>) => Shop;
  updateShop: (shopId: string, shopData: Partial<Shop>) => void;
  addProduct: (productData: Partial<Product>) => Product;
  updateProduct: (productId: string, productData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  toggleStock: (productId: string) => void;
}

const STORAGE_KEY_PRODUCTS = "pettah_bazaar_products_v1";
const STORAGE_KEY_SHOPS = "pettah_bazaar_shops_v1";
const STORAGE_KEY_USER = "pettah_bazaar_user_v1";

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined
);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [allShops, setAllShops] = useState<Shop[]>(initialShops);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<UserRole>("customer");

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        // Default guest is Customer
        setCurrentUser({
          id: "cx-guest",
          name: "Customer Guest",
          email: "customer@pettah.lk",
          role: "customer",
        });
      }

      const storedShops = localStorage.getItem(STORAGE_KEY_SHOPS);
      if (storedShops) {
        setAllShops(JSON.parse(storedShops));
      }

      const storedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (storedProducts) {
        setAllProducts(JSON.parse(storedProducts));
      }
    } catch (e) {
      console.error("Failed to load local marketplace state:", e);
    }
  }, []);

  // Sync to localStorage
  const persistProducts = (prods: Product[]) => {
    setAllProducts(prods);
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(prods));
    } catch (e) {
      console.error(e);
    }
  };

  const persistShops = (shps: Shop[]) => {
    setAllShops(shps);
    try {
      localStorage.setItem(STORAGE_KEY_SHOPS, JSON.stringify(shps));
    } catch (e) {
      console.error(e);
    }
  };

  const persistUser = (usr: User | null) => {
    setCurrentUser(usr);
    try {
      if (usr) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(usr));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openAuthModal = useCallback((role: UserRole = "customer") => {
    setAuthModalInitialRole(role);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const login = useCallback(
    (role: UserRole, userDetails?: Partial<User>) => {
      let newUser: User;

      if (role === "seller") {
        newUser = {
          id: userDetails?.id || "seller-demo",
          name: userDetails?.name || "Mohamed Al-Ameen",
          email: userDetails?.email || "seller@pettah.lk",
          phone: userDetails?.phone || "+94 77 234 5678",
          role: "seller",
          shopId: userDetails?.shopId !== undefined ? userDetails.shopId : "shop-001",
        };
      } else {
        newUser = {
          id: userDetails?.id || "cx-demo",
          name: userDetails?.name || "Kamal Perera",
          email: userDetails?.email || "customer@pettah.lk",
          phone: userDetails?.phone || "+94 71 888 7777",
          role: "customer",
        };
      }

      persistUser(newUser);
      setIsAuthModalOpen(false);
    },
    []
  );

  const logout = useCallback(() => {
    persistUser(null);
  }, []);

  const switchRole = useCallback(
    (newRole: UserRole) => {
      if (!currentUser) {
        login(newRole);
        return;
      }
      const updatedUser: User = {
        ...currentUser,
        role: newRole,
        shopId:
          newRole === "seller"
            ? currentUser.shopId || allShops[0]?.id
            : undefined,
      };
      persistUser(updatedUser);
    },
    [currentUser, allShops, login]
  );

  // Derived: Current Seller's Shop & Products
  const sellerShop =
    currentUser?.role === "seller" && currentUser.shopId
      ? allShops.find((s) => s.id === currentUser.shopId) || null
      : null;

  const sellerProducts =
    currentUser?.role === "seller" && currentUser.shopId
      ? allProducts.filter((p) => p.shopId === currentUser.shopId)
      : [];

  // Seller Action: Register New Shop
  const registerShop = useCallback(
    (shopData: Partial<Shop>): Shop => {
      const newId = `shop-${Date.now().toString().slice(-4)}`;
      const newShop: Shop = {
        id: newId,
        name: shopData.name || "My Pettah Stall",
        ownerName: shopData.ownerName || currentUser?.name || "Merchant",
        description:
          shopData.description || "Authentic quality products at wholesale prices in Pettah.",
        category: shopData.category || "General Bazaar",
        address: shopData.address || "Main Street, Pettah, Colombo 11",
        area: shopData.area || "Main Street",
        stallNumber: shopData.stallNumber || `Stall #${Math.floor(10 + Math.random() * 90)}`,
        phone: shopData.phone || currentUser?.phone || "+94 11 234 5678",
        whatsapp: shopData.whatsapp || currentUser?.phone || "+94 77 234 5678",
        email: shopData.email || currentUser?.email || "merchant@pettah.lk",
        openHours: shopData.openHours || "Mon–Sat: 8:30 AM – 7:30 PM",
        coordinates: shopData.coordinates || {
          lat: 6.9355 + (Math.random() - 0.5) * 0.004,
          lng: 79.853 + (Math.random() - 0.5) * 0.004,
        },
        distance: "180m",
        rating: 5.0,
        reviewCount: 1,
        verified: true,
        imageUrl:
          shopData.imageUrl ||
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80",
        specialties: shopData.specialties || ["Local Wholesale", "Retail Bargains"],
        established: new Date().getFullYear(),
      };

      const updatedShops = [newShop, ...allShops];
      persistShops(updatedShops);

      // Link shop to current user
      if (currentUser) {
        persistUser({
          ...currentUser,
          shopId: newId,
        });
      }

      return newShop;
    },
    [allShops, currentUser]
  );

  // Seller Action: Update Shop
  const updateShop = useCallback(
    (shopId: string, shopData: Partial<Shop>) => {
      const updated = allShops.map((s) =>
        s.id === shopId ? { ...s, ...shopData } : s
      );
      persistShops(updated);
    },
    [allShops]
  );

  // Seller Action: Add Product to Shop
  const addProduct = useCallback(
    (productData: Partial<Product>): Product => {
      const newId = `p-${Date.now().toString().slice(-5)}`;
      const targetShopId = currentUser?.shopId || allShops[0]?.id || "shop-001";

      const newProduct: Product = {
        id: newId,
        name: productData.name || "Pettah Quality Item",
        category: productData.category || "Clothes",
        tags: productData.tags || ["Pettah", "New Arrival"],
        price: Number(productData.price) || 2500,
        originalPrice: productData.originalPrice
          ? Number(productData.originalPrice)
          : undefined,
        currency: "LKR",
        images:
          productData.images && productData.images.length > 0
            ? productData.images
            : [
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
              ],
        sizes: productData.sizes || ["S", "M", "L", "XL"],
        colors: productData.colors || [
          { name: "Standard", hex: "#f97316" },
        ],
        description:
          productData.description ||
          "Handpicked high quality product directly from our Pettah merchant stall.",
        material: productData.material || "Genuine Bazaar Quality",
        brand: productData.brand || "Pettah Imports",
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        stockCount: productData.stockCount || 25,
        shopId: targetShopId,
        rating: 5.0,
        reviewCount: 0,
        featured: Boolean(productData.featured),
      };

      const updated = [newProduct, ...allProducts];
      persistProducts(updated);
      return newProduct;
    },
    [allProducts, currentUser, allShops]
  );

  // Seller Action: Update Product
  const updateProduct = useCallback(
    (productId: string, productData: Partial<Product>) => {
      const updated = allProducts.map((p) =>
        p.id === productId ? { ...p, ...productData } : p
      );
      persistProducts(updated);
    },
    [allProducts]
  );

  // Seller Action: Delete Product
  const deleteProduct = useCallback(
    (productId: string) => {
      const updated = allProducts.filter((p) => p.id !== productId);
      persistProducts(updated);
    },
    [allProducts]
  );

  // Seller Action: Toggle In-stock status
  const toggleStock = useCallback(
    (productId: string) => {
      const updated = allProducts.map((p) =>
        p.id === productId ? { ...p, inStock: !p.inStock } : p
      );
      persistProducts(updated);
    },
    [allProducts]
  );

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        allProducts,
        allShops,
        isAuthModalOpen,
        authModalInitialRole,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        switchRole,
        sellerShop,
        sellerProducts,
        registerShop,
        updateShop,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return ctx;
}
