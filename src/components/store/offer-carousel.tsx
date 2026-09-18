"use client";

import React, { useState, useEffect } from "react";
import { OFFER_SLIDES, OfferSlide } from "@/lib/data";
import { getStoredOffers } from "@/lib/store";
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";

export function OfferCarousel() {
  const [slides, setSlides] = useState<OfferSlide[]>(OFFER_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadSlides = () => {
      const stored = getStoredOffers();
      if (stored && stored.length > 0) {
        setSlides(stored);
      } else {
        setSlides(OFFER_SLIDES);
      }
    };

    loadSlides();
    window.addEventListener("offers-updated", loadSlides);
    return () => window.removeEventListener("offers-updated", loadSlides);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[currentSlide % slides.length];

  const handleShopNow = () => {
    const catalogElem = document.getElementById("catalog-products") || document.getElementById("store-filters");
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleShopNow}
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 bg-slate-950 group cursor-pointer"
    >
      {/* Full Landscape Graphic Banner Frame - Image covers entire container */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] md:aspect-[28/8] min-h-[160px] sm:min-h-[210px] max-h-[340px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.imageUrl}
          alt={slide.title || "Promotional Wholesale Banner"}
          className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700 ease-out"
          loading="eager"
        />

        {/* Subtle Dark Gradient Overlay at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

        {/* Floating "Shop Now" Action on Bottom-Left */}
        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-10 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShopNow();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all transform hover:scale-105 border border-white/20"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
          </button>
        </div>

        {/* Slide Indicators (Dots) Bottom-Right */}
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? "w-6 bg-teal-400" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows (Desktop hover) */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
              }
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-white/20"
              aria-label="Previous Banner"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % slides.length)
              }
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-white/20"
              aria-label="Next Banner"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
