"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentPreviewModal } from "@/components/modals/document-preview-modal";
import { CREDENTIALS_DATA, CredentialItem } from "@/lib/data";
import {
  FileText,
  ShieldCheck,
  Award,
  Building2,
  CheckCircle2,
  Eye,
  Lock,
} from "lucide-react";

export function CredentialsSection() {
  const [selectedDoc, setSelectedDoc] = useState<CredentialItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenDoc = (item: CredentialItem) => {
    setSelectedDoc(item);
    setModalOpen(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Drug License":
        return <ShieldCheck className="w-4 h-4 text-teal-600" />;
      case "Tax & Registration":
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case "Quality Standard":
        return <Award className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <section id="credentials" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
          <Badge variant="navy" className="uppercase tracking-widest text-[10px] px-2.5 py-0.5">
            Legal & Tax Compliance
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1e36] tracking-tight">
            Official Drug Licenses & Registrations
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Every medicine order is backed by active Bihar government drug licenses, valid GST tax registration, and ethical wholesale standards.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREDENTIALS_DATA.map((item) => (
            <Card
              key={item.id}
              className="border border-slate-200/90 bg-white hover:border-[#0b1e36] hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden rounded-2xl"
            >
              <CardHeader className="p-4 sm:p-5 pb-3">
                {/* Certificate Visual Header Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    {item.statusText}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                  {item.category}
                </span>

                <CardTitle className="text-sm sm:text-base text-[#0b1e36] font-bold leading-snug">
                  {item.title}
                </CardTitle>

                <p className="text-[11px] text-slate-500 font-medium">
                  {item.issuingAuthority}
                </p>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 pt-0 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {item.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="truncate">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-xs border-slate-200 hover:border-[#0b1e36] hover:bg-slate-50 text-slate-800 font-semibold h-8 rounded-lg"
                    onClick={() => handleOpenDoc(item)}
                  >
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>View Certificate</span>
                    </span>
                    <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded">
                      Preview
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wholesale Compliance Assurance Bar */}
        <div className="mt-8 rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0b1e36] text-white shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-xs sm:text-sm">
                Wholesale Sales to Licensed Chemist Stores Only
              </p>
              <p className="text-slate-500 text-[11px]">
                In accordance with state drugs control laws, we sell strictly to registered pharmacies and licensed medical practitioners.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-teal-700 font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
            Form 20B/21B Active
          </span>
        </div>
      </div>

      {/* Document Lightbox Modal */}
      <DocumentPreviewModal
        item={selectedDoc}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
