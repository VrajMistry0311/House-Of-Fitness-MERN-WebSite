const express = require("express");
const serverless = require("serverless-http");

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts
} = require("../backend/controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../backend/middleware/auth");

const app = express();
app.use(express.json());

const router = express.Router();

router.get("/products", getAllProducts);

router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.get("/product/:id", getProductDetails);

router.put("/review", isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

// Mount the router under a base path
app.use("/api/products", router);

module.exports = serverless(app);
