"use client";

import React from "react";
import { Sparkles, Pill, Syringe, HeartPulse, ShoppingBag, SlidersHorizontal } from "lucide-react";

interface CategoryScrollerProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedCompany: string;
  onOpenCompanyFilter: () => void;
}

export function CategoryScroller({
  selectedCategory,
  onSelectCategory,
  selectedCompany,
  onOpenCompanyFilter,
}: CategoryScrollerProps) {
  const categories = [
    { id: "All", label: "All Items", icon: Sparkles },
    { id: "Generic", label: "Generic", icon: Pill },
    { id: "Surgical", label: "Surgical", icon: Syringe },
    { id: "Ayurvedic", label: "Ayurvedic", icon: HeartPulse },
    { id: "OTC", label: "OTC Care", icon: ShoppingBag },
  ];

  return (
    <div className="flex items-center justify-between gap-2 pt-0.5 w-full max-w-full min-w-0">
      {/* Horizontal Formulation Icons with Name on Below */}
      <div
        className="flex-1 min-w-0 overflow-x-auto no-scrollbar py-1 [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-max pl-1.5 sm:pl-2 pr-2 py-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center justify-center group active:scale-95 transition-all text-center"
              >
                {/* Icon Container Tile */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#0b1e36] text-teal-300 shadow-md ring-2 ring-teal-500/40 scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200/70"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Name on Below */}
                <span
                  className={`text-[10px] sm:text-[11px] mt-1 transition-colors leading-tight ${
                    isSelected
                      ? "font-extrabold text-[#0b1e36]"
                      : "font-medium text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tiny Filter / Sort Icon Button on the Right (Aligned with Tiles) */}
      <div className="shrink-0 pl-2 border-l border-slate-200/80 flex flex-col items-center">
        <button
          onClick={onOpenCompanyFilter}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all active:scale-95 group relative flex flex-col items-center justify-center ${
            selectedCompany !== "All"
              ? "bg-teal-50 border-teal-400 text-teal-900 shadow-xs ring-2 ring-teal-500/40"
              : "bg-slate-100 border-slate-200/70 text-slate-600 hover:bg-slate-200/80"
          }`}
          title="Filter by Company / Brand"
          aria-label="Filter companies"
        >
          <div className="relative">
            <SlidersHorizontal className="w-4 h-4 text-slate-700 group-hover:text-[#0b1e36]" />
            {selectedCompany !== "All" && (
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-teal-600 ring-2 ring-white animate-in zoom-in" />
            )}
          </div>
        </button>
        <span
          className={`text-[10px] sm:text-[11px] mt-1 transition-colors leading-tight ${
            selectedCompany !== "All" ? "font-extrabold text-teal-800" : "font-medium text-slate-600"
          }`}
        >
          {selectedCompany !== "All" ? "Filtered" : "Brands"}
        </span>
      </div>
    </div>
  );
}
