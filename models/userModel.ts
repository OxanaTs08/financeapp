import mongoose from "mongoose";
import { transactionSchema } from "./transactionModel";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  initialBalance: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

export { userSchema };

const User = mongoose.model("User", userSchema);

export default User;
