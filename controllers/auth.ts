import express, { Request, Response } from "express";
import User from "../models/userModel";

const router = express.Router();

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, initialBalance } = req.body;
  try {
    const user = new User({ username, initialBalance });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const setBalance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (amount < 0 || typeof amount != "number") {
      return res.status(400).json({
        message: "Sum cannot be negative and should be a number",
      });
    }

    const transaction = {
      type: "income",
      amount,
      date: new Date(),
    };

    await User.findByIdAndUpdate(userId, {
      $set: { currentBalance: user.currentBalance + amount },
      $push: {
        transactions: transaction,
      },
    });
    return res
      .status(200)
      .json({ message: "Current balance is updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addExpense = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      amount < 0 ||
      typeof amount != "number" ||
      amount > user.currentBalance
    ) {
      return res.status(400).json({
        message:
          "Sum cannot be negative and should be a number/more than current balance",
      });
    }
    const transaction = {
      type: "outcome",
      amount,
      date: new Date(),
    };

    await User.findByIdAndUpdate(userId, {
      $set: { currentBalance: user.currentBalance - amount },
      $push: {
        transactions: transaction,
      },
    });
    return res
      .status(200)
      .json({ message: "Current balance is updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBalance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ balance: user.currentBalance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
