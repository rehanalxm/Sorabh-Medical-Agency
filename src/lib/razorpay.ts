import crypto from "crypto";

export interface RazorpayOrderOptions {
  amount: number; // in paise (e.g. 50000 = ₹500.00)
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  try {
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
    return generatedSignature === signature;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

export const RAZORPAY_CONFIG = {
  keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_key",
  keySecret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_placeholder_secret",
  merchantName: "Saurav Medical Agency",
  currency: "INR",
};
