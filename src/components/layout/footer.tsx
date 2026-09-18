"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Lock,
  ExternalLink,
  Store,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1e36] text-slate-300 border-t border-slate-800 text-xs pb-16 md:pb-0 print:hidden">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 flex items-center justify-center shadow border border-teal-400 shrink-0">
                <img
                  src="/logo.png"
                  alt={COMPANY_DETAILS.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block leading-tight">
                  {COMPANY_DETAILS.name}
                </span>
                <span className="text-[10px] text-teal-400 uppercase font-semibold tracking-wider block">
                  Wholesale Pharmaceutical Distributors
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed pr-4">
              Dedicated wholesale pharmaceutical distribution agency providing 100% genuine batch-tested formulations, sterile surgical consumables, Ayurvedic syrups, and OTC healthcare essentials to licensed retail chemists and hospitals.
            </p>

            {/* Live Google Maps Location Embed */}
            <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-md">
              <div className="p-2 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-teal-400 font-semibold text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Live Agency Location • Bhagalpur</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kotwali+Chowk+Bhagalpur+Bihar+812002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-teal-300 hover:text-white flex items-center gap-1 font-medium underline"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* Responsive Google Maps Iframe */}
              <iframe
                title="Sorabh Medical Agency Live Location"
                src="https://maps.google.com/maps?q=Kotwali+Chowk,+Bhagalpur,+Bihar+812002&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full opacity-90 hover:opacity-100 transition-opacity"
              />

              <div className="p-2 bg-slate-950/80 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
                <span className="truncate pr-2">{COMPANY_DETAILS.address}</span>
                <span className="text-teal-400 font-mono shrink-0">EST. 2004</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home / Profile
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-teal-400 font-semibold hover:text-teal-300 transition-colors flex items-center gap-1">
                  <Store className="w-3.5 h-3.5" />
                  <span>Wholesale Store</span>
                </Link>
              </li>
              <li>
                <Link href="/#credentials" className="hover:text-white transition-colors">
                  Licenses & Trust
                </Link>
              </li>
              <li>
                <Link href="/#brands" className="hover:text-white transition-colors">
                  21+ Partner Brands
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Retailer Account
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 text-[11px] pt-1">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Staff Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Wholesale Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                Wholesale Lines
              </h4>
              <Badge variant="accent" className="text-[9px] px-1.5 py-0 bg-teal-900/60 text-teal-300 border-teal-700">
                Bulk Supply
              </Badge>
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>Generic Formulations</span>
                <span className="text-[10px] text-teal-400">Alkem, Cipla, Lupin</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sterile Surgical Disposables</span>
                <span className="text-[10px] text-slate-500">Syringes, Gloves, IV Sets</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Ayurvedic Tonics & Oils</span>
                <span className="text-[10px] text-slate-500">Torque, Lee Ford</span>
              </li>
              <li className="flex items-center justify-between">
                <span>OTC Counter Products</span>
                <span className="text-[10px] text-slate-500">Mankind, Abbott</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Antibiotics & Injectables</span>
                <span className="text-[10px] text-slate-500">Biochem, Aristo</span>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Wholesale Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.mobile}`} className="text-white font-bold hover:underline font-mono">
                  {COMPANY_DETAILS.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{COMPANY_DETAILS.email}</span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Disclaimer & Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-[#071424] py-5 text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left space-y-0.5">
            <p className="text-slate-400">
              © {currentYear} {COMPANY_DETAILS.name}. All rights reserved. Wholesale Pharmaceutical Distributor.
            </p>
            <p className="text-[10px] text-slate-600">
              Notice: Supplies strictly restricted to registered chemists possessing a valid Drug License (Form 20/21 or institutional hospital permit).
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 shrink-0 text-xs font-medium">
            <span>Built with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>by</span>
            <a
              href="https://techiedox.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-2 transition-colors flex items-center gap-1"
            >
              <span>TechieDox</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
