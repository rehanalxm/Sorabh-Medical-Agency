"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  PhoneCall,
  FileCheck2,
  Store,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function CTASection() {
  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#0b1e36] text-white relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[11px] text-teal-300 font-semibold shadow-inner">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Licensed Pharmaceutical Stockist • Bhagalpur, Bihar</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Ready to Order Medicines for Your Pharmacy?
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Get 100% genuine medicines, verified batch reports, best wholesale schemes, and same-day delivery directly to your store.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm px-6 h-11 group shadow-md"
            asChild
          >
            <Link href="/store" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              <span>Open Wholesale Store</span>
              <ArrowRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 font-semibold text-xs sm:text-sm px-6 h-11"
            asChild
          >
            <a href={COMPANY_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-teal-400" />
              <span>Order on WhatsApp: {COMPANY_DETAILS.mobile}</span>
            </a>
          </Button>
        </div>

        {/* Bottom Compliance Line */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Form 20B/21B Licensed Wholesale Distribution</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span>GST-Compliant B2B Tax Invoicing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
