import { TransactionModel } from "../models/transaction.model.js";

export class TransactionService {
  static async createTransaction(transactionData) {
    return await TransactionModel.create(transactionData);
  }

  static async getTransactionsByUserId(userId) {
    return await TransactionModel.findByUserId(userId);
  }

  static async deleteTransaction(id) {
    return await TransactionModel.deleteById(id);
  }

  static async getTransactionSummary(userId) {
    return await TransactionModel.getSummary(userId);
  }
}
