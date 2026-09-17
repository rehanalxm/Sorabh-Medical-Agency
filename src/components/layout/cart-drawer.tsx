"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredCart, saveCartToStorage, CartItem } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Percent,
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = () => {
    setCart(getStoredCart());
  };

  useEffect(() => {
    loadCart();
    const handleUpdate = () => loadCart();
    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  const handleUpdateQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      const updated = cart.filter((item) => item.product.id !== productId);
      saveCartToStorage(updated);
    } else {
      const updated = cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      );
      saveCartToStorage(updated);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.wholesalePrice * item.quantity,
    0
  );
  const gstAmount = Math.round(subtotal * 0.12 * 10) / 10;
  const totalAmount = Math.round(subtotal + gstAmount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0b1e36]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0b1e36] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#0b1e36] text-base leading-tight">
                  Wholesale Order Cart
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  {cart.length} item{cart.length !== 1 ? "s" : ""} selected for dispatch
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-slate-700 text-base">Your Wholesale Cart is Empty</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Browse Generic, Surgical, Ayurvedic, and OTC catalog to add bulk lots.
                  </p>
                </div>
                <Button variant="primary" size="sm" asChild onClick={onClose}>
                  <Link href="/store">Open Wholesale Agency</Link>
                </Button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = item.product.wholesalePrice * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d9488] bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                          {item.product.company}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Pack: {item.product.packSize}
                        </p>
                      </div>

                      <button
                        onClick={() => handleUpdateQty(item.product.id, 0)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-xs">
                      <div>
                        <span className="text-slate-500 text-[11px]">Wholesale: </span>
                        <span className="font-bold text-slate-900">
                          ₹{item.product.wholesalePrice}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through ml-1">
                          MRP ₹{item.product.mrp}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-2 py-1">
                        <button
                          onClick={() => handleUpdateQty(item.product.id, item.quantity - 1)}
                          className="text-slate-600 hover:text-slate-900 p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-xs w-6 text-center text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item.product.id, item.quantity + 1)}
                          className="text-slate-600 hover:text-slate-900 p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-[#0b1e36] text-sm">
                          ₹{itemTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Wholesale Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Est. GST (12% Pharma Average)</span>
                  <span className="font-semibold text-slate-900">₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0b1e36] pt-2 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-base font-extrabold text-[#0b1e36]">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-teal-800 bg-teal-50 p-2 rounded-lg border border-teal-200">
                <ShieldCheck className="w-4 h-4 shrink-0 text-teal-600" />
                <span>GST Tax Invoice & Batch Test Certificate with order</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild onClick={onClose}>
                  <Link href="/store">Continue Catalog</Link>
                </Button>
                <Button variant="accent" size="sm" asChild onClick={onClose}>
                  <Link href="/checkout" className="flex items-center justify-center gap-1">
                    <span>Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
