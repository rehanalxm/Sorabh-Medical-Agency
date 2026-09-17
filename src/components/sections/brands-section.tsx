"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CARD_COMPANIES } from "@/lib/data";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function BrandsSection() {
  return (
    <section id="brands" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="navy" className="uppercase tracking-widest text-[10px] px-2.5 py-0.5">
                Authorized Lines
              </Badge>
              <span className="text-xs font-bold text-teal-700">
                Direct Company Supply
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0b1e36] tracking-tight">
              21+ Trusted Pharmaceutical Brands We Distribute
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              100% original medicines procured directly from authorized company depots with batch-test quality guarantee:
            </p>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl shrink-0 flex items-center gap-2 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span><strong>Depot Sourced:</strong> 100% verified original medicines</span>
          </div>
        </div>

        {/* 21 Companies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {CARD_COMPANIES.map((brand, idx) => (
            <Link
              key={idx}
              href={`/store?company=${encodeURIComponent(brand.name)}`}
              className="group relative rounded-xl border border-slate-200/90 bg-slate-50/50 p-3 text-center hover:border-[#0b1e36] hover:bg-white hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
            >
              {/* Company Pharma Brand Logo */}
              <div className="mx-auto w-full h-12 rounded-xl bg-white group-hover:bg-slate-50 transition-colors flex items-center justify-center p-2 mb-2 border border-slate-200/80 group-hover:border-teal-500 shadow-2xs">
                <BrandLogo brandName={brand.name} size="sm" />
              </div>

              {/* Brand Category */}
              <div className="space-y-0.5">
                <p className="text-[10px] text-slate-500 truncate font-medium">
                  {brand.category}
                </p>
              </div>

              {/* Supply Tier */}
              <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-center">
                <span className="text-[9px] font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                  {brand.tier}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA to Store */}
        <div className="mt-6 text-center">
          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b1e36] hover:text-[#0d9488] transition-colors bg-slate-100 px-4 py-2 rounded-lg border border-slate-200"
          >
            <span>Explore All Formulations in Store Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
