"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryScroller } from "@/components/store/category-scroller";
import { OfferCarousel } from "@/components/store/offer-carousel";
import { ProductCard } from "@/components/store/product-card";
import { CartDrawer } from "@/components/layout/cart-drawer";
import {
  DUMMY_PRODUCTS,
  CARD_COMPANIES,
  ProductItem,
  COMPANY_DETAILS,
} from "@/lib/data";
import { getStoredCart, saveCartToStorage, CartItem } from "@/lib/store";
import {
  Search,
  X,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Building2,
  Phone,
  SlidersHorizontal,
  Check,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function StorePage() {
  const [products, setProducts] = useState<ProductItem[]>(DUMMY_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [companyModalOpen, setCompanyModalOpen] = useState<boolean>(false);
  const [companySearchQuery, setCompanySearchQuery] = useState<string>("");

  const syncCart = () => {
    const cart = getStoredCart();
    const map: Record<string, number> = {};
    let total = 0;
    cart.forEach((item) => {
      map[item.product.id] = item.quantity;
      total += item.quantity;
    });
    setCartQuantities(map);
    setTotalCartItems(total);
  };

  useEffect(() => {
    syncCart();
    const handleUpdate = () => syncCart();
    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = DUMMY_PRODUCTS;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedCompany !== "All") {
      filtered = filtered.filter(
        (p) => p.company.toLowerCase() === selectedCompany.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.genericName.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q)
      );
    }

    setProducts(filtered);
  }, [selectedCategory, selectedCompany, searchQuery]);

  const handleAddToCart = (product: ProductItem) => {
    const current = getStoredCart();
    const idx = current.findIndex((i) => i.product.id === product.id);
    let updated: CartItem[];

    if (idx > -1) {
      updated = current.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...current, { product, quantity: 1 }];
    }

    saveCartToStorage(updated);
  };

  const handleUpdateQuantity = (product: ProductItem, newQty: number) => {
    const current = getStoredCart();
    let updated: CartItem[];

    if (newQty <= 0) {
      updated = current.filter((i) => i.product.id !== product.id);
    } else {
      updated = current.map((item) =>
        item.product.id === product.id ? { ...item, quantity: newQty } : item
      );
    }

    saveCartToStorage(updated);
  };

  // Filter companies for the modal search
  const filteredCompanies = CARD_COMPANIES.filter((c) =>
    c.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    c.tier.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-28 md:pb-16 pt-3 sm:pt-5 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-3.5 sm:space-y-5">
        {/* Page Breadcrumb / Active Indicator */}
        <div className="flex items-center justify-between py-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="font-bold text-[#0b1e36] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              Wholesale Store
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] sm:text-[11px] bg-teal-50 text-teal-800 font-semibold border-teal-200/80 px-2 py-0.5 rounded-full"
          >
            Form 20B/21B Wholesale Desk
          </Badge>
        </div>

        {/* 1. Promotional Landscape Graphic Carousel */}
        <OfferCarousel />

        {/* 2. Compact Curvy Search & Category Controls */}
        <div id="store-filters" className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs space-y-3 sticky top-14 sm:top-16 z-20 backdrop-blur-md bg-white/95">
          {/* Curvy & Smaller Search Input */}
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicine, salt composition or brand (e.g. Cefixime, Alkem)..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-full border border-slate-200 bg-slate-100/90 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b1e36] focus:bg-white shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Vertical Category Tiles (Icon on top, name below) + Tiny Filter Icon */}
          <CategoryScroller
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCompany={selectedCompany}
            onOpenCompanyFilter={() => setCompanyModalOpen(true)}
          />

          {/* Active Filter Chips & Item Count Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="text-[11px] text-slate-500 font-medium">
                Showing <strong>{products.length}</strong> items
              </span>

              {/* Active Company Chip */}
              {selectedCompany !== "All" && (
                <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-bold px-2 py-0.5 rounded-full animate-in fade-in">
                  <span>Brand: {selectedCompany}</span>
                  <button
                    onClick={() => setSelectedCompany("All")}
                    className="hover:text-teal-950 p-0.5"
                    title="Remove brand filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Active Category Chip */}
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-semibold px-2 py-0.5 rounded-full animate-in fade-in">
                  <span>Type: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-slate-950 p-0.5"
                    title="Remove category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Reset all filters button */}
              {(selectedCompany !== "All" || selectedCategory !== "All" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedCompany("All");
                    setSearchQuery("");
                  }}
                  className="text-[10px] text-red-600 hover:text-red-700 font-bold underline ml-1"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Quick Filter Open Button (if not already opened) */}
            <button
              onClick={() => setCompanyModalOpen(true)}
              className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 shrink-0"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{selectedCompany !== "All" ? selectedCompany : "All 21+ Brands"}</span>
            </button>
          </div>
        </div>

        {/* Company Filter Modal */}
        <Dialog open={companyModalOpen} onOpenChange={setCompanyModalOpen}>
          <DialogContent className="max-w-lg p-5 sm:p-6 rounded-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader className="space-y-1 pb-3 border-b border-slate-100">
              <DialogTitle className="text-lg font-bold text-[#0b1e36] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                Filter by Pharma Company
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Select from our 21+ authorized pharmaceutical depots and direct manufacturing partners.
              </DialogDescription>
            </DialogHeader>

            {/* Search within companies */}
            <div className="py-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={companySearchQuery}
                  onChange={(e) => setCompanySearchQuery(e.target.value)}
                  placeholder="Find company (e.g. Cipla, Alkem, Mankind)..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b1e36]"
                />
              </div>
            </div>

            {/* List / Grid of Companies */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 -mr-1">
              {/* All Companies Option */}
              <button
                onClick={() => {
                  setSelectedCompany("All");
                  setCompanyModalOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                  selectedCompany === "All"
                    ? "bg-[#0b1e36] text-white border-[#0b1e36] shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      selectedCompany === "All"
                        ? "bg-teal-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    ★
                  </div>
                  <div>
                    <p className="text-xs font-bold">All 21+ Companies</p>
                    <p
                      className={`text-[10px] ${
                        selectedCompany === "All" ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      Show all formulations from all manufacturers
                    </p>
                  </div>
                </div>
                {selectedCompany === "All" && <Check className="w-4 h-4 text-teal-300" />}
              </button>

              {/* Company Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {filteredCompanies.map((company) => {
                  const isSelected =
                    selectedCompany.toLowerCase() === company.name.toLowerCase();
                  return (
                    <button
                      key={company.name}
                      onClick={() => {
                        setSelectedCompany(company.name);
                        setCompanyModalOpen(false);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all group ${
                        isSelected
                          ? "bg-teal-50 border-teal-500 text-teal-950 shadow-xs ring-1 ring-teal-500"
                          : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                            isSelected
                              ? "bg-teal-600 text-white"
                              : "bg-slate-100 text-[#0b1e36] group-hover:bg-slate-200"
                          }`}
                        >
                          {company.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate text-[#0b1e36]">
                            {company.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {company.category}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 ml-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {filteredCompanies.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-500">
                  No company matching &ldquo;{companySearchQuery}&rdquo;
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedCompany("All");
                  setCompanyModalOpen(false);
                }}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Clear Brand Filter
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCompanyModalOpen(false)}
                className="bg-[#0b1e36] text-white text-xs h-8 px-4"
              >
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 3. 2-Column Mobile / 4-Column Desktop Product Grid */}
        <div id="catalog-products" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <p className="text-sm font-bold text-slate-800">
                No medicines found matching your filters.
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for a different composition or clear active category filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedCompany("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cartQuantities[product.id] || 0}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))
          )}
        </div>
      </div>

      {/* Floating Bottom Cart Bar for Quick Checkout on Mobile */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-14 md:bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4 animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#0b1e36] text-white rounded-2xl p-3 sm:p-3.5 shadow-xl border border-teal-500/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0d9488] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-teal-300">
                  {totalCartItems} Box{totalCartItems !== 1 ? "es" : ""} in Cart
                </p>
                <p className="text-[10px] text-slate-300">
                  Click to review and generate tax bill
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCartDrawerOpen(true)}
                className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700 text-xs px-2.5 h-8"
              >
                Review
              </Button>
              <Button
                variant="accent"
                size="sm"
                asChild
                className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold text-xs px-3 h-8"
              >
                <Link href="/checkout" className="flex items-center gap-1">
                  <span>Checkout</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Global Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </div>
  );
}
