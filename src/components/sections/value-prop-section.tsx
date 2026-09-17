"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VALUE_PROPOSITIONS } from "@/lib/data";
import {
  ShieldCheck,
  ThermometerSnowflake,
  TrendingDown,
  Truck,
  FileCheck2,
  Handshake,
} from "lucide-react";

export function ValuePropSection() {
  const renderIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case "ThermometerSnowflake":
        return <ThermometerSnowflake className="w-5 h-5 text-teal-600" />;
      case "TrendingDown":
        return <TrendingDown className="w-5 h-5 text-teal-600" />;
      case "Truck":
        return <Truck className="w-5 h-5 text-teal-600" />;
      case "FileCheck2":
        return <FileCheck2 className="w-5 h-5 text-teal-600" />;
      case "Handshake":
        return <Handshake className="w-5 h-5 text-teal-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="why-partner" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
          <Badge variant="navy" className="uppercase tracking-widest text-[10px] px-2.5 py-0.5">
            Why Choose Us
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1e36] tracking-tight">
            Why Medical Stores Trust Sorabh Medical Agency
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Everything your pharmacy needs to run smoothly: 100% genuine medicines, good margins, fast delivery, and honest bills.
          </p>
        </div>

        {/* 6 Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {VALUE_PROPOSITIONS.map((prop, idx) => (
            <Card
              key={idx}
              className="border border-slate-200 bg-white hover:border-[#0b1e36]/30 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
            >
              <CardHeader className="p-4 sm:p-5 pb-2">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                    {renderIcon(prop.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-xs text-[#0b1e36] block font-mono">
                      {prop.metric}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">
                      {prop.metricLabel}
                    </span>
                  </div>
                </div>

                <CardTitle className="text-sm sm:text-base font-bold text-[#0b1e36] leading-snug">
                  {prop.title}
                </CardTitle>

                <p className="text-xs font-semibold text-[#0d9488] tracking-wide mt-0.5">
                  {prop.tagline}
                </p>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 pt-0">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {prop.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
