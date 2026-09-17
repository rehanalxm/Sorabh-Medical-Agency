"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Store,
  Home,
  User,
  Phone,
  ShieldCheck,
  ChevronRight,
  FileCheck2,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isStore = pathname === "/store";

  return (
    <div className="lg:hidden">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b1e36]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0b1e36] text-white flex items-center justify-center font-bold text-sm">
                  SM
                </div>
                <div>
                  <span className="font-bold text-[#0b1e36] text-sm block leading-tight">
                    {COMPANY_DETAILS.name}
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold uppercase">
                    Wholesale Medicine Agency
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                Main Menu
              </div>

              {/* Single Dynamic Store/Home Toggle */}
              {isStore ? (
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg font-bold text-[#0b1e36] bg-slate-100 border border-slate-200 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-teal-600" />
                    <span>Home / Company Profile</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ) : (
                <Link
                  href="/store"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg font-bold text-[#0b1e36] bg-teal-50/70 border border-teal-200/80 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Store className="w-4 h-4 text-teal-600" />
                    <span>Wholesale Store</span>
                  </span>
                  <Badge variant="accent" className="text-[9px]">
                    Catalog
                  </Badge>
                </Link>
              )}

              <Link
                href="/#credentials"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0b1e36] transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-slate-500" />
                  <span>Licenses & Certifications</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/#brands"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0b1e36] transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>21+ Partner Pharma Brands</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <div className="pt-3 border-t border-slate-100 mt-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                  Retailer Hub
                </div>

                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-teal-600" />
                    <span>My Account & Reorder</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
              <a
                href={`tel:${COMPANY_DETAILS.mobile}`}
                className="flex items-center justify-center gap-2 p-2 rounded-lg bg-[#0b1e36] text-white text-xs font-bold shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Call Helpline: {COMPANY_DETAILS.mobile}</span>
              </a>

              <p className="text-[10px] text-center text-slate-500">
                Kotwali Chowk, Bhagalpur - 812002
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
