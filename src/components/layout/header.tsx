"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { getStoredCart } from "@/lib/store";
import {
  Phone,
  ShieldCheck,
  ShoppingBag,
  Home,
  User,
  Search,
  Store,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);

    const updateCart = () => {
      const cart = getStoredCart();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCart();
    window.addEventListener("cart-updated", updateCart);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cart-updated", updateCart);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 w-full transition-all duration-200 print:hidden">
        {/* Top Statutory Compliance Ribbon (Desktop only) */}
        <div className="bg-[#0b1e36] text-slate-300 text-xs py-1.5 px-4 border-b border-white/10 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Wholesale Pharmaceutical Supply to Licensed Retailers Only</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">
                Form 20B & 21B Licensed Stockist • Kotwali Chowk, Bhagalpur
              </span>
            </div>

            <div className="flex items-center gap-5 text-[11px]">
              <a
                href={`tel:${COMPANY_DETAILS.mobile}`}
                className="flex items-center gap-1.5 text-teal-300 hover:text-white font-mono font-semibold transition-colors"
              >
                <Phone className="w-3 h-3 text-teal-400" />
                <span>Helpline: {COMPANY_DETAILS.phoneDisplay}</span>
              </a>
              <span className="text-white/20">|</span>
              <span className="text-slate-300 font-medium">
                Trade Desk: 9:00 AM – 8:30 PM
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`w-full transition-all duration-200 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-2 sm:py-3"
              : "bg-white border-b border-slate-200/80 py-2.5 sm:py-3.5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo Brand Identity */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white shadow-xs border border-slate-200/80 p-0.5 flex items-center justify-center shrink-0 group-hover:shadow-sm transition-all">
                <img
                  src="/logo.png"
                  alt={COMPANY_DETAILS.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-extrabold text-[#0b1e36] text-xs sm:text-lg tracking-tight block leading-tight truncate">
                  {COMPANY_DETAILS.name}
                </span>
                <span className="text-[9px] sm:text-[11px] font-semibold tracking-wider text-teal-700 uppercase block truncate">
                  Wholesale Medicine Agency • Bhagalpur
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* Single Dynamic Toggle: Shows Store on Home, and Home on Store */}
              {pathname === "/store" ? (
                <Link
                  href="/"
                  className="text-xs font-bold transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-[#0b1e36] hover:bg-slate-100 shadow-xs"
                >
                  <Home className="w-3.5 h-3.5 text-teal-600" />
                  <span>Home / Profile</span>
                </Link>
              ) : (
                <Link
                  href="/store"
                  className="text-xs font-bold transition-colors flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0b1e36] text-white hover:bg-[#163b65] shadow-xs"
                >
                  <Store className="w-3.5 h-3.5 text-teal-400" />
                  <span>Wholesale Store</span>
                  <Badge
                    variant="accent"
                    className="text-[9px] px-1.5 py-0 font-extrabold bg-teal-600 text-white"
                  >
                    Catalog
                  </Badge>
                </Link>
              )}

              <Link
                href="/#credentials"
                className="text-xs font-medium text-slate-600 hover:text-[#0b1e36] transition-colors"
              >
                Licenses & Trust
              </Link>

              <Link
                href="/#brands"
                className="text-xs font-medium text-slate-600 hover:text-[#0b1e36] transition-colors"
              >
                21+ Brands
              </Link>

              <Link
                href="/account"
                className={`text-xs font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                  pathname === "/account"
                    ? "bg-[#0b1e36] text-white border-[#0b1e36]"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Account</span>
              </Link>
            </nav>

            {/* Action Tools (Right side) */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Direct Call Trigger */}
              <a
                href={`tel:${COMPANY_DETAILS.mobile}`}
                className="flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                title="Call trade helpline"
              >
                <Phone className="w-3.5 h-3.5 text-[#0d9488]" />
                <span className="hidden sm:inline font-mono">{COMPANY_DETAILS.mobile}</span>
              </a>

              {/* Cart Button (Shifted here to replace hamburger on mobile) */}
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 text-xs font-bold text-[#0b1e36] transition-colors relative active:scale-95 shrink-0"
                aria-label="View Wholesale Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-teal-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-teal-600 text-white text-[9px] font-extrabold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-teal-900 hidden sm:inline">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Shopping Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
