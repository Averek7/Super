const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "user123",
  password: "pass123",
  database: "test",
});

async function query(text, params) {
  const { rows } = await pool.query(text, params);
  return rows;
}

async function createTransaction(customerId, status) {
  const queryText =
    "INSERT INTO transactions (customer_id, status) VALUES ($1, $2) RETURNING *";
  const values = [customerId, status];
  return await query(queryText, values);
}

async function getTransaction(transactionId) {
  const queryText = "SELECT * FROM transactions WHERE transaction_id = $1";
  const values = [transactionId];
  return await query(queryText, values);
}

async function updateTransactionStatus(transactionId, newStatus) {
  const queryText =
    "UPDATE transactions SET status = $1 WHERE transaction_id = $2 RETURNING *";
  const values = [newStatus, transactionId];
  return await query(queryText, values);
}

async function startNewTransaction(customerId, status, paymentMethods) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const transaction = await createTransaction(customerId, status);
    const transactionId = transaction[0].transaction_id;
    for (const method of paymentMethods) {
      const { method_type, amount } = method;
      await client.query(
        "INSERT INTO PaymentMethods (transaction_id, method_type, amount) VALUES ($1, $2, $3)",
        [transactionId, method_type, amount]
      );
    }
    await client.query("COMMIT");
    return transaction;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function listTransactionsForCustomer(customerId) {
  const queryText =
    "SELECT transaction_id, status, SUM(amount) AS total_amount FROM transactions LEFT JOIN PaymentMethods USING (transaction_id) WHERE customer_id = $1 GROUP BY transaction_id, status";
  const values = [customerId];
  return await query(queryText, values);
}

async function calculateTotalSalesValueForCustomer(customerId) {
  const queryText =
    "SELECT SUM(amount) AS total_sales_value FROM transactions LEFT JOIN PaymentMethods USING (transaction_id) WHERE customer_id = $1";
  const values = [customerId];
  const result = await query(queryText, values);
  return result[0].total_sales_value;
}

async function addCustomer(name, email) {
  const queryText =
    "INSERT INTO Customers (name, email) VALUES ($1, $2) RETURNING *";
  const values = [name, email];
  return await query(queryText, values);
}

module.exports = {
  createTransaction,
  getTransaction,
  updateTransactionStatus,
  startNewTransaction,
  listTransactionsForCustomer,
  calculateTotalSalesValueForCustomer,
  addCustomer
};
