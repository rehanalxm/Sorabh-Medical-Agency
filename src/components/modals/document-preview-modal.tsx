"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CredentialItem } from "@/lib/data";
import {
  FileText,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  Printer,
  ExternalLink,
  Lock,
} from "lucide-react";

interface DocumentPreviewModalProps {
  item: CredentialItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentPreviewModal({
  item,
  isOpen,
  onClose,
}: DocumentPreviewModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-slate-50 border-slate-300">
        {/* Top Notification Bar */}
        <div className="bg-[#0b1e36] text-white px-6 py-3.5 flex items-center justify-between text-xs tracking-wide">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-medium">Statutory Compliance Document Preview</span>
          </div>
          <span className="text-slate-300">Confidential / B2B Trade Record</span>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="navy">{item.category}</Badge>
              <Badge variant="accent" className="bg-teal-50 border-teal-300 text-teal-800">
                <CheckCircle2 className="w-3 h-3 text-teal-600 mr-1" />
                Verified Status
              </Badge>
            </div>
            <DialogTitle className="text-xl md:text-2xl text-[#0b1e36] font-bold">
              {item.title}
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              Official wholesale regulatory documentation placeholder for licensed pharmaceutical distribution.
            </DialogDescription>
          </DialogHeader>

          {/* Certificate Realistic Document Layout */}
          <div className="relative rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 md:p-8 shadow-sm certificate-pattern overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5 rotate-[-25deg]">
              <span className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-[#0b1e36]">
                OFFICIAL RECORD
              </span>
            </div>

            {/* Document Header */}
            <div className="border-b border-slate-200 pb-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#0b1e36]">
                  <Building2 className="w-5 h-5 text-[#0d9488]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Issuing Authority
                  </span>
                </div>
                <p className="font-semibold text-slate-900 text-sm md:text-base">
                  {item.issuingAuthority}
                </p>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Document Reference
                </span>
                <p className="font-mono text-xs md:text-sm font-semibold text-[#0b1e36] bg-slate-100 px-2.5 py-1 rounded border border-slate-200 inline-block">
                  {item.statusText}
                </p>
              </div>
            </div>

            {/* Document Content Grid */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm mb-6">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-slate-500 text-xs block mb-0.5">Registration / License Holder</span>
                <span className="font-semibold text-slate-900">M/s Sorabh Medical</span>
                <span className="text-slate-500 text-xs block mt-0.5">Wholesale Pharmaceutical Distributors</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="flex items-center gap-1 text-slate-500 text-xs mb-0.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Validity & Audit Cycle</span>
                </div>
                <span className="font-semibold text-slate-900">{item.validity}</span>
                <span className="text-emerald-700 text-xs font-medium block mt-0.5">● Current & Compliant</span>
              </div>
            </div>

            {/* Scope / Description */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Statutory Scope & Legal Authority
              </h4>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed bg-blue-50/40 p-4 rounded-lg border border-blue-100">
                {item.description}
              </p>
            </div>

            {/* Compliance Highlights */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Key Regulatory Highlights
              </h4>
              <ul className="grid sm:grid-cols-1 gap-2">
                {item.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Signatory & Security Footer in Document */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded border border-slate-300 bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-400">
                  QR/SEC
                </div>
                <div>
                  <p className="font-medium text-slate-700">Digital Record Token</p>
                  <p className="text-[11px] font-mono">SEC-VERIFIED-{item.id.toUpperCase()}</p>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="h-8 flex items-end justify-center sm:justify-end">
                  <span className="italic font-serif text-slate-600 text-sm border-b border-slate-400 px-4">
                    Authorized Signatory
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Drug Licensing & Quality Compliance Division</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <DialogFooter className="bg-white px-6 py-4 border-t border-slate-200 sm:justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FileText className="w-4 h-4 text-slate-400" />
            <span>Official digital preview strictly for authorized trade verifications.</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Printing preview placeholder: Official high-resolution document will be provided upon formal agency registration.")}
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print Record
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert("Verification file download placeholder: Real PDF certificates will be available in Phase 2.")}
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download Copy
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
