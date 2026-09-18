"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

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
      label: "Account",
      href: "/account",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 py-1.5 px-3 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] print:hidden">
      <div className="grid grid-cols-3 items-center justify-items-center max-w-xs mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-4 active:scale-95 transition-all group ${
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
  );
}
