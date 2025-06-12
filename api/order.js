const express = require("express");
const serverless = require("serverless-http");

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require("../backend/controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../backend/middleware/auth");

const app = express();
app.use(express.json());

const router = express.Router();

// User routes
router.post("/order/new", isAuthenticatedUser, newOrder);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/orders/me", isAuthenticatedUser, myOrders);

// Admin routes
router.get("/admin/orders", isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

// Mount the router under a base path
app.use("/api/orders", router);

module.exports = serverless(app);
