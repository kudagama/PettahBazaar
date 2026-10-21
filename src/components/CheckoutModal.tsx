"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Store,
  Sparkles,
  QrCode,
  Calendar,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { PaymentMethod, OrderCustomer } from "@/types";

const SRI_LANKA_DISTRICTS = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
];

export default function CheckoutModal() {
  const {
    cart,
    subtotal,
    discountAmount,
    deliveryFee,
    grandTotal,
    selectedShippingMethod,
    setShippingMethod,
    availableShippingMethods,
    placeOrder,
    isCheckoutOpen,
    closeCheckout,
    appliedCoupon,
  } = useCart();

  const { currentUser } = useMarketplace();

  // Form State
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Delivery, 2: Shipping & Payment, 3: Review
  const [customer, setCustomer] = useState<OrderCustomer>({
    name: currentUser?.name || "Kamal Perera",
    phone: currentUser?.phone || "+94 77 123 4567",
    email: currentUser?.email || "kamal.perera@gmail.com",
    address: "No. 42/1, Galle Road",
    city: "Colombo 03",
    district: "Colombo",
    postalCode: "00300",
    notes: "Call before arrival",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 9821");
  const [cardExpiry, setCardExpiry] = useState("08/28");
  const [cardCvv, setCardCvv] = useState("892");
  const [cardHolder, setCardHolder] = useState(currentUser?.name || "Kamal Perera");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!customer.name.trim()) errors.name = "Full name is required";
    if (!customer.phone.trim()) errors.phone = "Phone number is required";
    if (!customer.address.trim()) errors.address = "Delivery address is required";
    if (!customer.city.trim()) errors.city = "City is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    // Simulate real-world gateway delay for premium feel
    setTimeout(() => {
      placeOrder(customer, paymentMethod);
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) closeCheckout();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Secure Checkout"
    >
      <div className="glass-card bg-[#141414] border border-white/15 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 bg-neutral-950/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                PettahBazaar Checkout
                <span className="text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  256-Bit SSL Encrypted
                </span>
              </h2>
              <p className="text-xs text-neutral-400">Direct ordering from certified Pettah stall merchants</p>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            disabled={isSubmitting}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs">
          <div
            className={`flex items-center gap-2 font-bold cursor-pointer transition-colors ${
              step >= 1 ? "text-orange-400" : "text-neutral-500"
            }`}
            onClick={() => setStep(1)}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step > 1 ? "bg-orange-500 text-white" : "border border-orange-400 text-orange-400"
            }`}>
              {step > 1 ? "✓" : "1"}
            </span>
            <span>Delivery Info</span>
          </div>

          <div className="w-8 sm:w-16 h-0.5 bg-white/10" />

          <div
            className={`flex items-center gap-2 font-bold cursor-pointer transition-colors ${
              step >= 2 ? "text-orange-400" : "text-neutral-500"
            }`}
            onClick={() => {
              if (validateStep1()) setStep(2);
            }}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step > 2 ? "bg-orange-500 text-white" : step === 2 ? "border border-orange-400 text-orange-400" : "border border-neutral-600 text-neutral-500"
            }`}>
              {step > 2 ? "✓" : "2"}
            </span>
            <span>Shipping & Payment</span>
          </div>

          <div className="w-8 sm:w-16 h-0.5 bg-white/10" />

          <div
            className={`flex items-center gap-2 font-bold ${
              step === 3 ? "text-orange-400" : "text-neutral-500"
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 3 ? "border border-orange-400 text-orange-400" : "border border-neutral-600 text-neutral-500"
            }`}>
              3
            </span>
            <span>Confirm & Place</span>
          </div>
        </div>

        {/* Body Grid: Left Form, Right Order Summary */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Form (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-7 space-y-6 border-b lg:border-b-0 lg:border-r border-white/10">
            {/* STEP 1: Customer Contact & Delivery Details */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    Delivery Destination & Contact
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Enter your Sri Lanka delivery address for courier or stall pickup notification.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="e.g. Kamal Perera"
                        className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-[11px] text-rose-400 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Mobile Phone (for Courier SMS) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="+94 77 123 4567"
                        className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Email Address (for Receipt & Order Tracking)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="kamal@example.com"
                        className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Street Address / Apartment / Building *
                    </label>
                    <textarea
                      rows={2}
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="e.g. No. 42/1, Galle Road, Bambalapitiya"
                      className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 resize-none"
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-rose-400 mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      City / Suburb *
                    </label>
                    <input
                      type="text"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      placeholder="e.g. Colombo 03"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                    {formErrors.city && (
                      <p className="text-[11px] text-rose-400 mt-1">{formErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      District (Sri Lanka)
                    </label>
                    <select
                      value={customer.district}
                      onChange={(e) => setCustomer({ ...customer, district: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1b1b1b] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                    >
                      {SRI_LANKA_DISTRICTS.map((d) => (
                        <option key={d} value={d} className="bg-[#1b1b1b] text-white">
                          {d} District
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.notes || ""}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      placeholder="e.g. Near the clock tower, call when downstairs"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all active:scale-95"
                  >
                    <span>Continue to Shipping & Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping Method & Payment Method */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                {/* Shipping Method Selection */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-400" />
                    Select Delivery / Collection Method
                  </h3>
                  <div className="space-y-2">
                    {availableShippingMethods.map((method) => {
                      const isSelected = selectedShippingMethod.id === method.id;
                      const isFree = method.cost === 0 || deliveryFee === 0;

                      return (
                        <div
                          key={method.id}
                          onClick={() => setShippingMethod(method)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-orange-500/10 border-orange-500 shadow-md shadow-orange-500/10"
                              : "bg-white/5 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-orange-500 bg-orange-500" : "border-neutral-500"
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-bold text-white">
                                {method.name}
                              </div>
                              <div className="text-[11px] text-neutral-400">
                                {method.description} · <span className="text-orange-400 font-semibold">{method.estimatedDays}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-xs sm:text-sm font-black text-right flex-shrink-0">
                            {isFree ? (
                              <span className="text-emerald-400">FREE</span>
                            ) : (
                              <span className="text-white">LKR {method.cost.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-orange-400" />
                    Payment Method
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Choose how you want to pay for your Pettah market items.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Option 1: Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                        paymentMethod === "cod"
                          ? "bg-orange-500/10 border-orange-500"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Banknote className="w-5 h-5 text-emerald-400" />
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                          Most Popular
                        </span>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          Cash on Delivery (COD)
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Pay cash upon courier delivery or stall pickup
                        </div>
                      </div>
                    </div>

                    {/* Option 2: Visa / MasterCard */}
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                        paymentMethod === "card"
                          ? "bg-orange-500/10 border-orange-500"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <div className="flex gap-1 text-[10px] text-neutral-400 font-mono">
                          <span>VISA</span>
                          <span>MC</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          Credit / Debit Card
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Visa, Mastercard, AMEX with instant SSL
                        </div>
                      </div>
                    </div>

                    {/* Option 3: Koko Installments */}
                    <div
                      onClick={() => setPaymentMethod("koko")}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                        paymentMethod === "koko"
                          ? "bg-orange-500/10 border-orange-500"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                          0% Interest
                        </span>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          Koko / Mintpay
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          3 monthly installments of LKR {Math.round(grandTotal / 3).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Option 4: LankaQR */}
                    <div
                      onClick={() => setPaymentMethod("lankaqr")}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                        paymentMethod === "lankaqr"
                          ? "bg-orange-500/10 border-orange-500"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <QrCode className="w-5 h-5 text-purple-400" />
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-bold">
                          Instant QR
                        </span>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          LankaQR / FriMi
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Scan and pay with any Sri Lankan bank app
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card details simulation when Card is selected */}
                  {paymentMethod === "card" && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 mt-3 animate-fade-in">
                      <div className="flex items-center justify-between text-xs text-neutral-300 border-b border-white/5 pb-2">
                        <span className="font-semibold">Mock Card Gateway</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ready for test order
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] text-neutral-400 mb-1">
                              Expiry
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-2 py-1.5 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white text-center font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-neutral-400 mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-2 py-1.5 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white text-center font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LankaQR simulation info */}
                  {paymentMethod === "lankaqr" && (
                    <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex items-center gap-3 text-xs text-purple-200">
                      <QrCode className="w-8 h-8 text-purple-400 flex-shrink-0" />
                      <div>
                        <div className="font-bold">LankaQR Instant Settlement</div>
                        <p className="text-[11px] text-neutral-300">
                          A QR code will be generated on confirmation for instant payment via Commercial Bank, BOC, HNB, Sampath, FriMi, or Genie.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Delivery</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all active:scale-95"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Order Final Review & Confirmation */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Review & Confirm Order
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Please review your delivery destination and payment preference before placing the order.
                  </p>
                </div>

                {/* Delivery Snapshot */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" /> Delivering To:
                    </span>
                    <button
                      onClick={() => setStep(1)}
                      className="text-orange-400 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-xs text-white font-medium">
                    {customer.name} · {customer.phone}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {customer.address}, {customer.city}, {customer.district} District
                  </div>
                  {customer.notes && (
                    <div className="text-[11px] text-amber-300/80">
                      Note: "{customer.notes}"
                    </div>
                  )}
                </div>

                {/* Payment & Shipping Snapshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-neutral-400 mb-1">
                      <span>Shipping Method</span>
                      <button onClick={() => setStep(2)} className="text-orange-400">
                        Edit
                      </button>
                    </div>
                    <div className="text-white font-bold">{selectedShippingMethod.name}</div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">
                      {selectedShippingMethod.estimatedDays}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-neutral-400 mb-1">
                      <span>Payment Method</span>
                      <button onClick={() => setStep(2)} className="text-orange-400">
                        Edit
                      </button>
                    </div>
                    <div className="text-white font-bold uppercase">
                      {paymentMethod === "cod"
                        ? "Cash on Delivery (COD)"
                        : paymentMethod === "card"
                        ? "Credit/Debit Card"
                        : paymentMethod === "koko"
                        ? "Koko 3-Part Installments"
                        : "LankaQR / FriMi"}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {paymentMethod === "cod" ? "Pay in person" : "Authorized & verified"}
                    </div>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <div className="pt-2">
                  <button
                    id="place-order-submit-btn"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 active:scale-98 text-white font-black text-base shadow-2xl shadow-orange-500/30 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Confirming with Pettah Merchants...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-white" />
                        <span>Place Order (LKR {grandTotal.toLocaleString()})</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-neutral-400 text-center mt-2.5">
                    By placing your order, you agree to PettahBazaar Terms of Trade & Merchant Stall Policy.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Items Summary & Price Breakdown (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-950 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Order Summary
                  <span className="text-xs text-neutral-400 font-normal">
                    ({cart.length} items)
                  </span>
                </h3>
                <span className="text-xs text-orange-400 font-semibold">Pettah Direct</span>
              </div>

              {/* Items scroll */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3 text-xs">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 flex-shrink-0">
                      <Image
                        src={item.product.images[0] || ""}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Qty: {item.quantity} · Size: {item.selectedSize}
                      </p>
                      <div className="text-white font-bold mt-1">
                        LKR {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations in summary */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-white">
                  LKR {subtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span>- LKR {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({selectedShippingMethod.estimatedDays})</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `LKR ${deliveryFee.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base sm:text-lg font-black text-white pt-3 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-orange-400">LKR {grandTotal.toLocaleString()}</span>
              </div>

              <div className="pt-3 text-[11px] text-neutral-400 flex items-center gap-1.5 justify-center">
                <Store className="w-3.5 h-3.5 text-orange-400" />
                <span>Orders are dispatched directly by stall merchants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
