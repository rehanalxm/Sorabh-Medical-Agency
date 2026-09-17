"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getStoredCart } from "@/lib/store";
import { CartDrawer } from "@/components/layout/cart-drawer";
import {
  Home,
  Store,
  ShoppingBag,
  User,
} from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const cart = getStoredCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    updateCount();
    window.addEventListener("cart-updated", updateCount);
    return () => window.removeEventListener("cart-updated", updateCount);
  }, []);

  const isStore = pathname === "/store";

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Store",
      href: "/store",
      icon: Store,
    },
    {
      label: "Cart",
      isCart: true,
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      label: "Account",
      href: "/account",
      icon: User,
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 py-1.5 px-3 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-4 items-center justify-items-center max-w-sm mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !item.isCart && pathname === item.href;

            if (item.isCart) {
              return (
                <button
                  key={item.label}
                  onClick={() => setCartOpen(true)}
                  className="flex flex-col items-center justify-center py-1 px-2 relative active:scale-95 transition-transform group"
                >
                  <div className="relative p-1.5 rounded-xl transition-colors text-slate-600 group-hover:text-slate-900">
                    <Icon className="w-5 h-5" />
                    {item.badge !== undefined && (
                      <span className="absolute -top-0.5 -right-1 bg-teal-600 text-white text-[9px] font-extrabold min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold mt-0.5 text-slate-600">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href!}
                className={`flex flex-col items-center justify-center py-1 px-2 active:scale-95 transition-all group ${
                  isActive ? "text-teal-700" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-teal-600 text-white shadow-xs scale-105"
                      : "text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] tracking-tight mt-0.5 ${
                    isActive ? "font-bold text-teal-800" : "font-medium text-slate-600"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-teal-600 mt-0.5 animate-in zoom-in" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Cart Drawer triggered from Bottom Nav */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
