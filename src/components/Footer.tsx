"use client";

import { useState } from "react";
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
  Send,
  Navigation,
  CheckCircle2,
  HelpCircle,
  Truck,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface FooterProps {
  onCategorySelect?: (category: string) => void;
  onLocationSelect?: (location: string) => void;
}

const HISTORIC_SECTORS = [
  {
    street: "Main Street",
    specialty: "Footwear, Leather & Formal Wear",
    timing: "8:00 AM – 7:30 PM",
    landmark: "Front of Colombo Fort Station",
    query: "Main Street",
  },
  {
    street: "1st Cross Street",
    specialty: "Electronics, Phones & Audio Accessories",
    timing: "8:30 AM – 8:00 PM",
    landmark: "Near Red Mosque (Jami Ul-Alfar)",
    query: "Cross Street",
  },
  {
    street: "2nd Cross Street",
    specialty: "Kanchipuram Silk Sarees & Textiles",
    timing: "9:00 AM – 7:30 PM",
    landmark: "Central Textile Market",
    query: "Cross Street",
  },
  {
    street: "Keyzer Street",
    specialty: "Travel Luggage, Backpacks & Umbrellas",
    timing: "8:30 AM – 8:00 PM",
    landmark: "Keyzer Wholesale Terminal",
    query: "Keyzer Street",
  },
  {
    street: "Sea Street",
    specialty: "22K Traditional Gold Jewellery & Gems",
    timing: "9:30 AM – 7:00 PM",
    landmark: "Kathiresan Hindu Kovil",
    query: "Sea Street",
  },
  {
    street: "Old Moor Street",
    specialty: "Ceylon Spices, Ayurvedic Herbs & Honey",
    timing: "7:30 AM – 6:30 PM",
    landmark: "Traditional Spice Hub",
    query: "Main Street",
  },
];

const SHOPPING_GUIDE_FAQS = [
  {
    q: "Best time to visit Pettah for wholesale deals?",
    a: "Weekdays between 9:00 AM – 1:00 PM offer the best wholesale prices before afternoon foot-traffic peaks.",
  },
  {
    q: "Can I bargain on listed stall prices?",
    a: "Yes! Most listed stall prices can be negotiated, especially when purchasing multiple units or paying via cash.",
  },
  {
    q: "How does the live stall map navigation work?",
    a: "Click 'Show Location on Map' on any product to see the exact walking route and stall GPS pinpoint in Pettah.",
  },
];

export default function Footer({
  onCategorySelect,
  onLocationSelect,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#070707] border-t border-white/10 pt-16 pb-12 overflow-hidden text-neutral-400">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-[140px]" />
        <div className="absolute -top-32 right-1/4 w-[500px] h-[300px] bg-red-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        {/* 1. TOP NEWSLETTER / BAZAAR DEALS ALERT BAR */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-[#161616] to-neutral-900 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pettah Daily Price Drop Alerts</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Get Notified of Wholesale Deals & Fresh Stall Arrivals
            </h3>
            <p className="text-xs text-neutral-400 max-w-md">
              Receive direct updates when Pettah merchants update discounts on electronics, sarees, and Ceylon spices.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto max-w-md"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email or WhatsApp number..."
                required
                className="w-full bg-white/5 border border-white/15 text-white placeholder-neutral-500 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all shadow-lg shadow-orange-500/25 flex-shrink-0 active:scale-95"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {subscribed && (
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscribed! You will receive daily Pettah market price updates.</span>
            </div>
          )}
        </div>

        {/* 2. PETTAH COMMERCIAL SECTORS INTERACTIVE DIRECTORY */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Historic Pettah Street Directory & Landmarks</span>
            </h4>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Click any street to explore real stalls
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {HISTORIC_SECTORS.map((sec) => (
              <button
                key={sec.street}
                onClick={() => onLocationSelect?.(sec.query)}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-orange-500/40 text-left transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                      {sec.street}
                    </span>
                    <span className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full font-medium">
                      {sec.timing}
                    </span>
                  </div>
                  <span className="text-xs text-orange-300 font-semibold block mt-1">
                    {sec.specialty}
                  </span>
                </div>
                <div className="pt-2.5 mt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>🏛️ {sec.landmark}</span>
                  <span className="text-orange-400 group-hover:translate-x-0.5 transition-transform">
                    View Stalls →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. FOUR-COLUMN DETAILED FOOTER ECOSYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pt-6 border-t border-white/10">
          {/* Brand Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white border border-white/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black font-futura bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  Pettah
                </span>
                <span className="text-2xl font-black font-futura text-white">
                  Bazaar
                </span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-orange-400 block mt-0.5">
                  Sri Lanka's #1 Local Market Engine
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              PettahBazaar connects Sri Lankan consumers and small businesses with authentic street merchants across Pettah, Colombo 11. Compare real bazaar pricing, check stall availability, and navigate with precise walking directions.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] text-neutral-200">100% Verified Street Stalls</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Compass className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-[11px] text-neutral-200">Live GPS Walking Routes</span>
              </div>
            </div>
          </div>

          {/* Shopper Guidelines & FAQs (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
              <span>Smart Shopping Tips in Pettah</span>
            </h4>
            <div className="space-y-2.5">
              {SHOPPING_GUIDE_FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 text-xs"
                >
                  <p className="font-semibold text-neutral-200">{faq.q}</p>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bazaar Operational Center & Contacts (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>Commercial Hub Hours & Support</span>
            </h4>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-neutral-300">
                <span>Monday – Saturday:</span>
                <span className="font-bold text-white">8:00 AM – 7:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300 border-t border-white/5 pt-2">
                <span>Sunday (Wholesale Restock):</span>
                <span className="font-bold text-orange-400">9:00 AM – 3:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300 border-t border-white/5 pt-2">
                <span>Direct Merchant Telephone:</span>
                <a href="tel:+94112345678" className="font-bold text-emerald-400 hover:underline">
                  +94 11 234 5678
                </a>
              </div>
            </div>

            <div className="text-xs space-y-1 text-neutral-400 pt-1">
              <p>📍 Central Commercial Zone, Main Street, Colombo 11, Sri Lanka</p>
              <p>✉️ Contact: support@pettahbazaar.lk · Verified Open Data</p>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM COPYRIGHT & ATTRIBUTION BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © 2026 PettahBazaar · Colombo 11 Commercial District · Made with{" "}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" /> in Sri Lanka 🇱🇰
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-500">Fast Turbopack Engine</span>
            <span className="text-neutral-600">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 font-bold text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
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
