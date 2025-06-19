import { TransactionService } from "../services/transaction.service.js";
import {
  validateTransactionData,
  validateUserId,
  validateTransactionId,
} from "../utils/validation.js";

export const createTransaction = async (req, res) => {
  try {
    const validation = validateTransactionData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const transaction = await TransactionService.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(500).json({ message: "Error creating transaction" });
  }
};

export const getTransactionsByUserId = async (req, res) => {
  try {
    const validation = validateUserId(req.params.userId);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const transactions = await TransactionService.getTransactionsByUserId(
      req.params.userId
    );
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const validation = validateTransactionId(req.params.id);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const deletedTransaction = await TransactionService.deleteTransaction(
      req.params.id
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.log("Error deleting transaction:", error);
    res.status(500).json({ message: "Error deleting transaction" });
  }
};

export const getTransactionSummary = async (req, res) => {
  try {
    const validation = validateUserId(req.params.userId);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const summary = await TransactionService.getTransactionSummary(
      req.params.userId
    );
    res.status(200).json(summary);
  } catch (error) {
    console.log("Error fetching summary:", error);
    res.status(500).json({ message: "Error fetching summary" });
  }
};
