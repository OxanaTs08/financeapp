import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { runApp } from "./db/index";
import userRouter from "./routes/user";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/user", userRouter);

dotenv.config({ path: ".env" });
const port = 4001;
const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017/finance";

runApp(() => {
  app.listen(port, async () => {
    console.log(`Server is running at port : ${port}`);
  });
});
