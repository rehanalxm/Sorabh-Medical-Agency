"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pill,
  ThermometerSnowflake,
  HeartPulse,
  Syringe,
  Boxes,
  Layers,
  ArrowRight,
  Lock,
  Store,
} from "lucide-react";

interface CategoryCard {
  id: string;
  name: string;
  count: string;
  description: string;
  topBrands: string;
  icon: React.ReactNode;
  tag?: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "tablets",
    name: "TABLETS & CAPSULES",
    count: "Everyday medicines",
    description: "Antibiotics, fever medicines, painkillers, cardiac, diabetes & acidity tablets.",
    topBrands: "Alkem, Cipla, Mankind, Aristo",
    icon: <Pill className="w-5 h-5 text-teal-600" />,
    tag: "High Demand",
  },
  {
    id: "injections",
    name: "INJECTIONS & VIALS",
    count: "Hospital & clinical use",
    description: "Ceatriaxone, Amikacin, Diclofenac ampoules, tetanus toxoid, and emergency injectables.",
    topBrands: "Biochem, Alkem, Cipla",
    icon: <Syringe className="w-5 h-5 text-blue-600" />,
  },
  {
    id: "surgical",
    name: "SURGICAL & DISPOSABLES",
    count: "Medical & surgical supplies",
    description: "Sterile disposable syringes, latex examination gloves, IV sets, gauze, and surgical cotton.",
    topBrands: "Safeone, Romson, Dispovan",
    icon: <Boxes className="w-5 h-5 text-purple-600" />,
    tag: "Bulk Cartons",
  },
  {
    id: "syrups",
    name: "HEALTHCARE & SYRUPS",
    count: "Everyday healthcare products",
    description: "Cough syrups, paracetamol suspensions, digestive enzymes, and calcium syrups.",
    topBrands: "Torque, Aristo, Abbott",
    icon: <HeartPulse className="w-5 h-5 text-red-600" />,
  },
  {
    id: "cold-chain",
    name: "COLD STORAGE (2°C – 8°C)",
    count: "Temperature controlled",
    description: "Insulins, vaccines, and biological injections preserved in dedicated medical refrigerators.",
    topBrands: "Abbott, Biocon, Lupin",
    icon: <ThermometerSnowflake className="w-5 h-5 text-cyan-600" />,
    tag: "Cool Storage",
  },
  {
    id: "otc",
    name: "AYURVEDIC & OTC ITEMS",
    count: "Daily counter items",
    description: "Pain relief balms, antiseptic creams, inhalers, glucose, and energy drinks.",
    topBrands: "Mankind, Dabur, Lee Ford",
    icon: <Layers className="w-5 h-5 text-amber-600" />,
  },
];

export function ProductsPreviewSection() {
  return (
    <section id="products" className="py-12 sm:py-16 bg-slate-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="navy" className="uppercase tracking-widest text-[10px] px-2.5 py-0.5">
                Product Lines
              </Badge>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                10,000+ Ready Formulations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b1e36] tracking-tight">
              Everything Your Medical Store Needs, In One Place
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Wholesale medicines and supplies sourced directly from company depots with verified batches and prompt delivery.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#0b1e36] hover:bg-[#163b65] text-white text-xs font-bold shadow-sm"
              asChild
            >
              <Link href="/store" className="flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-teal-400" />
                <span>Open Wholesale Store</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div id="categories" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => (
            <Card
              key={category.id}
              className="border border-slate-200 bg-white hover:border-[#0b1e36] hover:shadow-md transition-all duration-200 flex flex-col justify-between group rounded-2xl"
            >
              <CardHeader className="p-4 sm:p-5 pb-2">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform">
                    {category.icon}
                  </div>
                  {category.tag ? (
                    <Badge variant="accent" className="text-[10px] font-bold">
                      {category.tag}
                    </Badge>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">
                      {category.count}
                    </span>
                  )}
                </div>

                <CardTitle className="text-sm sm:text-base font-black text-[#0b1e36] group-hover:text-teal-700 transition-colors">
                  {category.name}
                </CardTitle>

                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {category.description}
                </p>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 pt-0 space-y-3">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">
                    Key Companies
                  </span>
                  <span className="font-semibold text-slate-800 text-[11px]">{category.topBrands}</span>
                </div>

                <div className="pt-1">
                  <Link
                    href={`/store?cat=${category.id}`}
                    className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-[#0b1e36] hover:text-teal-600 transition-colors border-t border-slate-100"
                  >
                    <span>Browse Products</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk Scheme Notice Banner */}
        <div id="offers" className="mt-8 rounded-2xl bg-[#0b1e36] text-white p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-900/80 border border-teal-700 text-teal-300 text-[10px] font-bold">
              <Lock className="w-3 h-3" />
              <span>Special Chemist Schemes</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              Need Bulk Carton Schemes & Bonus Offers?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Get direct wholesale slab rates and bonus schemes (10+1 free) on full box orders for your medical store.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="accent"
              size="default"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
              asChild
            >
              <Link href="/store">View Active Offers</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
