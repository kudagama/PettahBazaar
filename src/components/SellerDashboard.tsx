"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Store,
  Plus,
  Package,
  MapPin,
  Phone,
  MessageCircle,
  Eye,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Tag,
  Clock,
  Layers,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  X,
  BadgeCheck,
} from "lucide-react";
import { Shop, Product } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";
import { shopLocations } from "@/data/mockData";

const PRESET_PRODUCT_IMAGES = [
  { label: "Clothes / Saree", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80" },
  { label: "Men's Shirt", url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80" },
  { label: "Electronics / Audio", url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80" },
  { label: "Smartwatch", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80" },
  { label: "Ceylon Spices", url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=80" },
  { label: "Sea St Gold", url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80" },
  { label: "Shoes / Loafers", url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop&q=80" },
  { label: "Travel Bag", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80" },
];

const PRESET_SHOP_IMAGES = [
  { label: "Street Stall", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80" },
  { label: "Textile Shop", url: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&auto=format&fit=crop&q=80" },
  { label: "Electronics Shop", url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=80" },
  { label: "Spice Merchant", url: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&auto=format&fit=crop&q=80" },
];

interface SellerDashboardProps {
  onViewProductAsCustomer: (product: Product) => void;
  onSwitchToCustomerView: () => void;
}

export default function SellerDashboard({
  onViewProductAsCustomer,
  onSwitchToCustomerView,
}: SellerDashboardProps) {
  const {
    currentUser,
    sellerShop,
    sellerProducts,
    registerShop,
    updateShop,
    addProduct,
    deleteProduct,
    toggleStock,
    logout,
  } = useMarketplace();

  // Register Shop Form State
  const [shopName, setShopName] = useState("");
  const [shopArea, setShopArea] = useState("Main Street");
  const [stallNumber, setStallNumber] = useState("");
  const [shopCategory, setShopCategory] = useState("Clothes & Textiles");
  const [shopPhone, setShopPhone] = useState(currentUser?.phone || "+94 11 234 5678");
  const [shopWhatsapp, setShopWhatsapp] = useState(currentUser?.phone || "+94 77 234 5678");
  const [shopAddress, setShopAddress] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopImageUrl, setShopImageUrl] = useState(PRESET_SHOP_IMAGES[0].url);
  const [isEditingShop, setIsEditingShop] = useState(false);

  // Add Product Modal & Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("Clothes");
  const [productPrice, setProductPrice] = useState("");
  const [productOriginalPrice, setProductOriginalPrice] = useState("");
  const [productStock, setProductStock] = useState("20");
  const [productDescription, setProductDescription] = useState("");
  const [productImageUrl, setProductImageUrl] = useState(PRESET_PRODUCT_IMAGES[0].url);
  const [productSizes, setProductSizes] = useState("S, M, L, XL");
  const [productBrand, setProductBrand] = useState("Pettah Direct");
  const [isProductFeatured, setIsProductFeatured] = useState(false);

  // Handle Register or Update Shop
  const handleSaveShop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerShop || isEditingShop) {
      if (sellerShop && isEditingShop) {
        updateShop(sellerShop.id, {
          name: shopName || sellerShop.name,
          area: shopArea,
          stallNumber: stallNumber || sellerShop.stallNumber,
          category: shopCategory,
          phone: shopPhone,
          whatsapp: shopWhatsapp,
          address: shopAddress || `${stallNumber || "Stall 1"}, ${shopArea}, Pettah`,
          description: shopDescription,
          imageUrl: shopImageUrl,
        });
        setIsEditingShop(false);
      } else {
        registerShop({
          name: shopName,
          ownerName: currentUser?.name || "Merchant Owner",
          area: shopArea,
          stallNumber: stallNumber || "Stall #12",
          category: shopCategory,
          phone: shopPhone,
          whatsapp: shopWhatsapp,
          address: shopAddress || `${stallNumber || "Stall #12"}, ${shopArea}, Pettah, Colombo 11`,
          description: shopDescription || "Authentic wholesale and retail merchant in Pettah.",
          imageUrl: shopImageUrl,
        });
      }
    }
  };

  // Handle Add Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !productPrice) return;

    addProduct({
      name: productName,
      category: productCategory,
      price: Number(productPrice),
      originalPrice: productOriginalPrice ? Number(productOriginalPrice) : undefined,
      stockCount: Number(productStock) || 10,
      description: productDescription || "High quality product directly from our Pettah stall.",
      images: [productImageUrl],
      sizes: productSizes.split(",").map((s) => s.trim()).filter(Boolean),
      brand: productBrand,
      inStock: true,
      featured: isProductFeatured,
    });

    // Reset Form
    setProductName("");
    setProductPrice("");
    setProductOriginalPrice("");
    setProductDescription("");
    setIsAddProductOpen(false);
  };

  const inStockCount = sellerProducts.filter((p) => p.inStock).length;
  const outOfStockCount = sellerProducts.length - inStockCount;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 pb-24 pt-24 sm:pt-28">
      {/* Top Banner Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-500/15 via-[#181818] to-red-500/10 border border-orange-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-[Sora] text-white">
                  Pettah Merchant Portal
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">
                  Seller Mode
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Logged in as <strong className="text-white">{currentUser?.name}</strong> ({currentUser?.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
            <button
              onClick={onSwitchToCustomerView}
              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl border border-white/10 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-orange-400" />
              <span>Preview Customer View</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center justify-center gap-1 text-xs text-neutral-400 hover:text-white px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* CASE A: SELLER DOES NOT HAVE A SHOP YET */}
        {!sellerShop ? (
          <div className="glass-card bg-[#141414] border border-orange-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
              <div className="w-16 h-16 rounded-3xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/40 shadow-xl shadow-orange-500/10">
                <Store className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-[Sora] text-white">
                Register Your Pettah Stall or Shop
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Start selling directly to thousands of Pettah shoppers. Put your street stall or wholesale store on the live PettahBazaar map and upload your products with prices.
              </p>
            </div>

            <form onSubmit={handleSaveShop} className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Shop / Stall Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="e.g., Al-Ameen Leather, Lanka Tech"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Pettah District / Street *
                  </label>
                  <select
                    value={shopArea}
                    onChange={(e) => setShopArea(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    {shopLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Stall / Shop Number
                  </label>
                  <input
                    type="text"
                    value={stallNumber}
                    onChange={(e) => setStallNumber(e.target.value)}
                    placeholder="e.g., Stall #47-B, Shop #12"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Main Category
                  </label>
                  <select
                    value={shopCategory}
                    onChange={(e) => setShopCategory(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Clothes & Textiles">Clothes & Textiles</option>
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Shoes & Footwear">Shoes & Footwear</option>
                    <option value="Ceylon Spices & Grocery">Ceylon Spices & Grocery</option>
                    <option value="Gold Jewellery & Watches">Gold Jewellery & Watches</option>
                    <option value="Bags & Travel Luggage">Bags & Travel Luggage</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Merchant Contact Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopPhone}
                    onChange={(e) => setShopPhone(e.target.value)}
                    placeholder="+94 11 234 5678"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    WhatsApp Chat Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopWhatsapp}
                    onChange={(e) => setShopWhatsapp(e.target.value)}
                    placeholder="+94 77 234 5678"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Full Street Address
                </label>
                <input
                  type="text"
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  placeholder="e.g., No. 47, Main Street, Pettah, Colombo 11"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Shop Description
                </label>
                <textarea
                  rows={3}
                  value={shopDescription}
                  onChange={(e) => setShopDescription(e.target.value)}
                  placeholder="Tell shoppers about your products, wholesale discounts, and history in Pettah..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Photo selector */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Shop Photo Preset or Custom URL
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {PRESET_SHOP_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setShopImageUrl(img.url)}
                      className={`p-1.5 rounded-xl border text-left text-xs transition-all ${
                        shopImageUrl === img.url
                          ? "border-orange-500 bg-orange-500/15 text-orange-300"
                          : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <div className="relative h-14 rounded-lg overflow-hidden mb-1">
                        <Image src={img.url} alt={img.label} fill className="object-cover" />
                      </div>
                      <span className="truncate block font-semibold">{img.label}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={shopImageUrl}
                  onChange={(e) => setShopImageUrl(e.target.value)}
                  placeholder="Custom image URL..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-sm sm:text-base py-3.5 rounded-xl shadow-xl shadow-orange-500/30 active:scale-95 transition-all mt-4"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Register Shop & Open Stall</span>
              </button>
            </form>
          </div>
        ) : (
          /* CASE B: SELLER HAS A REGISTERED SHOP */
          <>
            {/* 1. Shop Profile Summary Card */}
            <div className="glass-card bg-[#141414] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/15 flex-shrink-0">
                    <Image
                      src={sellerShop.imageUrl}
                      alt={sellerShop.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-white">
                        {sellerShop.name}
                      </h2>
                      {sellerShop.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-full">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                      <span className="text-[11px] font-semibold bg-orange-500/15 border border-orange-500/30 text-orange-400 px-2 py-0.5 rounded-full">
                        {sellerShop.stallNumber || "Stall in Bazaar"}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 max-w-xl line-clamp-2">
                      {sellerShop.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-1">
                      <span className="flex items-center gap-1 text-orange-300">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                        {sellerShop.area} ({sellerShop.address})
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Phone className="w-3.5 h-3.5" />
                        {sellerShop.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setShopName(sellerShop.name);
                      setShopArea(sellerShop.area);
                      setStallNumber(sellerShop.stallNumber || "");
                      setShopCategory(sellerShop.category);
                      setShopPhone(sellerShop.phone);
                      setShopWhatsapp(sellerShop.whatsapp || sellerShop.phone);
                      setShopAddress(sellerShop.address);
                      setShopDescription(sellerShop.description);
                      setShopImageUrl(sellerShop.imageUrl);
                      setIsEditingShop(true);
                    }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3.5 py-2.5 rounded-xl transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-orange-400" />
                    <span>Edit Shop Details</span>
                  </button>

                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 text-xs font-bold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Shop Drawer if opened */}
            {isEditingShop && (
              <div className="glass-card bg-[#161616] border border-orange-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl animate-fade-in-up">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <h3 className="font-bold text-white text-base">Edit Your Shop Profile</h3>
                  <button
                    onClick={() => setIsEditingShop(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveShop} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Shop Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Street Location
                      </label>
                      <select
                        value={shopArea}
                        onChange={(e) => setShopArea(e.target.value)}
                        className="w-full bg-[#202020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {shopLocations.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Stall Number
                      </label>
                      <input
                        type="text"
                        value={stallNumber}
                        onChange={(e) => setStallNumber(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="text"
                        value={shopPhone}
                        onChange={(e) => setShopPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingShop(false)}
                      className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 2. Shop Metrics KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Total Products",
                  value: sellerProducts.length,
                  icon: Package,
                  color: "text-orange-400 bg-orange-500/10",
                },
                {
                  label: "Active In Stock",
                  value: inStockCount,
                  icon: CheckCircle2,
                  color: "text-emerald-400 bg-emerald-500/10",
                },
                {
                  label: "Out of Stock",
                  value: outOfStockCount,
                  icon: AlertCircle,
                  color: "text-amber-400 bg-amber-500/10",
                },
                {
                  label: "Pettah District",
                  value: sellerShop.area,
                  icon: MapPin,
                  color: "text-blue-400 bg-blue-500/10",
                },
              ].map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={kpi.label}
                    className="p-4 rounded-2xl bg-[#141414] border border-white/8 flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base sm:text-xl font-black text-white">{kpi.value}</div>
                      <div className="text-[11px] text-neutral-400">{kpi.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3. Products Management Section */}
            <div className="glass-card bg-[#141414] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-400" />
                    <span>Your Stall Products ({sellerProducts.length})</span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Products listed here are live and visible to customers on PettahBazaar.
                  </p>
                </div>

                <button
                  id="add-product-cta-btn"
                  onClick={() => setIsAddProductOpen(true)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Products List Table / Cards */}
              {sellerProducts.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl p-6">
                  <Package className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">No products added yet</h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
                    Add your first clothing, spices, electronics or shoe item to start displaying in PettahBazaar.
                  </p>
                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add First Product</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sellerProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 flex flex-col justify-between transition-all group"
                    >
                      <div>
                        {/* Image & Badges */}
                        <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-900 mb-3">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                            <span className="text-[10px] font-bold bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-md border border-white/10">
                              {product.category}
                            </span>
                            {product.featured && (
                              <span className="text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-md">
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="absolute top-2 right-2 z-10">
                            <button
                              onClick={() => toggleStock(product.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                                product.inStock
                                  ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                                  : "bg-red-950/90 border-red-500/50 text-red-300"
                              }`}
                              title="Click to toggle stock status"
                            >
                              {product.inStock ? "● In Stock" : "○ Sold Out"}
                            </button>
                          </div>
                        </div>

                        {/* Title & Price */}
                        <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-orange-300 transition-colors">
                          {product.name}
                        </h4>
                        <div className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
                          {product.description}
                        </div>

                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-base font-black text-white">
                            LKR <span className="text-orange-400">{product.price.toLocaleString()}</span>
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-neutral-500 line-through">
                              LKR {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onViewProductAsCustomer(product)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 hover:text-orange-400 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Customer View</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Remove "${product.name}" from your stall?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ADD PRODUCT MODAL DIALOG */}
      {isAddProductOpen && (
        <div
          className="fixed inset-0 z-50 modal-backdrop bg-black/85 flex items-end sm:items-center justify-center p-0 sm:p-5 animate-fade-in-up"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-card bg-[#141414] border-t sm:border border-white/15 w-full max-w-xl h-[92vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up flex flex-col">
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-[#161616] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Add New Product to {sellerShop?.name}
                </h3>
              </div>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 sm:p-6 space-y-4 flex-1">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Product Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Kanchipuram Silk Saree, AMOLED Smartwatch"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Category *
                  </label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Clothes">Clothes & Sarees</option>
                    <option value="Electronics">Electronics & Audio</option>
                    <option value="Shoes">Shoes & Footwear</option>
                    <option value="Spices">Ceylon Spices</option>
                    <option value="Jewellery">Jewellery & Watches</option>
                    <option value="Bags">Bags & Luggage</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Selling Price (LKR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="e.g., 2800"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Original Price (Optional for Discount %)
                  </label>
                  <input
                    type="number"
                    value={productOriginalPrice}
                    onChange={(e) => setProductOriginalPrice(e.target.value)}
                    placeholder="e.g., 3500"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    placeholder="e.g., 25"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Photo Preset Pickers */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Product Image (Select Pettah Preset or Custom URL)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {PRESET_PRODUCT_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setProductImageUrl(preset.url)}
                      className={`p-1 rounded-xl border text-left text-xs transition-all ${
                        productImageUrl === preset.url
                          ? "border-orange-500 bg-orange-500/15 text-orange-300"
                          : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <div className="relative h-12 rounded-lg overflow-hidden mb-1">
                        <Image src={preset.url} alt={preset.label} fill className="object-cover" sizes="80px" />
                      </div>
                      <span className="text-[10px] truncate block font-semibold">{preset.label}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={productImageUrl}
                  onChange={(e) => setProductImageUrl(e.target.value)}
                  placeholder="Or paste an image URL..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Sizes or Varieties (Comma separated)
                </label>
                <input
                  type="text"
                  value={productSizes}
                  onChange={(e) => setProductSizes(e.target.value)}
                  placeholder="S, M, L, XL or 250g, 500g, 1kg"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Describe material, genuine origin, warranty, or wholesale bulk rate..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={isProductFeatured}
                  onChange={(e) => setIsProductFeatured(e.target.checked)}
                  className="accent-orange-500 w-4 h-4 rounded"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-neutral-300 cursor-pointer">
                  Highlight as <strong>Featured Pettah Deal</strong> on homepage carousel
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2.5 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
