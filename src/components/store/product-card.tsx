"use client";

import React from "react";
import { ProductItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Plus, Minus, Check, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: ProductItem;
  quantity: number;
  onAddToCart: (product: ProductItem) => void;
  onUpdateQuantity: (product: ProductItem, newQty: number) => void;
  onSelectProduct?: (product: ProductItem) => void;
}

export function ProductCard({
  product,
  quantity,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
}: ProductCardProps) {
  const marginPercent = Math.round(
    ((product.mrp - product.wholesalePrice) / product.mrp) * 100
  );

  return (
    <div
      onClick={() => onSelectProduct?.(product)}
      className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white hover:border-[#0b1e36]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer active:scale-[0.99]"
    >
      <div>
        {/* Product Image Frame */}
        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Top Floating Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
            <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded px-1.5 py-0.5 shadow-xs">
              <BrandLogo brandName={product.company} size="sm" className="h-4" />
            </div>
            <span className="bg-white/95 text-[#0d9488] text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
              {product.category}
            </span>
          </div>

          {product.scheme && (
            <div className="absolute bottom-2 left-2 bg-emerald-600/95 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              {product.scheme}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-3 sm:p-4 space-y-1.5">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0b1e36] transition-colors leading-tight line-clamp-2">
            {product.name}
          </h3>

          <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono line-clamp-1">
            {product.genericName}
          </p>

          <div className="text-[10px] sm:text-[11px] text-slate-600 bg-slate-50 p-1.5 sm:p-2 rounded-lg border border-slate-200/60 flex items-center justify-between">
            <span className="truncate">Pack: <strong>{product.packSize}</strong></span>
            <span className="shrink-0 text-slate-400">Exp: {product.expDate}</span>
          </div>

          {/* Pricing Row */}
          <div className="pt-1.5 flex items-baseline justify-between gap-1">
            <div>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">
                Wholesale PTR
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-black text-[#0b1e36]">
                  ₹{product.wholesalePrice}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                  ₹{product.mrp}
                </span>
              </div>
            </div>

            <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
              {marginPercent}% Margin
            </span>
          </div>
        </div>
      </div>

      {/* Touch-Friendly Add to Cart / Quantity Stepper */}
      <div className="p-3 sm:p-4 pt-0" onClick={(e) => e.stopPropagation()}>
        {quantity === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-bold text-white bg-[#0b1e36] hover:bg-[#163b65] active:scale-[0.98] transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <div className="flex items-center justify-between bg-teal-50 border border-teal-200 rounded-lg sm:rounded-xl p-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQuantity(product, quantity - 1);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center shadow-xs active:scale-95 transition-all"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-extrabold text-xs text-[#0b1e36] px-1">
              {quantity} Box{quantity > 1 ? "es" : ""}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQuantity(product, quantity + 1);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0b1e36] text-white hover:bg-[#163b65] flex items-center justify-center shadow-xs active:scale-95 transition-all"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
