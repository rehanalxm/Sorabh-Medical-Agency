"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Quote,
  Award,
  CheckCircle2,
  Phone,
  Store,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function OwnerSection() {
  return (
    <section id="about" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80 bg-subtle-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
          <Badge variant="navy" className="uppercase tracking-widest text-[10px] px-2.5 py-0.5">
            About Us & Leadership
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1e36] tracking-tight">
            Trusted Medicine Wholesaler in Bhagalpur Since 2004
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Supplying local chemist shops, nursing homes, and clinics with genuine medicines, honest margins, and reliable daily delivery.
          </p>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Owner Photograph Covering Entire Div (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg group bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={COMPANY_DETAILS.ownerPhotoUrl}
                  alt={COMPANY_DETAILS.ownerName}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-100"
                  loading="lazy"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="bg-[#0b1e36]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-xs">
                    About the Founder
                  </span>
                  <span className="bg-teal-700/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs">
                    20+ Yrs Exp
                  </span>
                </div>

                {/* Light & Subtle Bottom Gradient Scrim (Leaves Face & Body Fully Bright) */}
                <div className="absolute bottom-0 inset-x-0 h-[42%] bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white z-10">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                    {COMPANY_DETAILS.ownerName}
                  </h3>
                  <p className="text-xs font-semibold text-teal-300 mt-0.5">
                    {COMPANY_DETAILS.role}
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Saurav Medical Agency • Kotwali Chowk, Bhagalpur
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-200">Wholesale Pharma Stockist</span>
                    <span className="text-[11px] text-teal-300 font-mono font-bold">EST. 2004</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact Strip */}
              <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span className="font-bold text-slate-800 font-mono">{COMPANY_DETAILS.phoneDisplay}</span>
                </div>
                <span className="text-slate-500 text-[11px]">Kotwali Chowk, Bhagalpur</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Founder&apos;s Message & Our Story
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0b1e36] tracking-tight">
                20 Years of Reliable Medicine Distribution
              </h3>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              Santosh Kumar established Saurav Medical Agency in 2004 at Kotwali Chowk, Bhagalpur. Over the past twenty years, we have built long-standing relationships with retail chemists and doctors by delivering genuine medicines with total transparency and honest pricing.
            </p>

            {/* Quote Callout */}
            <div className="relative rounded-xl bg-white border-l-4 border-[#0b1e36] p-4 sm:p-5 shadow-xs">
              <Quote className="w-6 h-6 text-slate-200 absolute top-3 right-3" />
              <p className="italic text-slate-800 text-xs sm:text-sm leading-relaxed">
                &ldquo;A medical store owner&apos;s reputation depends on the quality of medicines they dispense. Our job is simple: make sure every chemist gets genuine, fresh batch medicines on time, with proper GST bills and the best wholesale margins.&rdquo;
              </p>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#0b1e36] text-xs block">
                    {COMPANY_DETAILS.ownerName}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Proprietor, {COMPANY_DETAILS.name}
                  </span>
                </div>
                <div className="italic text-slate-600 text-xs border-b border-slate-300 px-3 py-0.5">
                  Santosh Kumar
                </div>
              </div>
            </div>

            {/* Core Commitments */}
            <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
              {[
                "20+ years of trusted wholesale service in Bhagalpur",
                "Direct supply lines with 21+ leading pharma companies",
                "Wide stock of Generics, Surgicals, Ayurvedic & OTC medicines",
                "Computerized GST bills and fast same-day local delivery",
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-200 bg-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium leading-tight">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button variant="primary" size="sm" asChild className="bg-[#0b1e36] text-xs font-bold">
                <Link href="/store" className="flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-teal-400" />
                  <span>Browse Wholesale Store</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
