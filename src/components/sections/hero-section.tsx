"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  Truck,
  Phone,
  UserCheck,
  FileCheck2,
  Store,
  MapPin,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200/80 bg-subtle-dots">
      {/* Background Subtle Gradient Highlights */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-50/70 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-100/80 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            {/* Top Wholesale Classification Tag */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span className="text-[#0b1e36] font-bold">Wholesale Medicine Distributor</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-normal">Bhagalpur, Bihar</span>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0b1e36] leading-[1.15]">
                {COMPANY_DETAILS.name}
              </h1>
              <p className="text-base sm:text-xl font-bold text-teal-700">
                Reliable medicine supply for retail pharmacies and clinics.
              </p>
            </div>

            {/* Supporting Text in Simple Natural English */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
              Led by proprietor <strong className="text-slate-900">{COMPANY_DETAILS.ownerName}</strong> since 2004.
              We supply 100% genuine generic medicines, hospital surgical items, Ayurvedic syrups, and daily healthcare products directly to local chemist shops with honest wholesale rates and fast local delivery.
            </p>

            {/* Visiting Address Bar */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 shadow-xs">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Trade Location: </span>
                <span>{COMPANY_DETAILS.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="lg"
                className="group shadow-sm hover:shadow text-xs sm:text-sm font-bold bg-[#0b1e36] hover:bg-[#163b65] h-11"
                asChild
              >
                <Link href="/store" className="flex items-center justify-center gap-2">
                  <Store className="w-4 h-4 text-teal-400" />
                  <span>Open Wholesale Store</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-xs sm:text-sm border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold h-11"
                asChild
              >
                <a href={COMPANY_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Order on WhatsApp / Call</span>
                </a>
              </Button>
            </div>

            {/* Trust Anchors */}
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium text-slate-700">100% Genuine Medicines</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium text-slate-700">21+ Direct Pharma Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium text-slate-700">Same-Day Local Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Owner Profile (Covering Entire Div with Image) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Outer Card with Full Cover Image */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg group bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={COMPANY_DETAILS.ownerPhotoUrl}
                  alt={COMPANY_DETAILS.ownerName}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95"
                  loading="eager"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="bg-[#0b1e36]/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-xs">
                    Proprietor Profile
                  </span>
                  <span className="bg-teal-700/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs">
                    EST. 2004
                  </span>
                </div>

                {/* Bottom Gradient Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-5 text-white z-10">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                    {COMPANY_DETAILS.ownerName}
                  </h3>
                  <p className="text-xs font-semibold text-teal-300 mt-0.5">
                    {COMPANY_DETAILS.role}
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Sorabh Medical Agency • Bhagalpur
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-200 flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
                      Form 20B/21B Licensed
                    </span>
                    <span className="text-[11px] text-teal-300 font-mono font-bold">
                      20+ Yrs Trust
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Quick Bar */}
              <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#0b1e36] text-white flex items-center justify-center font-bold text-xs">
                    20+
                  </div>
                  <span className="font-semibold text-slate-800">Years in Wholesale Supply</span>
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
