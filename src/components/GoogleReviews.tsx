"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, Quote } from "lucide-react";
import { reviewsData, googleReviewsConfig } from "@/data/reviewsData";

export default function GoogleReviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#F4EFE6] border-y border-[#E6DEC $\rightarrow$ #E5DEC $\rightarrow$ #E2D9CB] border-[#E3DACE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#D8CFC0]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D5CABE] text-xs font-semibold tracking-wider text-[#2D5A47] uppercase mb-3 shadow-2xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                />
              </svg>
              <span>Google Verified Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight">
              Words of Trust & Healing
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-[#4E5D6E]">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <span className="font-semibold text-[#162534]">5.0 / 5.0 Rating</span>
              <span className="text-[#9BB0C7]">•</span>
              <span>Based on 54+ reviews on Google Maps</span>
            </div>
          </div>

          {/* Controls & External Link */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={googleReviewsConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#2D5A47] text-[#162534] hover:text-white border border-[#D5CABE] hover:border-[#2D5A47] text-xs font-medium transition-all shadow-xs group"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#586676] group-hover:text-white transition-colors" />
            </a>

            {/* Nav Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous reviews"
                className={`p-2.5 rounded-full border transition-all ${
                  canScrollLeft
                    ? "bg-white text-[#162534] border-[#D5CABE] hover:bg-[#2D5A47] hover:text-white shadow-xs cursor-pointer"
                    : "bg-white/40 text-neutral-300 border-neutral-200 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next reviews"
                className={`p-2.5 rounded-full border transition-all ${
                  canScrollRight
                    ? "bg-white text-[#162534] border-[#D5CABE] hover:bg-[#2D5A47] hover:text-white shadow-xs cursor-pointer"
                    : "bg-white/40 text-neutral-300 border-neutral-200 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontally Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviewsData.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="w-[310px] sm:w-[360px] md:w-[390px] shrink-0 snap-start bg-[#FAF6EE] rounded-2xl p-6 sm:p-7 border border-[#E3D9CC] hover:border-[#2D5A47]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Decorative Quote mark */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-[#2D5A47]/10 pointer-events-none" />

              <div>
                {/* Reviewer Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2D5A47] to-[#1F3D30] text-white font-serif font-semibold text-lg flex items-center justify-center shrink-0 shadow-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-semibold text-[#162534] truncate font-serif">
                      {rev.author}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[#6A7888]">
                      <span>{rev.date}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-[#2D5A47] font-medium">
                        <CheckCircle2 className="w-3 h-3 text-[#2D5A47]" />
                        {rev.badge || "Google Verified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3.5 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-sm text-[#2E3C4D] leading-relaxed line-clamp-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Owner Response (if available) */}
              {rev.ownerResponse && (
                <div className="mt-5 pt-3.5 border-t border-[#E8DFC0]/80 text-xs bg-white/60 p-3 rounded-xl border">
                  <p className="font-semibold text-[#2D5A47] mb-1">
                    Response from Dr. Bhoomi Raval (MANAM)
                  </p>
                  <p className="text-[#556372] italic">&ldquo;{rev.ownerResponse}&rdquo;</p>
                </div>
              )}

              {/* Bottom Google source mark */}
              <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-[#788796] border-t border-[#EAE2D5]">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                    />
                  </svg>
                  Posted on Google
                </span>
                <span className="text-[#2D5A47] font-medium group-hover:underline">
                  Verified Review
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-4 text-xs text-[#7A8898]">
          <span>← Swipe left or right to explore all 8 verified reviews →</span>
        </div>
      </div>
    </section>
  );
}
