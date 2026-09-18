"use client";

import React from "react";
import { ProductItem, COMPANY_DETAILS } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Plus, Minus, ShoppingBag, ShieldCheck, Tag, Calendar, PackageCheck, MessageSquare } from "lucide-react";

interface ProductDetailModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  onAddToCart: (product: ProductItem) => void;
  onUpdateQuantity: (product: ProductItem, newQty: number) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  quantity,
  onAddToCart,
  onUpdateQuantity,
}: ProductDetailModalProps) {
  if (!product) return null;

  const marginPercent = Math.round(
    ((product.mrp - product.wholesalePrice) / product.mrp) * 100
  );

  const whatsappMessage = encodeURIComponent(
    `Hello Sorabh Medical Agency, I am interested in wholesale order for:\n` +
    `• Product: ${product.name}\n` +
    `• Salt / Generic: ${product.genericName || "N/A"}\n` +
    `• Company: ${product.company}\n` +
    `• Pack: ${product.packSize}\n` +
    `• Wholesale Rate: ₹${product.wholesalePrice}\n` +
    `Please confirm ready stock and billing details.`
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-lg p-4 sm:p-6 rounded-2xl max-h-[90vh] overflow-y-auto box-border">
        {/* Product Image Frame */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Top Floating Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-md px-2 py-0.5 shadow-xs">
              <BrandLogo brandName={product.company} size="sm" className="h-4" />
            </div>
            <span className="bg-[#0b1e36] text-teal-300 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
              {product.category.toUpperCase()}
            </span>
          </div>

          <div className="absolute top-2.5 right-2.5">
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {marginPercent}% Retailer Margin
            </span>
          </div>
        </div>

        {/* Header & Titles */}
        <DialogHeader className="text-left mt-2 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[11px] font-semibold text-slate-600 border-slate-300">
              {product.company}
            </Badge>
            <span className="text-[11px] text-slate-500">• {product.packSize}</span>
            {product.inStock ? (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-auto">
                In Stock
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded ml-auto">
                Out of Stock
              </span>
            )}
          </div>

          <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {product.name}
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm font-medium text-teal-800 bg-teal-50/70 p-2 rounded-lg border border-teal-100">
            <strong>Active Salt / Generic:</strong> {product.genericName || "Formulated for clinical efficacy"}
          </DialogDescription>
        </DialogHeader>

        {/* Pricing Matrix */}
        <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200 space-y-2.5 my-1">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                Wholesale PTR Rate
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36]">
                ₹{product.wholesalePrice}
                <span className="text-xs text-slate-500 font-normal ml-1">/ unit</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-500">
                Max Retail Price (MRP)
              </span>
              <div className="text-sm sm:text-base font-semibold text-slate-500 line-through">
                ₹{product.mrp}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              Net Margin per unit:
            </span>
            <span className="font-bold text-emerald-700">
              ₹{(product.mrp - product.wholesalePrice).toFixed(2)} ({marginPercent}%)
            </span>
          </div>
        </div>

        {/* Product Specifications Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <div className="text-slate-500 flex items-center gap-1 mb-0.5">
              <PackageCheck className="w-3.5 h-3.5 text-slate-400" /> Pack Size
            </div>
            <div className="font-semibold text-slate-800">{product.packSize}</div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <div className="text-slate-500 flex items-center gap-1 mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Expiry / Batch
            </div>
            <div className="font-semibold text-slate-800">
              Batch: {product.batchNo} ({product.expDate})
            </div>
          </div>
        </div>

        {/* Description & Indications */}
        <div className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100">
          <h4 className="font-semibold text-slate-800 mb-1">Clinical Indications & Use:</h4>
          {product.description}
        </div>

        {/* Wholesale Legitimacy Notice */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-amber-50/70 border border-amber-200/60 p-2 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>GST Bill with Batch & Expiry Certificate provided on dispatch.</span>
        </div>

        {/* Quantity and Order Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200">
          {quantity === 0 ? (
            <Button
              className="w-full bg-[#0b1e36] hover:bg-[#142e50] text-white font-semibold py-5 text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Retailer Order
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-700 pl-2">
                Order Quantity:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(product, quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-50"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-sm w-6 text-center text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(product, quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-[#0b1e36] text-white flex items-center justify-center hover:bg-[#142e50]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <a
            href={`https://wa.me/${COMPANY_DETAILS.mobile.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold py-5 text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Inquire Slab Rate
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
