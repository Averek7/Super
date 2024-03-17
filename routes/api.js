const express = require("express");
const router = express.Router();
const {
  startNewTransaction,
  getTransaction,
  updateTransactionStatus,
  listTransactionsForCustomer,
  calculateTotalSalesValueForCustomer,
  addCustomer,
} = require("../database");

router.post("/transactions", async (req, res) => {
  try {
    const { customerId, status, paymentMethods } = req.body;
    const transaction = await startNewTransaction(
      customerId,
      status,
      paymentMethods
    );
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/transactions/:transactionId", async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await getTransaction(transactionId);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/transactions/:transactionId/status", async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { newStatus } = req.body;
    await updateTransactionStatus(transactionId, newStatus);
    res.json({ message: "Transaction status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/transactions/customer/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const transactions = await listTransactionsForCustomer(customerId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/customers/add", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newCustomer = await addCustomer(name, email);
    res.json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/customers/:customerId/total-sales-value", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const totalSalesValue = await calculateTotalSalesValueForCustomer(
      customerId
    );
    res.json({ customerId, totalSalesValue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
