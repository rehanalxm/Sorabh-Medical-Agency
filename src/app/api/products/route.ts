import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { DUMMY_PRODUCTS } from "@/lib/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const company = searchParams.get("company");
    const query = searchParams.get("q");

    const conn = await connectDB();
    if (conn) {
      // If connected to MongoDB Atlas
      const filter: Record<string, unknown> = {};
      if (category && category !== "All") filter.category = category;
      if (company && company !== "All") filter.company = new RegExp(company, "i");
      if (query) {
        filter.$or = [
          { name: new RegExp(query, "i") },
          { genericName: new RegExp(query, "i") },
          { company: new RegExp(query, "i") },
        ];
      }
      const dbProducts = await Product.find(filter).sort({ createdAt: -1 });
      if (dbProducts.length > 0) {
        return NextResponse.json({ success: true, data: dbProducts });
      }
    }

    // Default / fallback catalog
    let filtered = DUMMY_PRODUCTS;
    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (company && company !== "All") {
      filtered = filtered.filter((p) => p.company.toLowerCase() === company.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.genericName.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectDB();
    if (conn) {
      const newProduct = await Product.create(body);
      return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    }
    return NextResponse.json({ success: true, data: body, message: "Demo mode: product created" });
  } catch (error) {
    console.error("Create Product API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
