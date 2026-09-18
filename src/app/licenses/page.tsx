"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentPreviewModal } from "@/components/modals/document-preview-modal";
import { CREDENTIALS_DATA, CredentialItem, COMPANY_DETAILS } from "@/lib/data";
import {
  ShieldCheck,
  Building2,
  Award,
  FileText,
  FileCheck2,
  ExternalLink,
  Printer,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Phone,
  Store,
} from "lucide-react";

export default function LicensesPage() {
  const [selectedDoc, setSelectedDoc] = useState<CredentialItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenDoc = (item: CredentialItem) => {
    setSelectedDoc(item);
    setModalOpen(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Drug License":
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case "Tax & Registration":
        return <Building2 className="w-5 h-5 text-teal-600" />;
      case "Quality Standard":
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-28 md:pb-16 pt-3 sm:pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium min-w-0">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="font-bold text-[#0b1e36] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Statutory Licenses & Certificates
            </span>
          </div>
          <Link
            href="/store"
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>Visit Store</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hero Header Banner */}
        <div className="bg-gradient-to-br from-[#071529] via-[#0d2342] to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-teal-500/20">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Government Verified Wholesale Distributor</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Official Drug Licenses & GST Credentials
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every pharmaceutical distribution through {COMPANY_DETAILS.name} is strictly governed under the Drugs and Cosmetics Act, 1940 and GST Tax Laws. All formulations are genuine, temperature-maintained, and billed with 100% ITC compliance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-teal-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Form 20B & 21B Active
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Valid Regular GSTIN
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                BCDA Life Member
              </span>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CREDENTIALS_DATA.map((item) => (
            <Card
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Certificate Header Strip */}
                <div className="bg-gradient-to-r from-slate-50 via-teal-50/30 to-emerald-50/40 p-4 border-b border-slate-100 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                        {item.category}
                      </span>
                      <h2 className="text-base font-bold text-[#0b1e36] leading-snug">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold border-emerald-200 shrink-0">
                    {item.statusText}
                  </Badge>
                </div>

                {/* Certificate Details */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 font-mono text-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-sans font-semibold">
                        Registration Identifier
                      </span>
                      <span className="font-bold text-[#0b1e36]">
                        {item.regNumberPlaceholder}
                      </span>
                    </div>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-sans font-medium">
                      {item.validity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                      Statutory Highlights
                    </span>
                    {item.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500">
                  Authority: <strong>{item.issuingAuthority}</strong>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDoc(item)}
                  className="text-xs font-bold border-teal-600/30 text-teal-800 hover:bg-teal-50 shadow-xs h-8 px-3 flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Inspect Document</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Physical Premises Verification Box */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-extrabold text-[#0b1e36]">
              Need Official Certified Copies for Chemist Onboarding?
            </h3>
            <p className="text-xs text-slate-600">
              We provide self-attested copies of Form 20B, 21B, and GST registration directly on WhatsApp or during trade visits.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs font-bold border-slate-300 text-slate-800"
            >
              <Link href="/store">
                <Store className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                Wholesale Store
              </Link>
            </Button>
            <Button
              variant="accent"
              size="sm"
              asChild
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
            >
              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Request Copies
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Document Preview Lightbox Modal */}
      <DocumentPreviewModal
        item={selectedDoc}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
