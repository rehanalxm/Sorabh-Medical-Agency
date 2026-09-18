"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStoredOrders, OrderRecord } from "@/lib/store";
import { COMPANY_DETAILS } from "@/lib/data";
import {
  Printer,
  ArrowLeft,
  Share2,
} from "lucide-react";

export default function InvoicePage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    const orderId = params?.id as string;
    if (orderId) {
      const orders = getStoredOrders();
      const found = orders.find((o) => o.id === orderId);
      if (found) {
        setOrder(found);
      }
    }
  }, [params]);

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!order) return;
    const invoiceUrl = typeof window !== "undefined" ? window.location.href : "";
    const itemsSummary = order.items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* (${item.company}) — Qty: ${item.quantity} [₹${item.total.toFixed(2)}]`
      )
      .join("\n");

    const message =
      `📄 *WHOLESALE TAX INVOICE — SAURAV MEDICAL AGENCY*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Invoice No:* ${order.id}\n` +
      `*Date:* ${order.orderDate}\n` +
      `*Billed To:* ${order.customer.pharmacyName}\n` +
      `*Attn:* ${order.customer.chemistName} (${order.customer.mobile})\n` +
      `*Drug License:* ${order.customer.dlNumber || "Verified"}\n` +
      `*Payment Mode:* ${order.paymentMethod === "COD" ? "Cash on Delivery" : "Instant UPI"} (${order.paymentStatus})\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*DISPATCHED ITEMS:*\n${itemsSummary}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Final Invoice Total:* ₹${order.totalAmount.toFixed(2)}\n\n` +
      `🔗 *Tap to View / Print Legal Bill:* \n${invoiceUrl}\n\n` +
      `_Saurav Medical Agency • Kotwali Chowk, Bhagalpur_\n` +
      `_Phone/Orders: +91 7070605245_`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-lg font-bold text-slate-800">Tax Invoice Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Looking for Invoice ID: {params?.id as string}
        </p>
        <Button variant="primary" size="sm" asChild>
          <Link href="/account">View All Orders</Link>
        </Button>
      </div>
    );
  }

  const halfTax = (order.gstAmount / 2).toFixed(2);

  return (
    <>
      {/* Strict 1-Page A4 Print Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 8mm;
          }
          html,
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-single-page {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 8px !important;
            padding: 12px 16px !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-100 py-4 sm:py-8 pb-28 md:pb-12 print:bg-white print:py-0 print:pb-0">
        {/* Top Action Bar (Hidden during Print) */}
        <div className="max-w-4xl mx-auto px-4 mb-4 sm:mb-6 print:hidden flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0b1e36] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Purchase History</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Share on WhatsApp Button */}
            <Button
              onClick={handleShareWhatsApp}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-xs transition-all active:scale-95"
            >
              {/* WhatsApp Icon */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.83 2.42-1.45 0-2.87-.38-4.12-1.12l-.3-.18-3.07.81.82-2.99-.19-.31a8.17 8.17 0 0 1-1.26-4.47c0-4.55 3.7-8.24 8.25-8.24m4.52 11.5c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.13.17 1.73 2.64 4.19 3.7 1.15.5 2.05.69 2.76.84.58.12 1.34.05 1.84-.03.56-.08 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
              </svg>
              <span>Share on WhatsApp</span>
            </Button>

            {/* Print / Save PDF Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              className="bg-[#0b1e36] hover:bg-[#163b65] text-white flex items-center gap-1.5 shadow-sm text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </Button>
          </div>
        </div>

        {/* Main 1-Page A4 Tax Invoice Card */}
        <div className="invoice-single-page max-w-4xl mx-auto bg-white border border-slate-300 shadow-sm p-4 sm:p-8 rounded-xl print:shadow-none print:border print:border-slate-300 print:p-3 print:rounded-lg print:max-w-none text-slate-900 text-xs">
          {/* Invoice Header */}
          <div className="border-b-2 border-slate-900 pb-3 mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <img
                  src="/logo.png"
                  alt={COMPANY_DETAILS.name}
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0"
                />
                <span className="text-lg sm:text-2xl font-black tracking-tight text-[#0b1e36]">
                  {COMPANY_DETAILS.name}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-700">
                {COMPANY_DETAILS.tagline}
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">
                {COMPANY_DETAILS.address}
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-600">
                <strong>Phone:</strong> {COMPANY_DETAILS.phoneDisplay} • <strong>Email:</strong> {COMPANY_DETAILS.email}
              </p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-mono mt-0.5">
                {COMPANY_DETAILS.dlPlaceholder} | {COMPANY_DETAILS.gstinPlaceholder}
              </p>
            </div>

            <div className="sm:text-right border-l sm:border-l-0 pl-3 sm:pl-0 shrink-0">
              <span className="inline-block bg-[#0b1e36] text-white font-black uppercase tracking-widest text-[9px] sm:text-[10px] px-2.5 py-1 rounded">
                WHOLESALE TAX INVOICE
              </span>
              <div className="mt-1.5 space-y-0.5 text-[11px]">
                <p className="font-mono">
                  <span className="text-slate-500">Invoice No:</span>{" "}
                  <strong className="text-slate-900 font-bold">{order.id}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Date:</span>{" "}
                  <strong className="text-slate-800">{order.orderDate}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Payment:</span>{" "}
                  <span className="font-bold text-emerald-800">
                    {order.paymentMethod === "COD" ? "Cash on Delivery" : "Instant UPI"} ({order.paymentStatus})
                  </span>
                </p>
                {order.utrNumber && (
                  <p className="font-mono text-[10px] text-slate-500">
                    Ref/UTR: {order.utrNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Billed Chemist Customer Details */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 mb-3 grid sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                BILLED TO (RETAIL CHEMIST / BUYER):
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 mt-0.5">
                {order.customer.pharmacyName}
              </h4>
              <p className="text-slate-700 text-[11px]">
                Attn: {order.customer.chemistName}
              </p>
              <p className="text-slate-600 text-[10px] sm:text-[11px]">
                {order.customer.address}
              </p>
            </div>

            <div className="sm:text-right space-y-0.5 text-[11px]">
              <p>
                <span className="text-slate-500">Mobile:</span>{" "}
                <strong className="font-mono text-slate-800">{order.customer.mobile}</strong>
              </p>
              <p>
                <span className="text-slate-500">Drug License:</span>{" "}
                <strong className="font-mono text-slate-800">{order.customer.dlNumber || "DL-20B/Verified"}</strong>
              </p>
              <p>
                <span className="text-slate-500">Chemist GSTIN:</span>{" "}
                <strong className="font-mono text-slate-800">{order.customer.gstin || "Unregistered Retailer"}</strong>
              </p>
            </div>
          </div>

          {/* Itemized Medicine Table */}
          <div className="border border-slate-300 rounded-lg overflow-x-auto mb-3">
            <table className="w-full text-left border-collapse text-[10px] sm:text-[11px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                  <th className="p-1.5 sm:p-2 border-r border-slate-300 w-6 text-center">#</th>
                  <th className="p-1.5 sm:p-2 border-r border-slate-300">Description of Formulation</th>
                  <th className="p-1.5 sm:p-2 border-r border-slate-300">Company</th>
                  <th className="p-1.5 sm:p-2 border-r border-slate-300 text-center">HSN</th>
                  <th className="p-1.5 sm:p-2 border-r border-slate-300">Batch / Exp</th>
                  <th className="p-1.5 sm:p-2 border-r border-slate-300 text-center">Pack</th>
                  <th className="p-1.5 sm:p-2 border-r border-slate-300 text-center">Qty</th>
                  <th className="p-1.5 sm:p-2 border-r border-slate-300 text-right">MRP</th>
                  <th className="p-1.5 sm:p-2 border-r border-slate-300 text-right">Rate (PTR)</th>
                  <th className="p-1.5 sm:p-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50/50">
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 text-center font-mono">{idx + 1}</td>
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 font-semibold text-slate-900">{item.name}</td>
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 text-slate-700">{item.company}</td>
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 text-center font-mono text-slate-600">{item.hsnCode}</td>
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 font-mono text-[9px] sm:text-[10px] text-slate-600">
                      {item.batchNo} • {item.expDate}
                    </td>
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 text-center text-slate-600">{item.packSize}</td>
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 text-center font-bold text-slate-900">{item.quantity}</td>
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 text-right font-mono text-slate-500">{item.mrp}</td>
                    <td className="p-1.5 sm:p-2 border-r border-slate-200 text-right font-mono font-semibold text-slate-800">
                      {item.wholesalePrice}
                    </td>
                    <td className="p-1.5 sm:p-2 text-right font-mono font-bold text-slate-900">{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation & Tax Summary */}
          <div className="grid sm:grid-cols-2 gap-3 items-start mb-4">
            <div className="space-y-1.5 text-[10px] sm:text-[11px]">
              <div className="p-2 rounded border border-slate-200 bg-slate-50 space-y-0.5">
                <span className="font-bold text-slate-700 block">Terms & Wholesale Conditions:</span>
                <p className="text-slate-600 leading-normal text-[9px] sm:text-[10px]">
                  1. Inspect batch verification and seals upon consignment receipt.
                  <br />
                  2. Expiry and breakage claims handled strictly per manufacturer return policy.
                  <br />
                  3. Subject to Bhagalpur Jurisdiction only.
                </p>
              </div>
              <p className="text-slate-500 text-[10px]">
                <strong>Total Items:</strong> {order.items.length} Formulations
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Subtotal (Taxable Value):</span>
                <span className="font-mono font-bold text-slate-900">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-[10px]">
                <span>CGST (6%):</span>
                <span className="font-mono">₹{halfTax}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-[10px]">
                <span>SGST (6%):</span>
                <span className="font-mono">₹{halfTax}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Total GST (12%):</span>
                <span className="font-mono font-semibold text-slate-800">₹{order.gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Local Delivery:</span>
                <span className="font-bold text-emerald-700">₹0.00 (FREE)</span>
              </div>
              <div className="pt-1.5 border-t-2 border-slate-900 flex justify-between text-xs sm:text-sm font-black text-[#0b1e36]">
                <span>Final Invoice Total:</span>
                <span className="font-mono text-sm sm:text-base">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="mt-4 pt-3 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <p className="font-mono text-[9px] sm:text-[10px] text-slate-400">
                Computer Generated B2B Tax Invoice • E-Way Bill Ready
              </p>
              <p className="text-[10px] sm:text-[11px] text-teal-800 font-bold mt-0.5">
                ✓ Verified Wholesale Supply
              </p>
            </div>

            <div className="text-center sm:text-right">
              <div className="h-6 flex items-end justify-center sm:justify-end">
                <span className="italic font-serif text-slate-800 text-xs sm:text-sm border-b border-slate-400 px-4">
                  Santosh Kumar
                </span>
              </div>
              <p className="font-bold text-slate-900 mt-1 text-[11px]">
                For {COMPANY_DETAILS.name}
              </p>
              <p className="text-[9px] sm:text-[10px] text-slate-500">
                Authorized Signatory / Proprietor
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
