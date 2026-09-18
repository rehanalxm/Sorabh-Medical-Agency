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
  getStoredBrands,
  saveBrandsToStorage,
  getStoredCategories,
  saveCategoriesToStorage,
  DEFAULT_CATEGORIES,
  OrderRecord,
} from "@/lib/store";
import {
  COMPANY_DETAILS,
  OFFER_SLIDES,
  DUMMY_PRODUCTS,
  CARD_COMPANIES,
  OfferSlide,
  ProductItem,
  BrandItem,
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
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  Phone,
  MapPin,
  FileText,
  ShoppingBag,
  X,
  Eye,
  Upload,
  Image as ImageIcon,
  Pill,
  Building2,
  Tag,
  Edit3,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [products, setProducts] = useState<ProductItem[]>(DUMMY_PRODUCTS);
  const [brands, setBrands] = useState<BrandItem[]>(CARD_COMPANIES);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [offers, setOffers] = useState<OfferSlide[]>(OFFER_SLIDES);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "brands" | "categories" | "customers" | "offers">("orders");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Product Search & Category Filter
  const [productSearch, setProductSearch] = useState<string>("");
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>("All");

  // Product Add / Edit Modal State
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    genericName: "",
    category: "Generic",
    company: "Alkem",
    packSize: "10 x 10 Strips / Box",
    mrp: 150,
    wholesalePrice: 50,
    scheme: "Regular Wholesale",
    batchNo: "BT-2401",
    expDate: "12/2027",
    hsnCode: "3004",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "",
  });

  // Brand Add Modal State
  const [showAddBrandModal, setShowAddBrandModal] = useState<boolean>(false);
  const [brandForm, setBrandForm] = useState({
    name: "",
    tier: "Authorized Wholesale",
    category: "General Medicines & Formulations",
    initials: "",
  });

  // Category Add Modal State
  const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  // Customer Drill-down modal state
  const [inspectedCustomer, setInspectedCustomer] = useState<string | null>(null);

  // Simplified Banner Upload State (Image file or URL only)
  const [showAddBannerModal, setShowAddBannerModal] = useState<boolean>(false);
  const [bannerImageUrl, setBannerImageUrl] = useState<string>("");
  const [bannerUploadError, setBannerUploadError] = useState<string>("");
  const bannerFileInputRef = React.useRef<HTMLInputElement>(null);
  const productFileInputRef = React.useRef<HTMLInputElement>(null);

  const refreshAll = () => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());
    setBrands(getStoredBrands());
    setCategories(getStoredCategories());
    const storedOffers = getStoredOffers();
    if (storedOffers && storedOffers.length > 0) {
      setOffers(storedOffers);
    } else {
      setOffers(OFFER_SLIDES);
    }
  };

  useEffect(() => {
    refreshAll();
    const handleUpdate = () => refreshAll();
    window.addEventListener("orders-updated", handleUpdate);
    window.addEventListener("products-updated", handleUpdate);
    window.addEventListener("brands-updated", handleUpdate);
    window.addEventListener("categories-updated", handleUpdate);
    window.addEventListener("offers-updated", handleUpdate);

    return () => {
      window.removeEventListener("orders-updated", handleUpdate);
      window.removeEventListener("products-updated", handleUpdate);
      window.removeEventListener("brands-updated", handleUpdate);
      window.removeEventListener("categories-updated", handleUpdate);
      window.removeEventListener("offers-updated", handleUpdate);
    };
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderRecord["orderStatus"]) => {
    updateOrderStatusInStorage(orderId, newStatus);
    refreshAll();
  };

  const handlePaymentToggle = (orderId: string, currentStatus: OrderRecord["paymentStatus"]) => {
    const nextStatus = currentStatus === "Paid" ? "Pending" : "Paid";
    updateOrderStatusInStorage(orderId, orders.find((o) => o.id === orderId)!.orderStatus, nextStatus);
    refreshAll();
  };

  // --- PRODUCT CRUD HANDLERS ---
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: "",
      genericName: "",
      category: categories[0] || "Generic",
      company: brands[0]?.name || "Alkem",
      packSize: "10 x 10 Strips / Box",
      mrp: 150,
      wholesalePrice: 50,
      scheme: "Regular Wholesale",
      batchNo: `BT-${Math.floor(1000 + Math.random() * 9000)}`,
      expDate: "12/2027",
      hsnCode: "3004",
      inStock: true,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      description: "",
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: ProductItem) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      genericName: prod.genericName,
      category: prod.category,
      company: prod.company,
      packSize: prod.packSize,
      mrp: prod.mrp,
      wholesalePrice: prod.wholesalePrice,
      scheme: prod.scheme || "Regular Wholesale",
      batchNo: prod.batchNo,
      expDate: prod.expDate,
      hsnCode: prod.hsnCode,
      inStock: prod.inStock,
      image: prod.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      description: prod.description || "",
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    let updated: ProductItem[];
    if (editingProductId) {
      updated = products.map((p) =>
        p.id === editingProductId
          ? {
              ...p,
              ...productForm,
              mrp: Number(productForm.mrp) || 0,
              wholesalePrice: Number(productForm.wholesalePrice) || 0,
            }
          : p
      );
    } else {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        ...productForm,
        mrp: Number(productForm.mrp) || 0,
        wholesalePrice: Number(productForm.wholesalePrice) || 0,
      };
      updated = [newProd, ...products];
    }
    setProducts(updated);
    saveProductsToStorage(updated);
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete product "${name}"?`)) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveProductsToStorage(updated);
    }
  };

  const handleToggleProductStock = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, inStock: !p.inStock } : p
    );
    setProducts(updated);
    saveProductsToStorage(updated);
  };

  const handleQuickPriceChange = (id: string, newPrice: number) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, wholesalePrice: newPrice } : p
    );
    setProducts(updated);
    saveProductsToStorage(updated);
  };

  const handleProductImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) {
        setProductForm((prev) => ({ ...prev, image: res }));
      }
    };
    reader.readAsDataURL(file);
  };

  // --- BRAND CRUD HANDLERS ---
  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm.name.trim()) return;

    const initials =
      brandForm.initials.trim() ||
      brandForm.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const newBrand: BrandItem = {
      name: brandForm.name.trim(),
      tier: brandForm.tier.trim() || "Authorized Wholesale",
      category: brandForm.category.trim() || "General Pharma",
      initials,
    };

    const updated = [newBrand, ...brands.filter((b) => b.name.toLowerCase() !== newBrand.name.toLowerCase())];
    setBrands(updated);
    saveBrandsToStorage(updated);
    setShowAddBrandModal(false);
    setBrandForm({
      name: "",
      tier: "Authorized Wholesale",
      category: "General Medicines & Formulations",
      initials: "",
    });
  };

  const handleDeleteBrand = (name: string) => {
    if (window.confirm(`Are you sure you want to delete brand "${name}"?`)) {
      const updated = brands.filter((b) => b.name !== name);
      setBrands(updated);
      saveBrandsToStorage(updated);
    }
  };

  // --- CATEGORY CRUD HANDLERS ---
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      const updated = [...categories, trimmed];
      setCategories(updated);
      saveCategoriesToStorage(updated);
    }
    setShowAddCategoryModal(false);
    setNewCategoryName("");
  };

  const handleDeleteCategory = (cat: string) => {
    if (window.confirm(`Are you sure you want to delete category "${cat}"?`)) {
      const updated = categories.filter((c) => c !== cat);
      setCategories(updated);
      saveCategoriesToStorage(updated);
    }
  };

  // Handle Image File Upload (FileReader -> base64 DataURL)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setBannerUploadError("Please upload a valid image file (PNG, JPG, WebP, etc.)");
      return;
    }

    setBannerUploadError("");
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setBannerImageUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Publish simplified banner
  const handlePublishBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerImageUrl.trim()) {
      setBannerUploadError("Please provide an image by uploading a file or entering an image URL.");
      return;
    }

    const newSlide: OfferSlide = {
      id: `banner-${Date.now()}`,
      imageUrl: bannerImageUrl.trim(),
      title: "Wholesale Promotional Scheme",
      subtitle: "",
      highlight: "",
      code: "",
      badge: "Promotional Banner",
      occasion: "",
      bgGradient: "from-slate-900 to-teal-950",
    };

    const updated = [newSlide, ...offers];
    setOffers(updated);
    saveOffersToStorage(updated);
    setShowAddBannerModal(false);
    setBannerImageUrl("");
    setBannerUploadError("");
  };

  const handleDeleteOffer = (id: string) => {
    const updated = offers.filter((o) => o.id !== id);
    setOffers(updated);
    saveOffersToStorage(updated);
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
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "orders"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Orders & Billing Desk ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "products"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-teal-500" />
            <span>Products Catalog ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("brands")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "brands"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Pharma Brands ({brands.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "categories"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            <span>Categories ({categories.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "customers"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customer Directory ({uniqueChemists.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "offers"
                ? "bg-[#0b1e36] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
            <span>Promotions & Banners ({offers.length})</span>
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

        {/* TAB 2: PRODUCTS CATALOG CRUD */}
        {activeTab === "products" && (
          <div className="space-y-4">
            {/* Header & Add Button */}
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-teal-600" />
                  <span>Medicine Formulations Catalog ({products.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add new formulations, update Price to Retailer (PTR), manage bonus schemes, and toggle stock availability in real-time.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenAddProduct}
                className="bg-[#0b1e36] hover:bg-[#163b65] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Product</span>
              </Button>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search by Medicine, Salt Molecule, Company, Batch..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {["All", ...categories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedProductCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors ${
                      selectedProductCategory === cat
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <th className="p-3">Product & Generic Salt</th>
                    <th className="p-3">Brand & Category</th>
                    <th className="p-3">Pack Size</th>
                    <th className="p-3">Batch / Expiry</th>
                    <th className="p-3 text-right">MRP (₹)</th>
                    <th className="p-3 text-right">PTR Wholesale (₹)</th>
                    <th className="p-3">Bonus Scheme</th>
                    <th className="p-3 text-center">Stock</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products
                    .filter((p) => {
                      if (selectedProductCategory !== "All" && p.category !== selectedProductCategory) return false;
                      if (productSearch.trim()) {
                        const q = productSearch.toLowerCase();
                        return (
                          p.name.toLowerCase().includes(q) ||
                          p.genericName.toLowerCase().includes(q) ||
                          p.company.toLowerCase().includes(q) ||
                          p.batchNo.toLowerCase().includes(q)
                        );
                      }
                      return true;
                    })
                    .map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={prod.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"}
                                alt={prod.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block leading-tight">{prod.name}</span>
                              <span className="text-[10px] text-slate-400 block">{prod.genericName}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 block w-fit">
                              {prod.company}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium block">
                              {prod.category}
                            </span>
                          </div>
                        </td>

                        <td className="p-3 text-slate-600 font-medium">
                          {prod.packSize}
                          <span className="text-[10px] text-slate-400 block">HSN: {prod.hsnCode}</span>
                        </td>

                        <td className="p-3 font-mono text-[11px] text-slate-600">
                          {prod.batchNo}
                          <span className="text-[10px] text-slate-400 block">Exp: {prod.expDate}</span>
                        </td>

                        <td className="p-3 text-right font-mono text-slate-500">
                          ₹{prod.mrp}
                        </td>

                        <td className="p-3 text-right">
                          <input
                            type="number"
                            value={prod.wholesalePrice}
                            onChange={(e) => handleQuickPriceChange(prod.id, parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 text-right font-mono font-bold text-[#0b1e36] rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0b1e36]"
                            title="Edit Wholesale PTR directly"
                          />
                        </td>

                        <td className="p-3">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {prod.scheme || "Regular"}
                          </span>
                        </td>

                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleToggleProductStock(prod.id)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                              prod.inStock
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                                : "bg-red-50 text-red-800 border-red-300 hover:bg-red-100"
                            }`}
                          >
                            {prod.inStock ? "✓ In Stock" : "✕ Out"}
                          </button>
                        </td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenEditProduct(prod)}
                              className="h-7 px-2 text-xs text-slate-700 border-slate-300 hover:bg-slate-100"
                              title="Edit product formulation"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
                              title="Delete product"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PHARMA BRANDS CRUD */}
        {activeTab === "brands" && (
          <div className="space-y-4">
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Authorized Pharmaceutical Brands ({brands.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage medicine manufacturing companies and authorized supply depots.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddBrandModal(true)}
                className="bg-[#0b1e36] hover:bg-[#163b65] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Pharma Brand</span>
              </Button>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {brands.map((brand) => {
                const brandProductsCount = products.filter(
                  (p) => p.company.toLowerCase() === brand.name.toLowerCase()
                ).length;

                return (
                  <Card
                    key={brand.name}
                    className="p-4 border-slate-200 bg-white shadow-xs rounded-xl space-y-3 flex flex-col justify-between hover:border-blue-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-300 font-black text-sm flex items-center justify-center shadow-xs">
                          {brand.initials}
                        </div>
                        <Badge variant="navy" className="text-[10px]">
                          {brand.tier}
                        </Badge>
                      </div>

                      <div className="mt-3">
                        <h4 className="font-black text-sm text-slate-900">{brand.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{brand.category}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 font-medium">
                        {brandProductsCount} Active Product{brandProductsCount !== 1 ? "s" : ""}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBrand(brand.name)}
                        className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORIES CRUD */}
        {activeTab === "categories" && (
          <div className="space-y-4">
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span>Medicine Categories ({categories.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Organize medicines by formulation type or therapeutic therapeutic segment.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setNewCategoryName("");
                  setShowAddCategoryModal(true);
                }}
                className="bg-[#0b1e36] hover:bg-[#163b65] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </Button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {categories.map((cat) => {
                const catProductsCount = products.filter((p) => p.category === cat).length;

                return (
                  <Card
                    key={cat}
                    className="p-4 border-slate-200 bg-white shadow-xs rounded-xl space-y-3 flex flex-col justify-between hover:border-amber-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-slate-900">{cat}</span>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {catProductsCount} Product{catProductsCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Active wholesale category shown in catalog & store filters.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCategory(cat)}
                        className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS DIRECTORY & PURCHASE HISTORY */}
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

        {/* TAB 3: PROMOTIONS & BANNER MANAGER (IMAGE ONLY) */}
        {activeTab === "offers" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-800">
                  Storefront Landscape Hero Banners
                </h3>
                <p className="text-xs text-slate-500">
                  Upload promotional banner images (or paste image URLs). The image covers the entire banner box on the store page with a direct &ldquo;Shop Now&rdquo; button.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setBannerUploadError("");
                  setShowAddBannerModal(true);
                }}
                className="bg-[#0b1e36] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload / Add Banner</span>
              </Button>
            </div>

            {/* Live Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offers.map((off) => (
                <Card
                  key={off.id}
                  className="p-3 rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between bg-white"
                >
                  <div className="relative rounded-xl overflow-hidden mb-3 border border-slate-200 group">
                    {/* Full cover container */}
                    <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden bg-slate-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={off.imageUrl}
                        alt="Store Banner"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />

                      {/* Subtle overlay with Shop Now badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent p-3 flex items-end justify-between pointer-events-none">
                        <span className="text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                          Live on Store
                        </span>
                        <span className="text-[10px] font-bold bg-white text-[#0b1e36] px-3 py-1 rounded-full shadow-md">
                          Shop Now →
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Active Carousel Slide</span>
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteOffer(off.id)}
                      className="h-7 px-2.5 text-xs text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
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

      {/* Product Add / Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1e36]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-extrabold text-base text-[#0b1e36] flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-600" />
                  <span>{editingProductId ? "Edit Product Formulation" : "Add New Medicine Product"}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter medicine formulation details, wholesale pricing, batch information, and packaging.
                </p>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Medicine / Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cefixime 200mg Tablets"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Generic Salt / Molecule Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cefixime Dispersible 200mg"
                    value={productForm.genericName}
                    onChange={(e) => setProductForm({ ...productForm, genericName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Pharma Brand / Company <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={productForm.company}
                    onChange={(e) => setProductForm({ ...productForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  >
                    {brands.map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name} ({b.tier})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Therapeutic Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Pack Size <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 x 10 ALU-ALU Strips"
                    value={productForm.packSize}
                    onChange={(e) => setProductForm({ ...productForm, packSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    MRP (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                </div>

                <div>
                  <label className="font-bold text-teal-700 block mb-1">
                    Wholesale PTR (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.wholesalePrice}
                    onChange={(e) => setProductForm({ ...productForm, wholesalePrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-teal-500 bg-teal-50/50 text-teal-950 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bonus Scheme</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 + 1 Free"
                    value={productForm.scheme}
                    onChange={(e) => setProductForm({ ...productForm, scheme: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Batch Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AK-CF241"
                    value={productForm.batchNo}
                    onChange={(e) => setProductForm({ ...productForm, batchNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11/2027"
                    value={productForm.expDate}
                    onChange={(e) => setProductForm({ ...productForm, expDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">HSN Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3004"
                    value={productForm.hsnCode}
                    onChange={(e) => setProductForm({ ...productForm, hsnCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Availability</label>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="inStockCheck"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 text-[#0b1e36] rounded border-slate-300 focus:ring-[#0b1e36]"
                    />
                    <label htmlFor="inStockCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                      {productForm.inStock ? "Currently In Stock (Available for ordering)" : "Out of Stock"}
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Photo</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Paste image URL (https://...)"
                    value={productForm.image.startsWith("data:") ? "" : productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => productFileInputRef.current?.click()}
                    className="h-9 px-3 text-xs border-slate-300 flex items-center gap-1 shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                  </Button>
                  <input
                    ref={productFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageFile}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Formulation Clinical Description</label>
                <textarea
                  rows={2}
                  placeholder="Optional indication, dosage, storage guidelines..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProductModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#0b1e36] text-white font-bold"
                >
                  {editingProductId ? "Update Formulation" : "Save to Catalog"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brand Add Modal */}
      {showAddBrandModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1e36]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowAddBrandModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h3 className="font-extrabold text-base text-[#0b1e36] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Add Pharmaceutical Brand</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Add an authorized medicine manufacturer company to the agency supply list.
              </p>
            </div>

            <form onSubmit={handleSaveBrand} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Company / Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sun Pharma, Torrent, Glenmark"
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Supply Depot / Wholesale Tier <span className="text-red-500">*</span>
                </label>
                <select
                  value={brandForm.tier}
                  onChange={(e) => setBrandForm({ ...brandForm, tier: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                >
                  <option value="Direct Depot">Direct Depot</option>
                  <option value="Super-Stockist">Super-Stockist</option>
                  <option value="Authorized Wholesale">Authorized Wholesale</option>
                  <option value="Generic Line">Generic Line</option>
                  <option value="Surgical & Health">Surgical & Health</option>
                  <option value="Wholesale Partner">Wholesale Partner</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Key Therapeutic Specialty <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cardiology & Diabetology, Antibiotics & Derma"
                  value={brandForm.category}
                  onChange={(e) => setBrandForm({ ...brandForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Initials / Code (2 Letters)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  placeholder="e.g. SP, GL"
                  value={brandForm.initials}
                  onChange={(e) => setBrandForm({ ...brandForm, initials: e.target.value.toUpperCase() })}
                  className="w-24 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold uppercase focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddBrandModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#0b1e36] text-white font-bold"
                >
                  Save Brand
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Add Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1e36]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowAddCategoryModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h3 className="font-extrabold text-base text-[#0b1e36] flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-600" />
                <span>Add Medicine Category</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Add a formulation category or therapeutic segment.
              </p>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Antibiotics, Cardiac Care, Syrups..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddCategoryModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#0b1e36] text-white font-bold"
                >
                  Save Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simplified Banner Upload Modal - File Upload or URL only */}
      {showAddBannerModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1e36]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowAddBannerModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h3 className="font-extrabold text-base text-[#0b1e36] flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-teal-600" />
                <span>Upload Storefront Banner</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Upload your graphic file or paste an image URL. The banner image will cover the entire frame on the store page with an overlaid &ldquo;Shop Now&rdquo; button.
              </p>
            </div>

            <form onSubmit={handlePublishBanner} className="space-y-4 text-xs">
              {/* Option 1: File Upload Box */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  1. Upload from Computer / Phone
                </label>
                <div
                  onClick={() => bannerFileInputRef.current?.click()}
                  className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/50 hover:bg-teal-50 rounded-xl p-4 text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-7 h-7 mx-auto text-teal-600 mb-1" />
                  <p className="font-bold text-slate-800 text-xs">Click to browse image file</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, WebP (Landscape recommended)</p>
                  <input
                    ref={bannerFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] uppercase font-bold text-slate-400">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Option 2: Image URL */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  2. Paste Direct Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or cloud image link"
                  value={bannerImageUrl.startsWith("data:") ? "" : bannerImageUrl}
                  onChange={(e) => {
                    setBannerImageUrl(e.target.value);
                    setBannerUploadError("");
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[#0b1e36]"
                />
              </div>

              {bannerUploadError && (
                <p className="text-red-600 text-[11px] font-semibold">{bannerUploadError}</p>
              )}

              {/* Live Preview - Covers whole container */}
              {bannerImageUrl && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block text-[11px]">
                    Live Storefront Preview (Cover Full Div):
                  </label>
                  <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bannerImageUrl}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
                      <span className="text-[10px] font-bold text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                        Full Cover Banner
                      </span>
                      <span className="text-[10px] font-bold bg-white text-[#0b1e36] px-2.5 py-1 rounded-full shadow">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowAddBannerModal(false);
                    setBannerImageUrl("");
                    setBannerUploadError("");
                  }}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#0b1e36] text-white font-bold text-xs"
                >
                  Publish Banner to Store
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
