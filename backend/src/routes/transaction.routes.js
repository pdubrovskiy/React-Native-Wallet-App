import express from "express";
import {
  createTransaction,
  getTransactionsByUserId,
  deleteTransaction,
  getTransactionSummary,
} from "../controllers/transaction.controller.js";

export const transactionRoutes = express.Router();

// Transaction routes
transactionRoutes.post("/", createTransaction);
transactionRoutes.get("/:userId", getTransactionsByUserId);
transactionRoutes.delete("/:id", deleteTransaction);
transactionRoutes.get("/summary/:userId", getTransactionSummary);
