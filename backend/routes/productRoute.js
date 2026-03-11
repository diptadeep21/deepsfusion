import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct
} from "../controllers/productController.js";

import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const productRouter = express.Router();

// ✅ ADMIN ONLY: Add product
productRouter.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addProduct
);

// ✅ ADMIN ONLY: Remove product
productRouter.post(
  "/remove",
  authMiddleware,
  adminMiddleware,
  removeProduct
);

// 🌍 PUBLIC: Get single product
productRouter.post("/single", singleProduct);

// 🌍 PUBLIC: List products
productRouter.get("/list", listProducts);

export default productRouter;
