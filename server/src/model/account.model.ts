import mongoose, { Document } from "mongoose";
import { IAccount } from "../interface/account.interface";

interface IDocument extends Document, IAccount {}

const accountSchema = new mongoose.Schema<IDocument>({
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

export default mongoose.model("account", accountSchema);
