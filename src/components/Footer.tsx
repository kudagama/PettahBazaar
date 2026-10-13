"use client";

import {
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Clock,
  Compass,
  ArrowUp,
  ShieldCheck,
  Store,
  ExternalLink,
  Heart,
  Sparkles,
} from "lucide-react";

interface FooterProps {
  onCategorySelect?: (category: string) => void;
  onLocationSelect?: (location: string) => void;
}

const PETTAH_STREETS = [
  { name: "Main Street", desc: "Wholesale Shoes & Leather Goods" },
  { name: "1st Cross Street", desc: "Electronics, Phones & Mobile Accessories" },
  { name: "2nd Cross Street", desc: "Kanchipuram Silk Sarees & Textiles" },
  { name: "Keyzer Street", desc: "Travel Luggage, Bags & Umbrellas" },
  { name: "Sea Street", desc: "Traditional Gold Jewellery & Gems" },
  { name: "Old Moor Street", desc: "Authentic Ceylon Spices & Ayurveda" },
];

const POPULAR_CATEGORIES = [
  "Clothes & Sarees",
  "Electronics & Gadgets",
  "Ceylon Spices",
  "Jewellery & Watches",
  "Travel Bags & Luggage",
  "Wholesale Shoes",
];

export default function Footer({
  onCategorySelect,
  onLocationSelect,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0c0c0c] border-t border-white/10 pt-16 pb-12 overflow-hidden text-neutral-400">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: BRAND, STREETS, CATEGORIES & CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* 1. Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white border border-white/15">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black font-[Sora] bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  Pettah
                </span>
                <span className="text-xl font-black font-[Sora] text-white">
                  Bazaar
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400 block">
                  Colombo 11 · Direct Stall Finder
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Sri Lanka's dedicated local merchant and product finder for the bustling Pettah commercial district. Compare verified street prices, locate exact stalls across heritage lanes, and connect with sellers in real time.
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Local Merchants</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Compass className="w-4 h-4 text-orange-400" />
                <span>Live Walking Maps</span>
              </div>
            </div>
          </div>

          {/* 2. Historic Pettah Streets Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Historic Bazaar Streets</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {PETTAH_STREETS.map((st) => (
                <li key={st.name}>
                  <button
                    onClick={() => onLocationSelect?.(st.name.includes("Cross") ? "Cross Street" : st.name.includes("Main") ? "Main Street" : st.name.includes("Keyzer") ? "Keyzer Street" : st.name)}
                    className="text-left group hover:text-white transition-colors"
                  >
                    <span className="font-semibold text-neutral-200 group-hover:text-orange-400 transition-colors block">
                      {st.name}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {st.desc}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Product Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-orange-400" />
              <span>Explore Categories</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {POPULAR_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onCategorySelect?.(cat.split(" ")[0])}
                    className="text-neutral-300 hover:text-orange-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Pettah Hub Timings & Stall Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>Bazaar Trading Hours</span>
            </h4>
            <div className="text-xs text-neutral-300 space-y-2 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
              <div className="flex justify-between">
                <span>Monday – Saturday:</span>
                <span className="text-white font-semibold">8:00 AM – 7:30 PM</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-1.5">
                <span>Sunday (Select Stalls):</span>
                <span className="text-white font-semibold">9:00 AM – 3:00 PM</span>
              </div>
              <p className="text-[11px] text-neutral-400 pt-1">
                Peak shopping hours: 10:00 AM – 4:00 PM. Best wholesale deals on weekdays.
              </p>
            </div>

            <div className="pt-2 text-xs text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Pettah Commercial Zone, Colombo 01100, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Merchant Help: +94 11 234 5678</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT, DEV CREDITS & BACK TO TOP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1 text-center sm:text-left">
            <span>© 2026 PettahBazaar. Crafted for the merchants and shoppers of Pettah, Colombo 11. Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" />
            <span>in Sri Lanka 🇱🇰</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-xl transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
