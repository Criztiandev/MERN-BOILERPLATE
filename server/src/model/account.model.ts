import mongoose, { Document } from "mongoose";
import { IAccount } from "../interface/account.interface";

export interface IAccountDocument extends Document, IAccount {}

const accountSchema = new mongoose.Schema<IAccountDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bod: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
});

// Pre-save hook to lowercase string fields
accountSchema.pre("save", function (next) {
  const doc = this as IAccountDocument;

  // Lowercase specific fields
  doc.firstName = doc.firstName.toLowerCase();
  doc.lastName = doc.lastName.toLowerCase();
  doc.email = doc.email.toLowerCase();
  doc.role = doc?.role?.toLowerCase() || "user";

  next();
});

export default mongoose.model<IAccountDocument>("account", accountSchema);
