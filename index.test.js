const request = require("supertest");
const app = require("./index");

describe("POST /customers/add", () => {
  test("adds a new customer", async () => {
    const response = await request(app)
      .post("/customers/add")
      .send({ name: "John Doe", email: "john@example.com" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(customerId);
  });
});

describe("GET /customers/:customerId/total-sales-value", () => {
  test("returns total sales value for a customer", async () => {
    const response = await request(app).get("/customers/1/total-sales-value");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("customerId", 1);
  });
});

describe("POST /transactions", () => {
  test("creates a new transaction", async () => {
    const response = await request(app)
      .post("/transactions")
      .send({
        customerId: 3,
        status: "Pending",
        paymentMethods: [{ method_type: "Credit Card", amount: 50 }],
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("transactionId");
  });
});

describe("GET /transactions/:transactionId", () => {
  test("returns details of a specific transaction", async () => {
    const response = await request(app).get("/transactions/4");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty({ transactionId: 4 });
  });
});


describe("PUT /transactions/:transactionId/status", () => {
  test("updates the status of a transaction", async () => {
    const response = await request(app)
      .put("/transactions/4/status")
      .send({ newStatus: "Completed" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Transaction status updated successfully",
    });
  });
});
