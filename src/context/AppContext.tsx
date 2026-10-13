"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product, Shop, SearchFilters } from "@/types";

interface AppState {
  searchFilters: SearchFilters;
  selectedProduct: Product | null;
  mapShop: Shop | null;
  view: "products" | "shops";
}

type Action =
  | { type: "SET_FILTERS"; payload: Partial<SearchFilters> }
  | { type: "SET_PRODUCT"; payload: Product | null }
  | { type: "SET_MAP_SHOP"; payload: Shop | null }
  | { type: "SET_VIEW"; payload: "products" | "shops" };

const initialState: AppState = {
  searchFilters: {
    query: "",
    category: "All",
    location: "All Locations",
    minPrice: 0,
    maxPrice: Infinity,
    sortBy: "relevance",
    inStockOnly: false,
  },
  selectedProduct: null,
  mapShop: null,
  view: "products",
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_FILTERS":
      return {
        ...state,
        searchFilters: { ...state.searchFilters, ...action.payload },
      };
    case "SET_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    case "SET_MAP_SHOP":
      return { ...state, mapShop: action.payload };
    case "SET_VIEW":
      return { ...state, view: action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
