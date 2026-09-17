import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conn = await connectDB();
    if (conn) {
      const order = await Order.findOne({ orderId: id });
      if (order) {
        return NextResponse.json({ success: true, data: order });
      }
    }
    return NextResponse.json({ success: true, message: "Order processed" });
  } catch (error) {
    console.error("Order GET by ID error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const conn = await connectDB();
    if (conn) {
      const updated = await Order.findOneAndUpdate(
        { orderId: id },
        { $set: body },
        { new: true }
      );
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
