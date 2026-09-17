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
    <div className="flex items-center justify-between gap-2 pt-1">
      {/* Horizontal Formulation Icons with Name on Below */}
      <div className="flex-1 overflow-x-auto no-scrollbar py-1 -mx-2 px-2 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-3 sm:gap-4 min-w-max">
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
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200/60"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Name on Below */}
                <span
                  className={`text-[10px] sm:text-[11px] mt-1.5 transition-colors ${
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

      {/* Tiny Filter / Sort Icon Button on the Right */}
      <div className="shrink-0 pl-1 border-l border-slate-200">
        <button
          onClick={onOpenCompanyFilter}
          className={`flex flex-col items-center justify-center p-2 rounded-2xl border transition-all active:scale-90 group relative ${
            selectedCompany !== "All"
              ? "bg-teal-50 border-teal-300 text-teal-800 shadow-xs"
              : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/80"
          }`}
          title="Filter by Company / Brand"
          aria-label="Filter companies"
        >
          <div className="relative">
            <SlidersHorizontal className="w-4 h-4 text-slate-700 group-hover:text-[#0b1e36]" />
            {selectedCompany !== "All" && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-600 ring-2 ring-white animate-in zoom-in" />
            )}
          </div>
          <span className="text-[9px] font-bold mt-1 text-slate-600">
            {selectedCompany !== "All" ? "Filtered" : "Brands"}
          </span>
        </button>
      </div>
    </div>
  );
}
