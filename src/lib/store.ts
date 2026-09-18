"use client";

import { useState, useEffect } from "react";
import { ProductItem, DUMMY_PRODUCTS, BrandItem, CARD_COMPANIES } from "./data";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  orderDate: string;
  customer: {
    pharmacyName: string;
    chemistName: string;
    mobile: string;
    address: string;
    dlNumber?: string;
    gstin?: string;
  };
  items: {
    productId: string;
    name: string;
    company: string;
    packSize: string;
    hsnCode: string;
    batchNo: string;
    expDate: string;
    mrp: number;
    wholesalePrice: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  paymentMethod: "COD" | "UPI";
  paymentStatus: "Pending" | "Paid";
  utrNumber?: string;
  orderStatus: "Pending" | "Confirmed" | "Dispatched" | "Delivered";
}

const CART_STORAGE_KEY = "sms_wholesale_cart_v1";
const ORDERS_STORAGE_KEY = "sms_wholesale_orders_v1";

// Initial Demo Sample Orders so the demo has purchase history immediately
const INITIAL_SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: "SMS-BGP-1082",
    orderDate: "16 Sep 2026, 04:30 PM",
    customer: {
      pharmacyName: "Maa Tara Medical Hall",
      chemistName: "Rajesh Sharma",
      mobile: "9835012345",
      address: "Station Road, Near Town Hall, Bhagalpur - 812001",
      dlNumber: "DL-20B-1849/BGP",
      gstin: "10ABCPR8491C1Z4"
    },
    items: [
      {
        productId: "prod-1",
        name: "Cefixime 200mg Tablets",
        company: "Alkem",
        packSize: "10 x 10 Strips / Box",
        hsnCode: "3004",
        batchNo: "AK-CF241",
        expDate: "11/2027",
        mrp: 1450,
        wholesalePrice: 480,
        quantity: 5,
        total: 2400
      },
      {
        productId: "prod-3",
        name: "Paracetamol 650mg Fast Action",
        company: "Cipla",
        packSize: "20 x 15 Tablets Blister",
        hsnCode: "3004",
        batchNo: "CP-PC441",
        expDate: "03/2028",
        mrp: 420,
        wholesalePrice: 190,
        quantity: 10,
        total: 1900
      },
      {
        productId: "prod-7",
        name: "Disposable Sterile Syringes 5ml with Needle",
        company: "Safeone",
        packSize: "Box of 100 Pcs",
        hsnCode: "9018",
        batchNo: "SO-SY501",
        expDate: "12/2029",
        mrp: 650,
        wholesalePrice: 290,
        quantity: 3,
        total: 870
      }
    ],
    subtotal: 5170,
    gstAmount: 620.4,
    totalAmount: 5790,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    orderStatus: "Confirmed"
  },
  {
    id: "SMS-BGP-1081",
    orderDate: "14 Sep 2026, 11:15 AM",
    customer: {
      pharmacyName: "Sanjivani Chemist & Druggist",
      chemistName: "Prakash Verma",
      mobile: "9431098765",
      address: "Tilkamanjhi Chowk, Hospital Road, Bhagalpur - 812002",
      dlNumber: "DL-20B-9023/BGP",
      gstin: "10BBVPA9023D1Z9"
    },
    items: [
      {
        productId: "prod-4",
        name: "Amoxycillin & Pot. Clavulanate 625",
        company: "Mankind",
        packSize: "10 x 1 x 6 Strips Strip Pack",
        hsnCode: "3004",
        batchNo: "MK-CV810",
        expDate: "01/2027",
        mrp: 1650,
        wholesalePrice: 620,
        quantity: 4,
        total: 2480
      },
      {
        productId: "prod-11",
        name: "Herbal Cough & Bronchial Relief Syrup",
        company: "Torque",
        packSize: "Pack of 12 Bottles (100ml each)",
        hsnCode: "3003",
        batchNo: "TQ-HC101",
        expDate: "04/2027",
        mrp: 1320,
        wholesalePrice: 580,
        quantity: 2,
        total: 1160
      }
    ],
    subtotal: 3640,
    gstAmount: 436.8,
    totalAmount: 4077,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    utrNumber: "UPI/328192839102",
    orderStatus: "Delivered"
  }
];

export function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read cart from localStorage", e);
    return [];
  }
}

export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
}

export function getStoredOrders(): OrderRecord[] {
  if (typeof window === "undefined") return INITIAL_SAMPLE_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
      return INITIAL_SAMPLE_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read orders from localStorage", e);
    return INITIAL_SAMPLE_ORDERS;
  }
}

export function saveOrdersToStorage(orders: OrderRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event("orders-updated"));
  } catch (e) {
    console.error("Failed to save orders to localStorage", e);
  }
}

export function createNewOrder(orderData: Omit<OrderRecord, "id" | "orderDate">): OrderRecord {
  const currentOrders = getStoredOrders();
  const nextNumber = 1083 + currentOrders.length;
  const newId = `SMS-BGP-${nextNumber}`;
  
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) + ", " + now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const completeOrder: OrderRecord = {
    ...orderData,
    id: newId,
    orderDate: dateStr
  };

  const updatedOrders = [completeOrder, ...currentOrders];
  saveOrdersToStorage(updatedOrders);
  saveCartToStorage([]); // empty cart
  return completeOrder;
}

