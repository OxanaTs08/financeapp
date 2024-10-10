import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export { transactionSchema };

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
