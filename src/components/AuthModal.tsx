"use client";

import { useState } from "react";
import {
  X,
  User as UserIcon,
  Store,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  Lock,
} from "lucide-react";
import { UserRole } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialRole = "customer",
}: AuthModalProps) {
  const { login } = useMarketplace();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role, {
      name: name || (role === "seller" ? "Merchant Owner" : "Pettah Shopper"),
      email: email || `${role}@pettah.lk`,
      phone: phone || "+94 77 123 4567",
      role,
      // If new seller, don't assign existing shop so they can register one!
      shopId: role === "seller" && mode === "signup" ? undefined : "shop-001",
    });
    onClose();
  };

  const handleQuickDemo = (targetRole: UserRole, isNewSeller = false) => {
    if (targetRole === "customer") {
      login("customer", {
        name: "Kamal Perera",
        email: "kamal@gmail.com",
        phone: "+94 71 888 7777",
        role: "customer",
      });
    } else if (isNewSeller) {
      // New seller who needs to register a shop
      login("seller", {
        name: "Sunil Silva",
        email: "sunil.merchant@gmail.com",
        phone: "+94 76 999 0000",
        role: "seller",
        shopId: undefined, // Needs shop registration!
      });
    } else {
      // Existing verified merchant
      login("seller", {
        name: "Mohamed Al-Ameen",
        email: "alameen@pettah.lk",
        phone: "+94 77 234 5678",
        role: "seller",
        shopId: "shop-001",
      });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop bg-black/80 flex items-center justify-center p-3 sm:p-5 animate-fade-in-up"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="glass-card bg-[#141414] border border-white/15 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#161616]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                PettahBazaar Account
              </h3>
              <p className="text-[11px] text-neutral-400">
                Choose Customer or Merchant Portal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher Tabs */}
        <div className="p-4 sm:p-6 pb-2">
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                role === "customer"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Customer (cx)</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                role === "seller"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Seller / Merchant</span>
            </button>
          </div>

          {/* Role Description Banner */}
          <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-neutral-300 flex items-center gap-2.5">
            {role === "customer" ? (
              <>
                <ShoppingBag className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>
                  <strong>Customer Login:</strong> Browse Pettah stalls, compare wholesale prices, and navigate street directions.
                </span>
              </>
            ) : (
              <>
                <Store className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>
                  <strong>Seller Portal:</strong> Register your Pettah shop, add products, manage inventory & stall presence.
                </span>
              </>
            )}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 pt-2 space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                {role === "seller" ? "Merchant / Owner Full Name" : "Your Name"}
              </label>
              <div className="relative flex items-center">
                <UserIcon className="absolute left-3 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === "seller" ? "e.g., Mohamed Al-Ameen" : "e.g., Kamal Perera"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
          >
            <span>
              {mode === "login"
                ? `Login as ${role === "seller" ? "Seller" : "Customer"}`
                : `Create ${role === "seller" ? "Seller" : "Customer"} Account`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Toggle Login / Signup */}
          <div className="text-center text-xs text-neutral-400">
            {mode === "login" ? (
              <span>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-orange-400 hover:underline font-semibold"
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-orange-400 hover:underline font-semibold"
                >
                  Log In
                </button>
              </span>
            )}
          </div>

          {/* Quick Demo 1-Click Access Box */}
          <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block text-center">
              ⚡ Instant 1-Click Demo Login
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("customer")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-200 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-orange-400" />
                <span>Demo Customer</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("seller", false)}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-xs text-orange-300 transition-colors"
              >
                <Store className="w-3.5 h-3.5 text-orange-400" />
                <span>Demo Seller (Al-Ameen)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleQuickDemo("seller", true)}
              className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Register New Shop as Fresh Seller</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
