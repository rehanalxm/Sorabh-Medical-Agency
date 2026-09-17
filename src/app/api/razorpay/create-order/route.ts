import { NextResponse } from "next/server";
import { RAZORPAY_CONFIG } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const { amount, receipt, notes } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order amount" },
        { status: 400 }
      );
    }

    // In production, instantiate Razorpay SDK:
    // const instance = new Razorpay({ key_id: RAZORPAY_CONFIG.keyId, key_secret: RAZORPAY_CONFIG.keySecret });
    // const order = await instance.orders.create({ amount: Math.round(amount * 100), currency: "INR", receipt });
    
    // Test/Demo Mock order generator that mimics Razorpay API response
    const mockRazorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return NextResponse.json({
      success: true,
      data: {
        id: mockRazorpayOrderId,
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: receipt || `rcpt_${Date.now()}`,
        keyId: RAZORPAY_CONFIG.keyId,
        merchantName: RAZORPAY_CONFIG.merchantName,
      },
    });
  } catch (error) {
    console.error("Razorpay order generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
