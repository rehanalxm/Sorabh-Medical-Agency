"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  Truck,
  Phone,
  Store,
  MapPin,
  FileCheck2,
  Sparkles,
  Award,
  Clock,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50/80 pt-4 pb-10 sm:pt-8 sm:pb-16 border-b border-slate-200/80">
      {/* Dynamic Animated Ambient Light Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-br from-teal-400/25 to-cyan-300/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -left-24 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/15 to-emerald-300/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-amber-200/20 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy, Highlights & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            {/* Headline with Radiant Gradient Accent */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-[#071529] leading-[1.12]">
                {COMPANY_DETAILS.name}
              </h1>
              <p className="text-base sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-teal-700 via-emerald-600 to-cyan-800 bg-clip-text text-transparent leading-snug">
                Reliable medicine supply for retail pharmacies and clinics.
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              Led by proprietor <strong className="text-slate-900 font-bold">{COMPANY_DETAILS.ownerName}</strong> since 2004.
              We supply 100% genuine generic medicines, hospital surgical items, Ayurvedic syrups, and daily healthcare products directly to local chemist shops with honest wholesale PTR rates and fast local delivery.
            </p>

            {/* 3-Item Color Gradient Micro-Grid (Highlighting Value on Mobile & Desktop) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
              <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 p-2.5 sm:p-3 rounded-xl border border-emerald-200/80 shadow-2xs text-center sm:text-left">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center mx-auto sm:mx-0 mb-1 shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">100% Genuine</p>
                <p className="text-[10px] text-emerald-800 font-semibold hidden sm:block">Batch Tested</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50/50 p-2.5 sm:p-3 rounded-xl border border-cyan-200/80 shadow-2xs text-center sm:text-left">
                <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center mx-auto sm:mx-0 mb-1 shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">21+ Depots</p>
                <p className="text-[10px] text-cyan-800 font-semibold hidden sm:block">Direct Brands</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50/50 p-2.5 sm:p-3 rounded-xl border border-amber-200/80 shadow-2xs text-center sm:text-left">
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center mx-auto sm:mx-0 mb-1 shadow-xs">
                  <Truck className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">Same-Day</p>
                <p className="text-[10px] text-amber-800 font-semibold hidden sm:block">Fast Dispatch</p>
              </div>
            </div>

            {/* Visiting Address Bar (Glassmorphic) */}
            <div className="p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 hover:border-teal-400 text-xs text-slate-700 flex items-start gap-3 shadow-xs transition-all">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0b1e36] to-teal-800 text-teal-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-extrabold text-slate-900 block text-xs">
                  Agency Trade Location
                </span>
                <span className="text-slate-600 text-[11px] leading-relaxed block mt-0.5">
                  {COMPANY_DETAILS.address}
                </span>
              </div>
            </div>

            {/* Radiant Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="lg"
                className="group shadow-md hover:shadow-lg text-xs sm:text-sm font-black bg-gradient-to-r from-[#0b1e36] via-[#123158] to-teal-800 hover:from-teal-800 hover:to-[#0b1e36] text-white h-12 rounded-xl transition-all active:scale-[0.98] border border-teal-500/30"
                asChild
              >
                <Link href="/store" className="flex items-center justify-center gap-2">
                  <Store className="w-4 h-4 text-teal-300 group-hover:scale-110 transition-transform" />
                  <span>Open Wholesale Store</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-xs sm:text-sm border-2 border-emerald-600/40 hover:border-emerald-600 bg-white hover:bg-emerald-50/70 text-emerald-800 font-bold h-12 rounded-xl transition-all active:scale-[0.98] shadow-xs"
                asChild
              >
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Order on WhatsApp / Call</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Owner Profile with Dynamic Float Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Decorative Gradient Ring Around Card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />

              {/* Outer Card with Full Cover Image */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/80 shadow-2xl group bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={COMPANY_DETAILS.ownerPhotoUrl}
                  alt={COMPANY_DETAILS.ownerName}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95"
                  loading="eager"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="bg-[#071529]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-teal-500/40 shadow-xs flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-teal-400" />
                    Proprietor Profile
                  </span>
                  <span className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs">
                    EST. 2004
                  </span>
                </div>

                {/* Bottom Gradient Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col justify-end p-5 text-white z-10">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                    {COMPANY_DETAILS.ownerName}
                  </h3>
                  <p className="text-xs font-bold text-teal-300 mt-0.5">
                    {COMPANY_DETAILS.role}
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Saurav Medical Agency • Bhagalpur
                  </p>

                  <div className="mt-3.5 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-200 flex items-center gap-1.5 font-medium">
                      <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
                      Form 20B/21B Licensed
                    </span>
                    <span className="text-[11px] text-amber-300 font-mono font-bold">
                      20+ Yrs Trust
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Live Phone Strip */}
              <div className="mt-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 flex items-center justify-between text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#0b1e36] to-teal-800 text-white flex items-center justify-center font-bold text-xs">
                    20+
                  </div>
                  <span className="font-bold text-slate-800">Years in Wholesale Supply</span>
                </div>
                <span className="text-teal-700 font-bold font-mono text-[11px]">
                  {COMPANY_DETAILS.phoneDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
