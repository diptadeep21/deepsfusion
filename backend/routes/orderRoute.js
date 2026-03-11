import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const orderRouter = express.Router();

/* =========================
   USER ROUTES
========================= */
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/my-orders", authMiddleware, getMyOrders);

/* =========================
   ADMIN ROUTES
========================= */
orderRouter.get("/all", authMiddleware, adminMiddleware, getAllOrders);

// ✅ UPDATE ORDER STATUS
orderRouter.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

// ✅ DELETE ORDER
orderRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrder
);

export default orderRouter;
