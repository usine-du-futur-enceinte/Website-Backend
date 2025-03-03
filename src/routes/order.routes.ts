import express from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/createOrder", authMiddleware, OrderController.createOrder);
router.get("/orders", authMiddleware, OrderController.getOrdersByUser);
router.get("/orders/:orderId", authMiddleware, OrderController.getOrderById);

export default router;