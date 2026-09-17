import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  genericName: string;
  category: "Generic" | "Surgical" | "Ayurvedic" | "OTC";
  company: string;
  packSize: string;
  mrp: number;
  wholesalePrice: number;
  scheme?: string;
  batchNo: string;
  expDate: string;
  hsnCode: string;
  inStock: boolean;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    genericName: { type: String, required: true, index: true },
    category: {
      type: String,
      enum: ["Generic", "Surgical", "Ayurvedic", "OTC"],
      required: true,
      index: true,
    },
    company: { type: String, required: true, index: true },
    packSize: { type: String, required: true },
    mrp: { type: Number, required: true },
    wholesalePrice: { type: Number, required: true },
    scheme: { type: String },
    batchNo: { type: String, required: true },
    expDate: { type: String, required: true },
    hsnCode: { type: String, default: "3004" },
    inStock: { type: Boolean, default: true },
    image: { type: String, required: true },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