export function updateOrderStatusInStorage(
  orderId: string,
  newStatus: OrderRecord["orderStatus"],
  newPaymentStatus?: OrderRecord["paymentStatus"]
): void {
  const currentOrders = getStoredOrders();
  const updated = currentOrders.map((ord) => {
    if (ord.id === orderId) {
      return {
        ...ord,
        orderStatus: newStatus,
        paymentStatus: newPaymentStatus || ord.paymentStatus
      };
    }
    return ord;
  });
  saveOrdersToStorage(updated);
}

export function reorderItems(order: OrderRecord): number {
  const currentCart = getStoredCart();
  const products = getStoredProducts();
  
  const updatedCart = [...currentCart];
  let itemsAdded = 0;

  for (const item of order.items) {
    const existingIndex = updatedCart.findIndex(c => c.product.id === item.productId);
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += item.quantity;
    } else {
      // Find full product or create fallback
      const foundProduct = products.find(p => p.id === item.productId) || {
        id: item.productId,
        name: item.name,
        genericName: item.name,
        category: "Generic" as const,
        company: item.company,
        packSize: item.packSize,
        mrp: item.mrp,
        wholesalePrice: item.wholesalePrice,
        batchNo: item.batchNo,
        expDate: item.expDate,
        hsnCode: item.hsnCode,
        inStock: true,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        description: `Wholesale pack of ${item.name}`
      };
      updatedCart.push({
        product: foundProduct,
        quantity: item.quantity
      });
    }
    itemsAdded += item.quantity;
  }

  saveCartToStorage(updatedCart);
  return itemsAdded;
}

const RETAILER_PROFILE_KEY = "sms_retailer_profile_v1";

export interface RetailerProfile {
  pharmacyName: string;
  chemistName: string;
  mobile: string;
  address: string;
  dlNumber: string;
  gstin: string;
}

const DEFAULT_RETAILER: RetailerProfile = {
  pharmacyName: "Maa Tara Medical Hall",
  chemistName: "Rajesh Sharma",
  mobile: "9835012345",
  address: "Station Road, Near Town Hall, Bhagalpur - 812001",
  dlNumber: "DL-20B-1849/BGP",
  gstin: "10ABCPR8491C1Z4"
};

export function getStoredRetailerProfile(): RetailerProfile {
  if (typeof window === "undefined") return DEFAULT_RETAILER;
  try {
    const raw = localStorage.getItem(RETAILER_PROFILE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_RETAILER;
  } catch (e) {
    return DEFAULT_RETAILER;
  }
}

export function saveRetailerProfile(profile: RetailerProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RETAILER_PROFILE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("retailer-profile-updated"));
  } catch (e) {
    console.error("Failed to save retailer profile", e);
  }
}

const OFFERS_STORAGE_KEY = "sms_wholesale_offers_v1";

export function getStoredOffers() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(OFFERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveOffersToStorage(offers: any[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(OFFERS_STORAGE_KEY, JSON.stringify(offers));
    window.dispatchEvent(new Event("offers-updated"));
  } catch (e) {
    console.error("Failed to save offers", e);
  }
}

const PRODUCTS_STORAGE_KEY = "sms_wholesale_products_v1";

export function getStoredProducts(): ProductItem[] {
  if (typeof window === "undefined") return DUMMY_PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return DUMMY_PRODUCTS;
    return JSON.parse(raw);
  } catch (e) {
    return DUMMY_PRODUCTS;
  }
}

export function saveProductsToStorage(products: ProductItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event("products-updated"));
  } catch (e) {
    console.error("Failed to save products", e);
  }
}

const BRANDS_STORAGE_KEY = "sms_wholesale_brands_v1";

export function getStoredBrands(): BrandItem[] {
  if (typeof window === "undefined") return CARD_COMPANIES;
  try {
    const raw = localStorage.getItem(BRANDS_STORAGE_KEY);
    if (!raw) return CARD_COMPANIES;
    return JSON.parse(raw);
  } catch (e) {
    return CARD_COMPANIES;
  }
}

export function saveBrandsToStorage(brands: BrandItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BRANDS_STORAGE_KEY, JSON.stringify(brands));
    window.dispatchEvent(new Event("brands-updated"));
  } catch (e) {
    console.error("Failed to save brands", e);
  }
}

const CATEGORIES_STORAGE_KEY = "sms_wholesale_categories_v1";
export const DEFAULT_CATEGORIES: string[] = ["Generic", "Surgical", "Ayurvedic", "OTC"];

export function getStoredCategories(): string[] {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES;
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!raw) return DEFAULT_CATEGORIES;
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
}

export function saveCategoriesToStorage(categories: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    window.dispatchEvent(new Event("categories-updated"));
  } catch (e) {
    console.error("Failed to save categories", e);
  }
}


