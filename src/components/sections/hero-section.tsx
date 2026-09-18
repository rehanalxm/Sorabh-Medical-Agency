"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ArrowRight,
  Truck,
  FileText,
  Building2,
  Phone,
  Coins,
  CheckCircle2,
  Award,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f9f6] via-white to-slate-50/60 pt-4 pb-10 sm:pt-8 sm:pb-16 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Main Hero Card */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-5 sm:p-8 lg:p-12 shadow-sm overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Copy & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              {/* Green status badge matching reference */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Wholesale Medicine Distributor</span>
              </div>

              {/* Headline matching reference */}
              <div className="space-y-1 sm:space-y-1.5">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-[#071529] leading-[1.12]">
                  Quality Medicines
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-[#0f766e] leading-[1.12]">
                  for a Healthier Tomorrow
                </h2>
              </div>

              {/* Subtitle matching reference */}
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                We supply genuine medicines, hospital supplies and healthcare products to medical stores and pharmacies across the region.
              </p>

              {/* Action Buttons matching reference */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {/* Explore Products Pill */}
                <Button
                  asChild
                  className="bg-[#071529] hover:bg-[#122845] text-white rounded-full px-6 py-2.5 sm:py-3 h-auto text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] group flex items-center gap-2"
                >
                  <Link href="/store">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                {/* Contact Us Pill */}
                <Button
                  variant="outline"
                  asChild
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400 rounded-full px-6 py-2.5 sm:py-3 h-auto text-xs sm:text-sm font-semibold shadow-xs active:scale-[0.98] transition-all"
                >
                  <a
                    href={COMPANY_DETAILS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column: Proprietor Profile with Signature Badge (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Curved Container with Soft Mint Background */}
                <div className="relative rounded-[2.5rem] p-3 sm:p-4 bg-gradient-to-br from-teal-100/60 via-emerald-50/50 to-teal-50 border border-teal-200/70 shadow-lg overflow-hidden">
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={COMPANY_DETAILS.ownerPhotoUrl}
                      alt={COMPANY_DETAILS.ownerName}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />

                    {/* Subtle Gradient Shadow at base */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Signature Badge in bottom-right corner matching reference */}
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-200/80">
                        <Award className="w-4 h-4 text-teal-700" />
                      </div>
                      <div className="text-left">
                        {/* Signature Style Script */}
                        <div className="font-serif italic font-semibold text-xs sm:text-sm text-[#071529] leading-tight">
                          {COMPANY_DETAILS.ownerName}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          Proprietor
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Feature Items Bar matching reference */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-100">
                <ShieldCheck className="w-4 h-4 text-[#0f766e]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Genuine Products
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-100">
                <Coins className="w-4 h-4 text-[#0f766e]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Competitive Prices
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-100">
                <Truck className="w-4 h-4 text-[#0f766e]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Fast & Reliable Delivery
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-100">
                <FileText className="w-4 h-4 text-[#0f766e]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                GST Invoices
              </span>
            </div>
          </div>
        </div>

        {/* Certificate / Trust Banner Matching Reference Image */}
        <div className="bg-gradient-to-br from-[#ebfaf3] via-[#e4f6ed] to-[#d8f1e4] border border-emerald-200/80 rounded-3xl p-5 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Column: Text & Link */}
            <div className="md:col-span-7 space-y-2 text-left">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#0f766e] block">
                TRUST & CREDENTIALS
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#071529] tracking-tight">
                Your Trust Matters to Us
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                We are a licensed and verified wholesale distributor, committed to quality, transparency and long-term partnerships.
              </p>
              <div className="pt-2">
                <Link
                  href="/licenses"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0f766e] hover:text-[#0b514c] transition-colors group"
                >
                  <span>View Certificates</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Fanned-out Certificates with Green Shield Check Badge */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <Link href="/licenses" className="relative block group cursor-pointer">
                <div className="relative w-64 sm:w-72 h-44 sm:h-48 flex items-center justify-center">
                  {/* Certificate 1 (Left Tilt) */}
                  <div className="absolute -left-2 sm:left-0 top-3 w-36 sm:w-40 h-40 bg-white rounded-lg border border-slate-200 shadow-md transform -rotate-12 group-hover:-rotate-16 transition-transform duration-300 p-2 overflow-hidden flex flex-col justify-between">
                    <div className="border border-slate-100 p-1.5 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                        <span className="text-[7px] font-bold text-slate-700 uppercase">GST REG-06</span>
                        <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                      </div>
                      <div className="space-y-1 my-auto">
                        <div className="w-3/4 h-1 bg-slate-200 rounded" />
                        <div className="w-full h-1 bg-slate-100 rounded" />
                        <div className="w-2/3 h-1 bg-slate-200 rounded" />
                      </div>
                      <div className="flex justify-between items-center text-[6px] text-slate-400">
                        <span>GSTIN ACTIVE</span>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate 2 (Right Tilt) */}
                  <div className="absolute right-0 sm:right-2 top-3 w-36 sm:w-40 h-40 bg-white rounded-lg border border-slate-200 shadow-md transform rotate-12 group-hover:rotate-16 transition-transform duration-300 p-2 overflow-hidden flex flex-col justify-between">
                    <div className="border border-slate-100 p-1.5 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                        <span className="text-[7px] font-bold text-slate-700 uppercase">BCDA LIFE MBR</span>
                        <div className="w-2 h-2 rounded-full bg-teal-500/50" />
                      </div>
                      <div className="space-y-1 my-auto">
                        <div className="w-full h-1 bg-slate-200 rounded" />
                        <div className="w-4/5 h-1 bg-slate-100 rounded" />
                        <div className="w-1/2 h-1 bg-slate-200 rounded" />
                      </div>
                      <div className="flex justify-between items-center text-[6px] text-slate-400">
                        <span>CHEMISTS ASSOC</span>
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-500/80" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate 3 (Center Main Card) */}
                  <div className="relative z-10 w-40 sm:w-44 h-44 bg-white rounded-lg border-2 border-emerald-500/30 shadow-xl transform group-hover:scale-105 transition-transform duration-300 p-2.5 flex flex-col justify-between">
                    <div className="border border-emerald-100 p-2 h-full flex flex-col justify-between bg-gradient-to-b from-emerald-50/20 to-white">
                      <div className="text-center space-y-0.5 border-b border-emerald-100 pb-1.5">
                        <div className="text-[7px] font-black text-slate-800 uppercase tracking-tight">
                          DRUG LICENSE FORM 20B/21B
                        </div>
                        <div className="text-[6px] text-emerald-700 font-semibold">
                          Govt. of Bihar • Drugs Directorate
                        </div>
                      </div>

                      <div className="space-y-1.5 my-auto text-center px-1">
                        <div className="text-[7px] font-bold text-slate-900">
                          Saurav Medical Agency
                        </div>
                        <div className="w-full h-0.5 bg-slate-200 rounded" />
                        <div className="text-[6px] text-slate-500 font-mono">
                          DL: 20B/BGP/XXXX • 21B/BGP/XXXX
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-[6px] text-emerald-800 font-bold">VERIFIED</span>
                        {/* Golden Emblem Seal */}
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-xs flex items-center justify-center">
                          <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Circular Green Shield Check Badge matching reference */}
                  <div className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 z-20 w-11 h-11 rounded-full bg-[#0f766e] text-white flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
