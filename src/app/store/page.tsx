"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryScroller } from "@/components/store/category-scroller";
import { OfferCarousel } from "@/components/store/offer-carousel";
import { ProductCard } from "@/components/store/product-card";
import { ProductDetailModal } from "@/components/store/product-detail-modal";
import { CartDrawer } from "@/components/layout/cart-drawer";
import {
  DUMMY_PRODUCTS,
  CARD_COMPANIES,
  ProductItem,
  BrandItem,
  COMPANY_DETAILS,
} from "@/lib/data";
import {
  getStoredCart,
  saveCartToStorage,
  getStoredProducts,
  getStoredBrands,
  CartItem,
} from "@/lib/store";
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
  const [allProducts, setAllProducts] = useState<ProductItem[]>(DUMMY_PRODUCTS);
  const [allCompanies, setAllCompanies] = useState<BrandItem[]>(CARD_COMPANIES);
  const [products, setProducts] = useState<ProductItem[]>(DUMMY_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [companyModalOpen, setCompanyModalOpen] = useState<boolean>(false);
  const [companySearchQuery, setCompanySearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const loadData = () => {
    const prods = getStoredProducts();
    setAllProducts(prods);
    const brands = getStoredBrands();
    setAllCompanies(brands);
  };

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
    loadData();
    syncCart();
    const handleCartUpdate = () => syncCart();
    const handleProductsUpdate = () => loadData();
    const handleBrandsUpdate = () => loadData();

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("products-updated", handleProductsUpdate);
    window.addEventListener("brands-updated", handleBrandsUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("products-updated", handleProductsUpdate);
      window.removeEventListener("brands-updated", handleBrandsUpdate);
    };
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = allProducts;

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
  }, [allProducts, selectedCategory, selectedCompany, searchQuery]);

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

  const filteredCompanies = allCompanies.filter((c) =>
    c.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    c.tier.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-28 md:pb-16 pt-3 sm:pt-5 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-3.5 sm:space-y-5">
        {/* Page Breadcrumb / Active Indicator */}
        <div className="flex items-center justify-between py-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium min-w-0 truncate">
            <Link href="/" className="hover:text-slate-900 transition-colors shrink-0">
              Home
            </Link>
            <span>/</span>
            <span className="font-bold text-[#0b1e36] flex items-center gap-1 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse shrink-0" />
              Wholesale Store
            </span>
          </div>
          <Badge
            variant="outline"
            className="hidden sm:inline-flex text-[10px] sm:text-[11px] bg-teal-50 text-teal-800 font-semibold border-teal-200/80 px-2 py-0.5 rounded-full shrink-0"
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
        </div>

        {/* Company Filter Modal */}
        <Dialog open={companyModalOpen} onOpenChange={setCompanyModalOpen}>
          <DialogContent className="w-[calc(100vw-1.5rem)] max-w-lg p-4 sm:p-5 rounded-2xl max-h-[85vh] overflow-hidden flex flex-col box-border">
            <DialogHeader className="space-y-1 pb-2.5 border-b border-slate-100 pr-6">
              <DialogTitle className="text-base sm:text-lg font-bold text-[#0b1e36] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                Filter by Pharma Company
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Select from our 21+ authorized pharmaceutical depots and direct manufacturing partners.
              </DialogDescription>
            </DialogHeader>

            {/* Search within companies */}
            <div className="py-2.5">
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
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 w-full overflow-x-hidden">
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
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      selectedCompany === "All"
                        ? "bg-teal-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    ★
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold">All 21+ Companies</p>
                    <p
                      className={`text-[10px] truncate ${
                        selectedCompany === "All" ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      Show all formulations from all manufacturers
                    </p>
                  </div>
                </div>
                {selectedCompany === "All" && <Check className="w-4 h-4 text-teal-300 shrink-0 ml-2" />}
              </button>

              {/* Company Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 w-full">
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
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all group w-full min-w-0 ${
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
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0 w-full">
              <button
                onClick={() => {
                  setSelectedCompany("All");
                  setCompanyModalOpen(false);
                }}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 truncate"
              >
                Clear Brand Filter
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCompanyModalOpen(false)}
                className="bg-[#0b1e36] text-white text-xs h-8 px-5 shrink-0"
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
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            ))
          )}
        </div>
      </div>

      {/* Floating Bottom Cart Bar (Floats above mobile bottom nav with ample clearance) */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-30 w-auto max-w-[92vw] animate-in slide-in-from-bottom-4 duration-300 pointer-events-none">
          <div className="pointer-events-auto bg-[#0b1e36]/95 backdrop-blur-md text-white rounded-full py-1.5 px-3 sm:py-2 sm:px-4 shadow-2xl border border-teal-500/50 flex items-center justify-between gap-2.5 sm:gap-3.5">
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 text-left hover:opacity-90 transition-opacity"
            >
              <div className="w-7 h-7 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <div className="leading-none">
                <span className="text-xs font-black text-teal-300">
                  {totalCartItems} Box{totalCartItems !== 1 ? "es" : ""}
                </span>
                <span className="text-[10px] text-slate-300 block mt-0.5">
                  View Cart
                </span>
              </div>
            </button>

            <div className="h-5 w-px bg-white/20 shrink-0" />

            <Button
              variant="accent"
              size="sm"
              asChild
              className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-black text-xs px-3.5 h-7 sm:h-8 rounded-full shadow-xs shrink-0"
            >
              <Link href="/checkout" className="flex items-center gap-1">
                <span>Checkout</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Individual Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        quantity={selectedProduct ? cartQuantities[selectedProduct.id] || 0 : 0}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Global Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </div>
  );
}
