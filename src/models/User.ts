import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  role: "admin" | "chemist";
  pharmacyName?: string;
  dlNumber?: string;
  gstin?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true, index: true },
    role: { type: String, enum: ["admin", "chemist"], default: "chemist" },
    pharmacyName: { type: String },
    dlNumber: { type: String },
    gstin: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
