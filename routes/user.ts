import { Router } from "express";
import {
  setBalance,
  createUser,
  addExpense,
  getBalance,
} from "../controllers/auth";

const router = Router();

router.post("/", createUser as any);
router.post("/set-balance", setBalance as any);
router.post("/add-expense", addExpense as any);
router.get("/get-balance/:userId", getBalance as any);
export default router;
