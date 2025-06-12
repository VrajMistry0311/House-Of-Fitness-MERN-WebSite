const express = require("express");
const serverless = require("serverless-http");

const {
  processPayment,
  sendStripeApiKey
} = require("../backend/controllers/paymentController");

const { isAuthenticatedUser } = require("../backend/middleware/auth");

const app = express();
app.use(express.json());

const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);
router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

// Mount under `/api/payment`
app.use("/api/payment", router);

module.exports = serverless(app);
