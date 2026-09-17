"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  getStoredOrders,
  getStoredRetailerProfile,
  saveRetailerProfile,
  reorderItems,
  OrderRecord,
  RetailerProfile,
} from "@/lib/store";
import {
  User,
  Building2,
  Phone,
  MapPin,
  FileText,
  ReceiptText,
  Repeat,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  Edit3,
  Store,
  ChevronRight,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<RetailerProfile | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [reorderSuccessMsg, setReorderSuccessMsg] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<RetailerProfile>({
    pharmacyName: "",
    chemistName: "",
    mobile: "",
    address: "",
    dlNumber: "",
    gstin: "",
  });

  const loadData = () => {
    const prof = getStoredRetailerProfile();
    setProfile(prof);
    setFormData(prof);

    const allOrders = getStoredOrders();
    // STRICTLY filter orders for this retailer (Maa Tara Medical Hall) ONLY.
    // Never show orders belonging to other chemists like Sanjivani Chemist!
    const myOrders = allOrders.filter(
      (o) =>
        o.customer.pharmacyName.toLowerCase().trim() === prof.pharmacyName.toLowerCase().trim() ||
        o.customer.mobile.trim() === prof.mobile.trim()
    );
    setOrders(myOrders);
  };

  useEffect(() => {
    loadData();
    const handleProfileUpdate = () => loadData();
    const handleOrdersUpdate = () => loadData();

    window.addEventListener("retailer-profile-updated", handleProfileUpdate);
    window.addEventListener("orders-updated", handleOrdersUpdate);
    return () => {
      window.removeEventListener("retailer-profile-updated", handleProfileUpdate);
      window.removeEventListener("orders-updated", handleOrdersUpdate);
    };
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveRetailerProfile(formData);
    setProfile(formData);
    setIsEditingProfile(false);
  };

  const handle1ClickReorder = (order: OrderRecord) => {
    const count = reorderItems(order);
    setReorderSuccessMsg(
      `✓ Successfully re-added ${count} medicine items to your wholesale cart!`
    );
    setTimeout(() => {
      router.push("/store");
    }, 1200);
  };

  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const getStatusBadge = (status: OrderRecord["orderStatus"]) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge
            variant="success"
            className="bg-emerald-50 text-emerald-800 border-emerald-300 text-[10px]"
          >
            Delivered
          </Badge>
        );
      case "Dispatched":
        return (
          <Badge
            variant="accent"
            className="bg-teal-50 text-teal-800 border-teal-300 text-[10px]"
          >
            Out for Delivery
          </Badge>
        );
      case "Confirmed":
        return (
          <Badge
            variant="navy"
            className="bg-blue-50 text-blue-900 border-blue-200 text-[10px]"
          >
            Confirmed
          </Badge>
        );
      default:
        return <Badge variant="secondary" className="text-[10px]">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-5 sm:py-10 pb-28 md:pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Reorder Notification Banner */}
        {reorderSuccessMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{reorderSuccessMsg} Redirecting to wholesale catalog...</span>
          </div>
        )}

        {/* Page Breadcrumb / Active Indicator */}
        <div className="flex items-center justify-between py-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="font-bold text-[#0b1e36] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              Retailer Account Hub
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] sm:text-[11px] bg-teal-50 text-teal-800 font-semibold border-teal-200/80 px-2 py-0.5 rounded-full"
          >
            Verified Retailer Desk
          </Badge>
        </div>

        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="w-5 h-5 text-[#0d9488]" />
              <h1 className="text-xl sm:text-2xl font-black text-[#0b1e36]">
                Retailer Account & Reorder Hub
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Manage your pharmacy profile, track active consignments & reorder in 1 click
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-xs font-semibold border-slate-300 h-8 flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              <span>{isEditingProfile ? "Cancel" : "Edit Profile"}</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              asChild
              className="text-xs font-bold bg-[#0b1e36] h-8"
            >
              <Link href="/store" className="flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-teal-400" />
                <span>Wholesale Store</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Edit Profile Drawer / Form */}
        {isEditingProfile && (
          <Card className="p-4 sm:p-6 border-teal-200 bg-teal-50/40 rounded-2xl shadow-sm animate-in fade-in">
            <h3 className="font-extrabold text-sm text-[#0b1e36] mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Update Registered Pharmacy Profile</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pharmacy / Medical Store Name</label>
                <input
                  type="text"
                  required
                  value={formData.pharmacyName}
                  onChange={(e) => setFormData({ ...formData, pharmacyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Chemist / Proprietor Name</label>
                <input
                  type="text"
                  required
                  value={formData.chemistName}
                  onChange={(e) => setFormData({ ...formData, chemistName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Trade Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Drug License Number (Form 20B/21B)</label>
                <input
                  type="text"
                  value={formData.dlNumber}
                  onChange={(e) => setFormData({ ...formData, dlNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Full Shop Delivery Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-800"
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#0b1e36] font-bold"
                >
                  Save Profile Details
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Profile Card & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Pharmacy Profile Card (2 cols) */}
          <Card className="lg:col-span-2 p-4 sm:p-5 border-slate-200 bg-white shadow-xs rounded-2xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0d9488] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Verified Retail Chemist
                </span>
                <h2 className="text-base sm:text-lg font-black text-[#0b1e36] mt-1">
                  {profile?.pharmacyName || "Maa Tara Medical Hall"}
                </h2>
                <p className="text-xs text-slate-600">
                  Chemist: <strong>{profile?.chemistName}</strong>
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold text-sm border border-slate-200">
                RX
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>
                  <strong>Mobile:</strong> {profile?.mobile}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="truncate">
                  <strong>DL No:</strong> {profile?.dlNumber || "DL-20B-1849/BGP"}
                </span>
              </div>

              <div className="sm:col-span-2 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Delivery Address:</strong> {profile?.address}
                </span>
              </div>
            </div>

            {/* Account Status Badge */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 text-teal-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Form 20B/21B Registered Buyer Account</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">Bhagalpur District Trade</span>
            </div>
          </Card>

          {/* Quick Metrics (1 col) */}
          <div className="space-y-3">
            <Card className="p-4 border-slate-200 bg-white shadow-xs rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Orders Placed
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#0b1e36]">
                  {orders.length}
                </span>
                <span className="text-xs text-teal-700 font-semibold">
                  Wholesale Batches
                </span>
              </div>
            </Card>

            <Card className="p-4 border-slate-200 bg-white shadow-xs rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Lifetime Procurement
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#0b1e36] font-mono">
                  ₹{totalSpent.toFixed(2)}
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  GST Invoiced
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Purchase History & 1-Click Reorder Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-[#0b1e36] flex items-center gap-2">
              <ReceiptText className="w-4 h-4 text-teal-600" />
              <span>Order Records & 1-Click Reorder</span>
            </h3>
            <span className="text-xs text-slate-500">
              Showing {orders.length} orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
              <ReceiptText className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="font-bold text-sm text-slate-800">No Orders Found for This Profile</h4>
              <p className="text-xs text-slate-500">
                Browse our live wholesale formulations and book your first order.
              </p>
              <Button variant="primary" size="sm" asChild>
                <Link href="/store">Open Wholesale Store</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="p-4 sm:p-5 border border-slate-200 bg-white hover:border-slate-300 transition-all rounded-2xl shadow-xs"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Bill No, Date, Status */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0b1e36] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {order.id}
                        </span>
                        {getStatusBadge(order.orderStatus)}
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{order.orderDate}</span>
                        </span>
                      </div>

                      {/* Items List */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                        <div className="font-bold text-slate-700 text-[11px] flex justify-between">
                          <span>Procured Formulations ({order.items.length}):</span>
                          <span className="text-slate-500 font-normal">Pack / Quantity</span>
                        </div>
                        {order.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-slate-600 border-b border-slate-200/50 pb-1 last:border-b-0 last:pb-0"
                          >
                            <span className="font-medium text-slate-800 truncate max-w-[240px] sm:max-w-md">
                              {it.name} ({it.company})
                            </span>
                            <span className="font-mono font-semibold text-slate-700 shrink-0 text-[11px]">
                              {it.quantity}x @ ₹{it.wholesalePrice}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>
                          Payment: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})
                        </span>
                        <span>•</span>
                        <span>
                          Delivery: <strong>{order.customer.address}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Right: Total & Action Buttons */}
                    <div className="flex sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0">
                      <div className="lg:text-right">
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">
                          Tax Paid Bill Total
                        </span>
                        <span className="text-lg sm:text-xl font-black text-[#0b1e36] font-mono">
                          ₹{order.totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* 1-Click Reorder Button */}
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => handle1ClickReorder(order)}
                          className="bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold h-8 px-3 flex items-center gap-1.5 shadow-xs"
                          title="Reorder exact formulations and quantities into cart"
                        >
                          <Repeat className="w-3.5 h-3.5" />
                          <span>1-Click Reorder</span>
                        </Button>

                        {/* View & Print A4 Bill Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="text-xs font-semibold border-slate-300 h-8 px-3 flex items-center gap-1 hover:bg-slate-50 text-[#0b1e36]"
                        >
                          <Link href={`/invoice/${order.id}`}>
                            <Printer className="w-3.5 h-3.5 text-slate-600" />
                            <span>Print Bill</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
