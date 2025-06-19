import { sql } from "../config/db.js";

export class TransactionModel {
  static async create({ title, amount, category, user_id }) {
    const transaction = await sql`
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `;
    return transaction[0];
  }

  static async findByUserId(userId) {
    const transactions = await sql`
      SELECT * FROM transactions 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    return transactions;
  }

  static async deleteById(id) {
    const deletedTransaction = await sql`
      DELETE FROM transactions 
      WHERE id = ${id}
      RETURNING *
    `;
    return deletedTransaction.length > 0 ? deletedTransaction[0] : null;
  }

  static async getSummary(userId) {
    const summaryResult = await sql`
      SELECT 
        COALESCE(SUM(amount), 0) as balance,
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) as income,
        COALESCE(SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END), 0) as expenses
      FROM transactions 
      WHERE user_id = ${userId}
    `;
    return summaryResult[0];
  }
}
