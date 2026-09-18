"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  getStoredCart,
  createNewOrder,
  getStoredRetailerProfile,
  CartItem,
} from "@/lib/store";
import { COMPANY_DETAILS } from "@/lib/data";
import {
  ShoppingBag,
  Building2,
  Phone,
  QrCode,
  Truck,
  CreditCard,
  ArrowLeft,
  FileText,
  Copy,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Razorpay" | "UPI">("COD");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Chemist Form Fields
  const [pharmacyName, setPharmacyName] = useState("");
  const [chemistName, setChemistName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [dlNumber, setDlNumber] = useState("");
  const [gstin, setGstin] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const items = getStoredCart();
    setCart(items);
    const prof = getStoredRetailerProfile();
    if (prof) {
      setPharmacyName(prof.pharmacyName || "Maa Tara Medical Hall");
      setChemistName(prof.chemistName || "Rajesh Sharma");
      setMobile(prof.mobile || "9835012345");
      setAddress(prof.address || "Station Road, Near Town Hall, Bhagalpur - 812001");
      setDlNumber(prof.dlNumber || "DL-20B-1849/BGP");
      setGstin(prof.gstin || "10ABCPR8491C1Z4");
    }
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.wholesalePrice * item.quantity,
    0
  );
  const gstAmount = Math.round(subtotal * 0.12 * 10) / 10;
  const totalAmount = Math.round(subtotal + gstAmount);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(COMPANY_DETAILS.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pharmacyName.trim() || !chemistName.trim() || !mobile.trim() || !address.trim()) {
      alert("Please provide the Pharmacy Name, Chemist Contact Name, Mobile Number, and Delivery Address.");
      return;
    }

    if (paymentMethod === "UPI" && !utrNumber.trim()) {
      alert("Please enter the UPI Transaction Reference / UTR Number after completing the payment.");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        pharmacyName,
        chemistName,
        mobile,
        address,
        dlNumber: dlNumber.trim() || "DL-VERIFICATION-PENDING",
        gstin: gstin.trim() || "UNREGISTERED-CHEMIST",
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        company: item.product.company,
        packSize: item.product.packSize,
        hsnCode: item.product.hsnCode,
        batchNo: item.product.batchNo,
        expDate: item.product.expDate,
        mrp: item.product.mrp,
        wholesalePrice: item.product.wholesalePrice,
        quantity: item.quantity,
        total: item.product.wholesalePrice * item.quantity,
      })),
      subtotal,
      gstAmount,
      totalAmount,
      paymentMethod: paymentMethod === "Razorpay" ? ("UPI" as const) : paymentMethod,
      paymentStatus: paymentMethod === "COD" ? ("Pending" as const) : ("Paid" as const),
      utrNumber: paymentMethod !== "COD" ? (utrNumber || "RZP-PAY-VERIFIED") : undefined,
      orderStatus: "Confirmed" as const,
    };

    const created = createNewOrder(orderPayload);
    setIsSubmitting(false);
    router.push(`/invoice/${created.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Your Wholesale Cart is Empty</h2>
        <p className="text-xs text-slate-500 mt-1 mb-5 max-w-xs">
          Browse the wholesale catalog to add medicines or surgical items before checkout.
        </p>
        <Button variant="primary" size="sm" asChild>
          <Link href="/store">Open Wholesale Agency</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 sm:py-10 pb-28 md:pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0b1e36]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>

          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            B2B Wholesale Billing & Dispatch Checkout
          </span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column: Form & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Retailer Chemist Form */}
            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal-600" />
                  <CardTitle className="text-sm sm:text-base text-[#0b1e36]">
                    Retail Chemist / Buyer Credentials
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 space-y-3.5">
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Pharmacy / Medical Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maa Sharda Medical Hall"
                      value={pharmacyName}
                      onChange={(e) => setPharmacyName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#0b1e36] focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Chemist / Proprietor Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar Sharma"
                      value={chemistName}
                      onChange={(e) => setChemistName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#0b1e36] focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="e.g. 98350XXXXX"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#0b1e36] focus:outline-none bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Drug License No. (Optional for Demo)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DL-20B-XXXX/BGP"
                      value={dlNumber}
                      onChange={(e) => setDlNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#0b1e36] focus:outline-none bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Complete Delivery Address / Location *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. Station Road, Near Town Hall, Bhagalpur - 812001"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#0b1e36] focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    GSTIN Number (Optional for Tax Credit)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10XXXXX0000X1ZX"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#0b1e36] focus:outline-none bg-white uppercase font-mono"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 2. Payment Method */}
            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100">
                <CardTitle className="text-sm sm:text-base text-[#0b1e36]">
                  Select Wholesale Payment Option
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* COD Option */}
                  <div
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-[#0b1e36] bg-slate-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-teal-600" />
                        <span>Cash on Delivery (COD)</span>
                      </span>
                      <input
                        type="radio"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Pay upon delivery of medicine cartons. Standard terms for verified regional chemists.
                    </p>
                  </div>

                  {/* Online UPI Option */}
                  <div
                    onClick={() => setPaymentMethod("UPI")}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "UPI" || paymentMethod === "Razorpay"
                        ? "border-teal-600 bg-teal-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-teal-600" />
                        <span>Instant UPI / QR Code</span>
                      </span>
                      <input
                        type="radio"
                        checked={paymentMethod === "UPI" || paymentMethod === "Razorpay"}
                        onChange={() => setPaymentMethod("UPI")}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Scan official agency QR code or tap to pay directly via PhonePe, GPay, Paytm, or BHIM UPI.
                    </p>
                  </div>
                </div>

                {/* Online Details (if selected) */}
                {(paymentMethod === "UPI" || paymentMethod === "Razorpay") && (
                  <div className="p-4 rounded-xl bg-white border border-teal-500/30 space-y-3 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="w-32 h-32 rounded-xl bg-white border-2 border-slate-300 p-1.5 flex flex-col items-center justify-center shrink-0 shadow-xs">
                        <img
                          src="/payment-qr.png"
                          alt="Saurav Medical Agency Merchant QR"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs flex-1 text-center sm:text-left">
                        <span className="font-bold text-slate-900 block text-sm">
                          {COMPANY_DETAILS.name}
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Proprietor: {COMPANY_DETAILS.ownerName} • ICICI Merchant QR
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                          <span className="font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-300 text-xs">
                            {COMPANY_DETAILS.upiId}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="p-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
                            title="Copy UPI ID"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          {copiedUpi && (
                            <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>
                          )}
                        </div>

                        {/* Direct Tap to Pay with UPI App */}
                        <div className="pt-2">
                          <a
                            href={`upi://pay?pa=${COMPANY_DETAILS.upiId}&pn=${encodeURIComponent(COMPANY_DETAILS.name)}&am=${totalAmount.toFixed(2)}&cu=INR&tn=Saurav%20Medical%20Order`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0b1e36] hover:bg-[#163b65] text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                          >
                            <QrCode className="w-3.5 h-3.5 text-teal-400" />
                            <span>Tap to Pay ₹{totalAmount.toFixed(2)} via UPI App</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        UPI UTR / Transaction Reference Number *
                      </label>
                      <input
                        type="text"
                        required={paymentMethod === "UPI"}
                        placeholder="e.g. 429182910392 or Transaction Reference"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-teal-400 bg-teal-50/20 focus:ring-1 focus:ring-teal-600 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border-slate-200 shadow-xs sticky top-20">
              <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm sm:text-base font-bold text-[#0b1e36]">
                    Wholesale Order Summary
                  </CardTitle>
                  <span className="text-xs text-slate-500 font-semibold">
                    {cart.length} Formulation{cart.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 space-y-3.5">
                {/* Itemized List */}
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-start justify-between text-xs pb-1.5 border-b border-slate-100 last:border-0"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{item.product.name}</p>
                        <p className="text-[10px] text-slate-500">
                          {item.product.company} • Qty: {item.quantity} Box{item.quantity > 1 ? "es" : ""}
                        </p>
                      </div>
                      <span className="font-bold text-slate-800 font-mono">
                        ₹{item.product.wholesalePrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="pt-2.5 border-t border-slate-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Taxable Subtotal</span>
                    <span className="font-semibold text-slate-800 font-mono">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (Est. 12% Pharmaceutical HSN)</span>
                    <span className="font-semibold text-slate-800 font-mono">₹{gstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Local Route Dispatch</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-[#0b1e36]">
                    <span>Total Bill Payable</span>
                    <span className="text-lg font-mono">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-[11px] leading-tight">
                    Instant A4 GST Tax Invoice generated on confirmation.
                  </span>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full justify-center text-xs sm:text-sm font-bold bg-[#0b1e36] hover:bg-[#163b65] py-5 shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Generating Tax Invoice...</span>
                  ) : (
                    <span>Confirm Order & Generate Bill</span>
                  )}
                </Button>

                <p className="text-[10px] text-center text-slate-400">
                  Wholesale consignment strictly supplied to licensed medical retailers.
                </p>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
