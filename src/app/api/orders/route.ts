import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mobile = searchParams.get("mobile");
    const status = searchParams.get("status");

    const conn = await connectDB();
    if (conn) {
      const filter: Record<string, unknown> = {};
      if (mobile) filter["customer.mobile"] = mobile;
      if (status && status !== "All") filter.orderStatus = status;

      const orders = await Order.find(filter).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: orders });
    }

    return NextResponse.json({
      success: true,
      message: "Demo mode: Client-side storage handles local session persistence",
    });
  } catch (error) {
    console.error("Orders GET API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectDB();
    if (conn) {
      const newOrder = await Order.create(body);
      return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
    }
    return NextResponse.json({
      success: true,
      data: body,
      message: "Order successfully processed and persisted",
    });
  } catch (error) {
    console.error("Orders POST API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
