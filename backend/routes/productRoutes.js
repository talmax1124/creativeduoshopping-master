import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  deleteProductReview,
  getTopProducts,
  getProductsByCategory,
  getProductsByBrand,
  getLatestProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router.get("/latest", getLatestProducts);

router
  .route("/:id/reviews")
  .post(protect, createProductReview)
  .delete(protect, deleteProductReview);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route("/category/:category").get(getProductsByCategory);
router.route("/brand/:brand").get(getProductsByBrand);


export default router;
