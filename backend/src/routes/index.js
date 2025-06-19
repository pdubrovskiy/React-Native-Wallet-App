import express from "express";
import { transactionRoutes } from "./transaction.routes.js";

export const routes = express.Router();

// API routes
routes.use("/api/transactions", transactionRoutes);
