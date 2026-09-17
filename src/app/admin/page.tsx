"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  getStoredOrders,
  updateOrderStatusInStorage,
  getStoredOffers,
  saveOffersToStorage,
  getStoredProducts,
  saveProductsToStorage,
  OrderRecord,
} from "@/lib/store";
import {
  COMPANY_DETAILS,
  DUMMY_PRODUCTS,
  OFFER_SLIDES,
  ProductItem,
  OfferSlide,
} from "@/lib/data";
import {
  Lock,
  ReceiptText,
  Printer,
  Truck,
  TrendingUp,
  Users,
  Search,
  Store,
  RefreshCw,
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  Phone,
  MapPin,
  FileText,
  Layers,
  ShoppingBag,
  SlidersHorizontal,
  X,
  Eye,
} from "lucide-react";

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [offers, setOffers] = useState<OfferSlide[]>(OFFER_SLIDES);
  const [products, setProducts] = useState<ProductItem[]>(DUMMY_PRODUCTS);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"orders" | "customers" | "inventory" | "offers">("orders");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Customer Drill-down modal state
  const [inspectedCustomer, setInspectedCustomer] = useState<string | null>(null);

  // New Offer Form State
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [newOffer, setNewOffer] = useState({
    occasion: "Festival Wholesale Scheme",
    title: "",
    subtitle: "",
    highlight: "",
    code: "",
    badge: "Exclusive Retailer Offer",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "from-[#0b1e36] via-[#102a4c] to-[#0f766e]",
  });

  const refreshAll = () => {
    const list = getStoredOrders();
    setOrders(list);

    const storedOffers = getStoredOffers();
    if (storedOffers && storedOffers.length > 0) {
      setOffers(storedOffers);
    } else {
      setOffers(OFFER_SLIDES);
    }

    const storedProducts = getStoredProducts();
    setProducts(storedProducts);
  };

  useEffect(() => {
    refreshAll();
    const handleUpdate = () => refreshAll();
    window.addEventListener("orders-updated", handleUpdate);
    window.addEventListener("offers-updated", handleUpdate);
    window.addEventListener("products-updated", handleUpdate);

    return () => {
      window.removeEventListener("orders-updated", handleUpdate);
      window.removeEventListener("offers-updated", handleUpdate);
      window.removeEventListener("products-updated", handleUpdate);
    };
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderRecord["orderStatus"]) => {
    updateOrderStatusInStorage(orderId, newStatus);
    refreshAll();
  };

  const handlePaymentToggle = (orderId: string, currentStatus: OrderRecord["paymentStatus"]) => {
    const nextStatus = currentStatus === "Paid" ? "Pending" : "Paid";
    updateOrderStatusInStorage(orderId, orders.find(o => o.id === orderId)!.orderStatus, nextStatus);
    refreshAll();
  };

  // Offers Manager
  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.title || !newOffer.highlight) return;

    const offerItem: OfferSlide = {
      id: `offer-${Date.now()}`,
      ...newOffer,
    };

    const updated = [offerItem, ...offers];
    setOffers(updated);
    saveOffersToStorage(updated);
    setShowAddOfferModal(false);
    setNewOffer({
      occasion: "Festival Wholesale Scheme",
      title: "",
      subtitle: "",
      highlight: "",
      code: "",
      badge: "Exclusive Retailer Offer",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
      bgGradient: "from-[#0b1e36] via-[#102a4c] to-[#0f766e]",
    });
  };

  const handleDeleteOffer = (id: string) => {
    const updated = offers.filter((o) => o.id !== id);
    setOffers(updated);
    saveOffersToStorage(updated);
  };

  // Product Stock Toggle
  const handleToggleStock = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    });
    setProducts(updated);
    saveProductsToStorage(updated);
  };

  // Product Price Edit
  const handlePriceEdit = (id: string, newWholesale: number) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, wholesalePrice: newWholesale };
      }
      return p;
    });
    setProducts(updated);
    saveProductsToStorage(updated);
  };

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus !== "Delivered").length;
  const uniqueChemists = Array.from(new Set(orders.map((o) => o.customer.pharmacyName)));

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (selectedFilter !== "All" && o.orderStatus !== selectedFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.pharmacyName.toLowerCase().includes(q) ||
        o.customer.chemistName.toLowerCase().includes(q) ||
        o.customer.mobile.includes(q)
      );
    }
    return true;
  });

  // Customer Drill-down data
  const inspectedOrders = inspectedCustomer
    ? orders.filter((o) => o.customer.pharmacyName === inspectedCustomer)
    : [];
  const inspectedCustomerInfo = inspectedOrders[0]?.customer;
  const inspectedTotalSpend = inspectedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-28 md:pb-16">
      {/* Admin Top Bar */}
      <div className="bg-[#0b1e36] text-white py-5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-teal-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
                Staff & Admin Portal
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight">
              {COMPANY_DETAILS.name} • Wholesale Management
            </h1>
            <p className="text-[11px] text-slate-300">
              Proprietor: {COMPANY_DETAILS.ownerName} • {COMPANY_DETAILS.city}, Bihar • Mob: {COMPANY_DETAILS.mobile}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshAll}
              className="bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 text-xs h-8 px-2.5 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </Button>
            <Button
              variant="accent"
              size="sm"
              asChild
              className="bg-[#0d9488] text-white text-xs h-8"
            >
              <Link href="/store" target="_blank" className="flex items-center gap-1">
                <Store className="w-3.5 h-3.5" />
                <span>View Storefront</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-5">
        {/* KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="p-3.5 sm:p-4 border-slate-200 bg-white shadow-xs">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Wholesale Revenue
            </p>
            <h3 className="text-lg sm:text-2xl font-black text-[#0b1e36] mt-1 font-mono">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h3>
            <span className="text-[10px] text-teal-700 font-semibold block mt-1">
              ✓ GST Reconciled
            </span>
          </Card>

          <Card className="p-3.5 sm:p-4 border-slate-200 bg-white shadow-xs">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Invoices
            </p>
            <h3 className="text-lg sm:text-2xl font-black text-[#0b1e36] mt-1">
              {totalOrdersCount}
            </h3>
            <span className="text-[10px] text-slate-500 block mt-1">
              Wholesale Consignments
            </span>
          </Card>

          <Card className="p-3.5 sm:p-4 border-slate-200 bg-white shadow-xs">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Dispatches
            </p>
            <h3 className="text-lg sm:text-2xl font-black text-amber-600 mt-1">
              {pendingOrders}
            </h3>
            <span className="text-[10px] text-amber-700 font-semibold block mt-1">
              Packing / Transit
            </span>
          </Card>

          <Card className="p-3.5 sm:p-4 border-slate-200 bg-white shadow-xs">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Chemists
            </p>
            <h3 className="text-lg sm:text-2xl font-black text-[#0b1e36] mt-1">
              {uniqueChemists.length}
            </h3>
            <span className="text-[10px] text-slate-500 block mt-1">
              Licensed Retail Stores
            </span>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "orders"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Orders & Billing Desk ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "customers"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Customer Directory & History ({uniqueChemists.length})
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "inventory"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Inventory & PTR Pricing ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "offers"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Promotions & Offer Banners ({offers.length})
          </button>
        </div>

        {/* TAB 1: ORDERS & BILLS */}
        {activeTab === "orders" && (
          <div className="space-y-3 sm:space-y-4">
            {/* Filter and Search Bar */}
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Bill No, Pharmacy Name, or Mobile..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {["All", "Confirmed", "Dispatched", "Delivered"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedFilter(status)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors ${
                      selectedFilter === status
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <th className="p-3">Bill No / Date</th>
                    <th className="p-3">Pharmacy & Chemist</th>
                    <th className="p-3">Mobile & Address</th>
                    <th className="p-3 text-center">Items</th>
                    <th className="p-3 text-right">Total (₹)</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Delivery Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500 text-xs">
                        No orders matching current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3">
                          <span className="font-mono font-bold text-slate-900 block">
                            {order.id}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {order.orderDate}
                          </span>
                        </td>

                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">
                            {order.customer.pharmacyName}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            {order.customer.chemistName}
                          </span>
                        </td>

                        <td className="p-3 text-slate-600">
                          <span className="font-mono text-xs block">{order.customer.mobile}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[140px] block">
                            {order.customer.address}
                          </span>
                        </td>

                        <td className="p-3 text-center font-bold text-slate-700">
                          {order.items.length}
                        </td>

                        <td className="p-3 text-right font-mono font-bold text-[#0b1e36]">
                          ₹{order.totalAmount.toFixed(2)}
                        </td>

                        <td className="p-3">
                          <button
                            onClick={() => handlePaymentToggle(order.id, order.paymentStatus)}
                            className={`px-2 py-0.5 rounded text-[9px] font-bold border transition-colors ${
                              order.paymentStatus === "Paid"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : "bg-amber-50 text-amber-800 border-amber-300"
                            }`}
                            title="Click to toggle payment status"
                          >
                            {order.paymentMethod} • {order.paymentStatus}
                          </button>
                        </td>

                        {/* Interactive Status Selector */}
                        <td className="p-3">
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusChange(
                                order.id,
                                e.target.value as OrderRecord["orderStatus"]
                              )
                            }
                            className="px-2 py-1 text-[11px] font-semibold rounded border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>

                        {/* Print Action */}
                        <td className="p-3 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-7 px-2 text-xs text-[#0b1e36] border-slate-300 hover:bg-slate-100"
                          >
                            <Link
                              href={`/invoice/${order.id}`}
                              target="_blank"
                              className="flex items-center gap-1"
                            >
                              <Printer className="w-3 h-3" />
                              <span>Bill</span>
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMERS DIRECTORY & PURCHASE HISTORY */}
        {activeTab === "customers" && (
          <div className="space-y-4">
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-800">
                  Registered Retail Pharmacies & Chemists
                </h3>
                <p className="text-xs text-slate-500">
                  Click on any pharmacy to view their complete lifetime order history and bills.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {uniqueChemists.map((pharmacy) => {
                const customerOrders = orders.filter((o) => o.customer.pharmacyName === pharmacy);
                const totalSpent = customerOrders.reduce((s, o) => s + o.totalAmount, 0);
                const first = customerOrders[0];

                return (
                  <Card
                    key={pharmacy}
                    className="p-4 border-slate-200 bg-white shadow-xs rounded-xl space-y-3 hover:border-teal-400 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900">{pharmacy}</h3>
                        <p className="text-xs text-slate-600">Chemist: {first.customer.chemistName}</p>
                      </div>
                      <Badge variant="navy" className="text-[10px]">
                        {customerOrders.length} Order{customerOrders.length > 1 ? "s" : ""}
                      </Badge>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-teal-600" />
                        <span className="font-mono">{first.customer.mobile}</span>
                      </p>
                      <p className="text-[11px] flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
                        <span>{first.customer.address}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        DL: {first.customer.dlNumber || "N/A"} • GST: {first.customer.gstin || "N/A"}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">
                          Lifetime Billing
                        </span>
                        <span className="font-bold text-slate-900 font-mono text-sm">
                          ₹{totalSpent.toFixed(2)}
                        </span>
                      </div>

                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => setInspectedCustomer(pharmacy)}
                        className="bg-[#0b1e36] hover:bg-[#163b65] text-white text-xs h-7 px-2.5 flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Orders & Bills</span>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY & PTR PRICING */}
        {activeTab === "inventory" && (
          <div className="space-y-3">
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-800">
                  Wholesale Formulation Stock & Price Control
                </h3>
                <p className="text-xs text-slate-500">
                  Adjust Price to Retailer (PTR) and toggle stock availability in real-time.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] bg-slate-50">
                    <th className="p-3">Product Description</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Pack Size</th>
                    <th className="p-3">Batch / Expiry</th>
                    <th className="p-3 text-right">MRP (₹)</th>
                    <th className="p-3 text-right">Wholesale PTR (₹)</th>
                    <th className="p-3 text-center">Stock Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{prod.name}</span>
                        <span className="text-[10px] text-slate-400 block">{prod.genericName}</span>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="text-[9px]">
                          {prod.category}
                        </Badge>
                      </td>
                      <td className="p-3 font-semibold text-teal-800">{prod.company}</td>
                      <td className="p-3 text-slate-600">{prod.packSize}</td>
                      <td className="p-3 font-mono text-[10px] text-slate-400">
                        {prod.batchNo} • {prod.expDate}
                      </td>
                      <td className="p-3 text-right font-mono text-slate-500">₹{prod.mrp}</td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          value={prod.wholesalePrice}
                          onChange={(e) =>
                            handlePriceEdit(prod.id, parseFloat(e.target.value) || 0)
                          }
                          className="w-20 px-2 py-1 text-right font-mono font-bold text-[#0b1e36] rounded border border-slate-300 bg-white"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleToggleStock(prod.id)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                            prod.inStock
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                              : "bg-red-50 text-red-800 border-red-300 hover:bg-red-100"
                          }`}
                        >
                          {prod.inStock ? "✓ In Stock" : "✕ Out of Stock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PROMOTIONS & BANNER CAROUSEL MANAGER */}
        {activeTab === "offers" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-800">
                  Storefront Landscape Hero Banners
                </h3>
                <p className="text-xs text-slate-500">
                  Add designer-created landscape images (promotional banners, festival schemes, bulk rates) displayed with a direct &ldquo;Shop Now&rdquo; button on `/store`.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddOfferModal(true)}
                className="bg-[#0b1e36] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload / Add Landscape Banner</span>
              </Button>
            </div>

            {/* Live Slides List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offers.map((off) => (
                <Card
                  key={off.id}
                  className="p-3 sm:p-4 rounded-2xl border border-slate-200 overflow-hidden relative shadow-xs flex flex-col justify-between"
                >
                  <div className="relative rounded-xl overflow-hidden mb-3 border border-slate-200 group">
                    <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={off.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80"}
                        alt={off.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Live Preview Overlay: Shop Now Button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 p-3 flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-600/90 text-white px-2 py-0.5 rounded shadow-xs">
                            {off.occasion || off.badge || "Live Scheme"}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-amber-300">
                            {off.code || "WHOLESALE"}
                          </span>
                        </div>

                        <div className="flex items-end justify-between">
                          <div className="bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white">
                            <p className="text-xs font-bold leading-tight">{off.title}</p>
                          </div>
                          <span className="text-[10px] font-bold bg-white text-[#0b1e36] px-2.5 py-1 rounded-full shadow-md">
                            Shop Now →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Landscape Hero Banner • Live on `/store`
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteOffer(off.id)}
                      className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Customer Purchase History Drill-down Modal */}
      {inspectedCustomer && (
        <div className="fixed inset-0 z-50 bg-[#0b1e36]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Customer Purchase Profile
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#0b1e36] mt-0.5">
                  {inspectedCustomer}
                </h3>
                <p className="text-xs text-slate-500">
                  Chemist: {inspectedCustomerInfo?.chemistName} • Mobile: {inspectedCustomerInfo?.mobile}
                </p>
              </div>

              <button
                onClick={() => setInspectedCustomer(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Stats & Orders */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
              {/* Summary Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Orders</span>
                  <span className="text-base font-black text-slate-900">{inspectedOrders.length}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Lifetime Billing</span>
                  <span className="text-base font-black text-[#0b1e36] font-mono">₹{inspectedTotalSpend.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Drug License</span>
                  <span className="text-xs font-mono font-medium text-slate-700">{inspectedCustomerInfo?.dlNumber || "N/A"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">GSTIN</span>
                  <span className="text-xs font-mono font-medium text-slate-700">{inspectedCustomerInfo?.gstin || "N/A"}</span>
                </div>
              </div>

              <h4 className="font-black text-sm text-[#0b1e36]">
                Chronological Orders & Invoices ({inspectedOrders.length})
              </h4>

              <div className="space-y-3">
                {inspectedOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0b1e36] bg-slate-100 px-2 py-0.5 rounded">
                          {ord.id}
                        </span>
                        <Badge variant="navy" className="text-[9px]">
                          {ord.orderStatus}
                        </Badge>
                        <span className="text-[11px] text-slate-400">{ord.orderDate}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-sm text-[#0b1e36]">
                          ₹{ord.totalAmount.toFixed(2)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-7 px-2 text-xs border-slate-300 text-[#0b1e36]"
                        >
                          <Link href={`/invoice/${ord.id}`} target="_blank">
                            <Printer className="w-3 h-3 mr-1 text-slate-500" />
                            <span>Print Bill</span>
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Items table snippet */}
                    <div className="space-y-1 text-slate-600 text-[11px]">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            {it.name} ({it.company})
                          </span>
                          <span className="font-mono font-medium">
                            {it.quantity}x @ ₹{it.wholesalePrice} = ₹{it.total}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Offer Banner Modal */}
      {showAddOfferModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1e36]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowAddOfferModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-3">
              <h3 className="font-extrabold text-base text-[#0b1e36]">
                Publish Landscape Designer Banner
              </h3>
              <p className="text-[11px] text-slate-500">
                Upload designer-created promotional graphics. On the store page, a &ldquo;Shop Now&rdquo; button is automatically positioned over this banner.
              </p>
            </div>

            <form onSubmit={handleCreateOffer} className="space-y-3 text-xs">
              {/* Landscape Image Live Preview */}
              {newOffer.imageUrl && (
                <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={newOffer.imageUrl}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-2.5">
                    <span className="text-[9px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded">
                      {newOffer.occasion || "Live Banner"}
                    </span>
                    <span className="text-[9px] font-bold bg-white text-[#0b1e36] px-2 py-0.5 rounded-full shadow">
                      Shop Now →
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Occasion / Festival / Scheme</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diwali Scheme / Monsoon Slab"
                    value={newOffer.occasion}
                    onChange={(e) => setNewOffer({ ...newOffer, occasion: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Landscape Image URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newOffer.imageUrl}
                    onChange={(e) => setNewOffer({ ...newOffer, imageUrl: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Banner Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festival Antibiotic Scheme"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Special stocking scheme for Bhagalpur retail chemists"
                  value={newOffer.subtitle}
                  onChange={(e) => setNewOffer({ ...newOffer, subtitle: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Key Scheme Highlight (Bold)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 + 1 Free + 5% Cash Discount on Bulk Lots"
                  value={newOffer.highlight}
                  onChange={(e) => setNewOffer({ ...newOffer, highlight: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Scheme Code</label>
                  <input
                    type="text"
                    placeholder="e.g. SCHEME-FESTIVE"
                    value={newOffer.code}
                    onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Bulk Deal"
                    value={newOffer.badge}
                    onChange={(e) => setNewOffer({ ...newOffer, badge: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddOfferModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#0b1e36] text-white font-bold"
                >
                  Publish to Store Carousel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
