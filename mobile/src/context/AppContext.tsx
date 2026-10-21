import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Product, Shop, CartItem } from '@/types';
import { products, shops, searchProducts } from '@/data/mockData';

interface AppContextType {
  products: Product[];
  shops: Shop[];
  cart: CartItem[];
  favorites: string[];
  searchQuery: string;
  selectedCategory: string;
  selectedLocation: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedLocation: (loc: string) => void;
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
  filteredProducts: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const addToCart = (product: Product, size?: string, color?: string) => {
    const chosenSize = size || (product.sizes?.[0] ?? 'Standard');
    const chosenColor = color || (product.colors?.[0]?.name ?? 'Default');

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
        },
      ];
    });
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!size || item.selectedSize === size) &&
            (!color || item.selectedColor === color)
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          (!size || item.selectedSize === size) &&
          (!color || item.selectedColor === color)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const filteredProducts = useMemo(() => {
    return searchProducts(
      searchQuery,
      selectedCategory,
      0,
      Infinity,
      'relevance',
      selectedLocation,
      products,
      shops
    );
  }, [searchQuery, selectedCategory, selectedLocation]);

  return (
    <AppContext.Provider
      value={{
        products,
        shops,
        cart,
        favorites,
        searchQuery,
        selectedCategory,
        selectedLocation,
        setSearchQuery,
        setSelectedCategory,
        setSelectedLocation,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        cartCount,
        cartTotal,
        filteredProducts,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
