"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TIMELINE_MILESTONES } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export function JourneySection() {
  return (
    <section id="journey" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
          <Badge variant="navy" className="uppercase tracking-widest text-[10px] px-2.5 py-0.5">
            Our History
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1e36] tracking-tight">
            Over 20 Years of Reliable Service in Bhagalpur
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            How Saurav Medical Agency grew from a local medicine supplier into a trusted wholesale partner for 200+ pharmacies and clinics.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-slate-200" />

          <div className="space-y-8 sm:space-y-10">
            {TIMELINE_MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex w-8 h-8 rounded-full bg-[#0b1e36] text-white items-center justify-center font-bold text-xs border-4 border-white shadow-sm z-10">
                    {idx + 1}
                  </div>

                  <div className="w-full lg:w-[46%]">
                    <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 hover:border-[#0b1e36]/30 hover:bg-white hover:shadow-card-hover transition-all duration-200">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono font-black text-lg text-[#0b1e36]">
                          {milestone.year}
                        </span>
                        <Badge
                          variant={milestone.phase === "Today" ? "accent" : "secondary"}
                          className="text-[10px] uppercase tracking-wide"
                        >
                          {milestone.phase}
                        </Badge>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                        {milestone.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {milestone.description}
                      </p>

                      <div className="space-y-1 pt-2.5 border-t border-slate-200/80">
                        {milestone.achievements.map((item, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
