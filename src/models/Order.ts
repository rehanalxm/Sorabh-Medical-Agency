import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
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
}

export interface IOrderCustomer {
  pharmacyName: string;
  chemistName: string;
  mobile: string;
  address: string;
  dlNumber?: string;
  gstin?: string;
}

export interface IOrder extends Document {
  orderId: string;
  customer: IOrderCustomer;
  items: IOrderItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  paymentMethod: "COD" | "Razorpay" | "UPI";
  paymentStatus: "Pending" | "Paid" | "Failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  utrNumber?: string;
  orderStatus: "Pending" | "Confirmed" | "Dispatched" | "Delivered" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: {
      pharmacyName: { type: String, required: true },
      chemistName: { type: String, required: true },
      mobile: { type: String, required: true, index: true },
      address: { type: String, required: true },
      dlNumber: { type: String, default: "" },
      gstin: { type: String, default: "" },
    },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        company: { type: String, required: true },
        packSize: { type: String, required: true },
        hsnCode: { type: String, default: "3004" },
        batchNo: { type: String, required: true },
        expDate: { type: String, required: true },
        mrp: { type: Number, required: true },
        wholesalePrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay", "UPI"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    utrNumber: { type: String },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"],
      default: "Confirmed",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
