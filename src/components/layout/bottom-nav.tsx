"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ShieldCheck, User } from "lucide-react";

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
      label: "Licenses",
      href: "/licenses",
      icon: ShieldCheck,
    },
    {
      label: "Account",
      href: "/account",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 max-w-sm mx-auto z-40 bg-[#071529]/95 backdrop-blur-2xl border border-slate-700/60 shadow-[0_12px_40px_rgba(0,0,0,0.5)] rounded-2xl py-1.5 px-2 md:hidden print:hidden transition-all duration-300">
      <div className="grid grid-cols-4 items-center justify-items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-95 group ${
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-500/30 -translate-y-0.5 scale-110"
                    : "group-hover:bg-white/10 text-slate-400 group-hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 transition-colors ${
                  isActive
                    ? "font-bold text-teal-300"
                    : "font-medium text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-teal-400 mt-0.5 shadow-[0_0_8px_rgba(45,212,191,0.9)] animate-in zoom-in" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
