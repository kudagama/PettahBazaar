"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, MessageSquare, ThumbsUp, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ProductReview } from "@/types";

interface ReviewSectionProps {
  productId: string;
  productName: string;
}

export default function ReviewSection({ productId, productName }: ReviewSectionProps) {
  const { getProductReviews, addReview } = useCart();
  const { currentUser } = useMarketplace();

  const reviews = getProductReviews(productId);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState(currentUser?.name || "Kamal Perera");
  const [userLocation, setUserLocation] = useState("Colombo");
  const [comment, setComment] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5.0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      productId,
      userName: reviewerName.trim() || "Verified Buyer",
      userLocation: userLocation.trim() || "Sri Lanka",
      rating,
      comment: comment.trim(),
      verifiedPurchase: true,
    });

    setComment("");
    setShowAddForm(false);
  };

  return (
    <div className="pt-6 border-t border-white/10 space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-400" />
            Verified Customer Reviews ({reviews.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real feedback from buyers who shopped this stall in Pettah
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-300 font-bold text-xs transition-all active:scale-95"
        >
          {showAddForm ? "Cancel Review" : "+ Write a Review"}
        </button>
      </div>

      {/* Write a Review Collapsible Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 animate-fade-in"
        >
          <h4 className="text-xs sm:text-sm font-bold text-white">
            Reviewing: <span className="text-orange-400">{productName}</span>
          </h4>

          {/* Rating Stars Picker */}
          <div>
            <label className="block text-xs text-neutral-300 font-semibold mb-1.5">
              Your Rating (1 to 5 Stars):
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-neutral-600"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-white ml-2">
                {hoverRating || rating} out of 5 Stars
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Your Name</label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Suresh Fernando"
                className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">City / Suburb</label>
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                placeholder="e.g. Colombo 03, Kandy, Galle"
                className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Your Review</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the quality, fit, stall experience, or delivery?"
              className="w-full p-3 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 resize-none"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <p className="text-xs text-neutral-400 py-3 text-center">
            No reviews yet for this product. Be the first customer to leave feedback!
          </p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-500/30 flex items-center justify-center text-xs font-bold text-white">
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <span>{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.2 rounded font-medium flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      )}
                    </div>
                    {rev.userLocation && (
                      <span className="text-[10px] text-neutral-400">
                        {rev.userLocation} · {rev.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i <= rev.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-neutral-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
