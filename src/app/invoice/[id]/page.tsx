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
  Store,
  ReceiptText,
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

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-lg font-bold text-slate-800">Tax Invoice Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Looking for Invoice ID: {params?.id as string}
        </p>
        <Button variant="primary" size="sm" asChild>
          <Link href="/orders">View All Orders</Link>
        </Button>
      </div>
    );
  }

  const halfTax = (order.gstAmount / 2).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-100 py-4 sm:py-8 pb-28 md:pb-12 print:bg-white print:py-0">
      {/* Top Action Bar (Hidden during Print) */}
      <div className="max-w-4xl mx-auto px-4 mb-4 sm:mb-6 print:hidden flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0b1e36]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Purchase History</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/store"
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Order More
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            className="bg-[#0b1e36] text-white flex items-center gap-1.5 shadow-sm text-xs font-bold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </Button>
        </div>
      </div>

      {/* Main A4 Tax Invoice Container */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-300 shadow-sm p-4 sm:p-10 rounded-xl print:shadow-none print:border-0 print:p-2 print:rounded-none print:max-w-none text-slate-900 text-xs">
        {/* Invoice Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <img
                src="/logo.png"
                alt={COMPANY_DETAILS.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0"
              />
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b1e36]">
                {COMPANY_DETAILS.name}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-700">
              {COMPANY_DETAILS.tagline}
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              {COMPANY_DETAILS.address}
            </p>
            <p className="text-[11px] text-slate-600">
              <strong>Phone:</strong> {COMPANY_DETAILS.mobile} • <strong>Email:</strong> {COMPANY_DETAILS.email}
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              {COMPANY_DETAILS.dlPlaceholder} | {COMPANY_DETAILS.gstinPlaceholder}
            </p>
          </div>

          <div className="sm:text-right border-l sm:border-l-0 pl-3 sm:pl-0">
            <span className="inline-block bg-[#0b1e36] text-white font-black uppercase tracking-widest text-[10px] sm:text-[11px] px-3 py-1 rounded">
              WHOLESALE TAX INVOICE
            </span>
            <div className="mt-2 space-y-0.5 text-xs">
              <p className="font-mono">
                <span className="text-slate-500">Invoice No:</span>{" "}
                <strong className="text-slate-900">{order.id}</strong>
              </p>
              <p>
                <span className="text-slate-500">Date:</span>{" "}
                <strong>{order.orderDate}</strong>
              </p>
              <p>
                <span className="text-slate-500">Payment:</span>{" "}
                <span className="font-bold text-teal-800">
                  {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online UPI / Razorpay"} ({order.paymentStatus})
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
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 mb-4 grid sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              Billed To (Retail Chemist / Buyer):
            </span>
            <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">
              {order.customer.pharmacyName}
            </h4>
            <p className="text-slate-700">
              Attn: {order.customer.chemistName}
            </p>
            <p className="text-slate-600 text-[11px]">
              {order.customer.address}
            </p>
          </div>

          <div className="sm:text-right space-y-0.5">
            <p>
              <span className="text-slate-500">Mobile:</span>{" "}
              <strong className="font-mono">{order.customer.mobile}</strong>
            </p>
            <p>
              <span className="text-slate-500">Drug License:</span>{" "}
              <strong className="font-mono">{order.customer.dlNumber || "N/A"}</strong>
            </p>
            <p>
              <span className="text-slate-500">Chemist GSTIN:</span>{" "}
              <strong className="font-mono">{order.customer.gstin || "N/A"}</strong>
            </p>
          </div>
        </div>

        {/* Itemized Medicine Table */}
        <div className="border border-slate-300 rounded-lg overflow-x-auto mb-4">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                <th className="p-2 border-r border-slate-300 w-7 text-center">#</th>
                <th className="p-2 border-r border-slate-300">Description of Formulation</th>
                <th className="p-2 border-r border-slate-300">Company</th>
                <th className="p-2 border-r border-slate-300">HSN</th>
                <th className="p-2 border-r border-slate-300">Batch / Exp</th>
                <th className="p-2 border-r border-slate-300 text-center">Pack</th>
                <th className="p-2 border-r border-slate-300 text-center">Qty</th>
                <th className="p-2 border-r border-slate-300 text-right">MRP</th>
                <th className="p-2 border-r border-slate-300 text-right">Rate (PTR)</th>
                <th className="p-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50/50">
                  <td className="p-2 border-r border-slate-200 text-center font-mono">{idx + 1}</td>
                  <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">{item.name}</td>
                  <td className="p-2 border-r border-slate-200 text-slate-700">{item.company}</td>
                  <td className="p-2 border-r border-slate-200 font-mono text-slate-600">{item.hsnCode}</td>
                  <td className="p-2 border-r border-slate-200 font-mono text-[10px] text-slate-600">
                    {item.batchNo} • {item.expDate}
                  </td>
                  <td className="p-2 border-r border-slate-200 text-center text-slate-600">{item.packSize}</td>
                  <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-900">{item.quantity}</td>
                  <td className="p-2 border-r border-slate-200 text-right font-mono text-slate-500">{item.mrp}</td>
                  <td className="p-2 border-r border-slate-200 text-right font-mono font-semibold text-slate-800">
                    {item.wholesalePrice}
                  </td>
                  <td className="p-2 text-right font-mono font-bold text-slate-900">{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation & Tax Summary */}
        <div className="grid sm:grid-cols-2 gap-4 items-start mb-6">
          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 rounded border border-slate-200 bg-slate-50 space-y-1">
              <span className="font-bold text-slate-700 block">Terms & Wholesale Conditions:</span>
              <p className="text-slate-600 leading-normal">
                1. Inspect batch verification and seals upon consignment receipt.
                <br />
                2. Expiry and breakage claims handled strictly per manufacturer return policy.
                <br />
                3. Subject to Bhagalpur Jurisdiction only.
              </p>
            </div>
            <p className="text-slate-500">
              <strong>Total Items:</strong> {order.items.length} Formulations
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 space-y-1 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal (Taxable Value):</span>
              <span className="font-mono font-bold text-slate-900">₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>CGST (6%):</span>
              <span className="font-mono">₹{halfTax}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>SGST (6%):</span>
              <span className="font-mono">₹{halfTax}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Total GST (12%):</span>
              <span className="font-mono font-semibold text-slate-800">₹{order.gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Local Delivery:</span>
              <span className="font-bold text-emerald-700">₹0.00 (FREE)</span>
            </div>
            <div className="pt-2 border-t-2 border-slate-900 flex justify-between text-sm font-black text-[#0b1e36]">
              <span>Final Invoice Total:</span>
              <span className="font-mono text-base">₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="mt-6 pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            <p className="font-mono text-[10px] text-slate-400">
              Computer Generated B2B Tax Invoice • E-Way Bill Ready
            </p>
            <p className="text-[11px] text-teal-800 font-bold mt-0.5">
              ✓ Verified Wholesale Supply
            </p>
          </div>

          <div className="text-center sm:text-right">
            <div className="h-8 flex items-end justify-center sm:justify-end">
              <span className="italic font-serif text-slate-800 text-sm border-b border-slate-400 px-6">
                Santosh Kumar
              </span>
            </div>
            <p className="font-bold text-slate-900 mt-1">
              For {COMPANY_DETAILS.name}
            </p>
            <p className="text-[10px] text-slate-500">
              Authorized Signatory / Proprietor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
