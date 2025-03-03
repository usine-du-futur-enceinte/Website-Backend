import { Response } from "express";
import { OrderService } from "../services/order.service";
import { AuthenticatedRequest } from "../types/express";

export class OrderController {
  static async createOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const { products, address } = req.body;
      if (!req.user) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
      }

      const userId = req.user.id; // Maintenant TypeScript reconnaît req.user
      const order = await OrderService.createOrder(userId, products, address);
      return res.status(201).json(order);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getOrdersByUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
      }

      const orders = await OrderService.getOrdersByUser(req.user.id);
      return res.status(200).json(orders);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getOrderById(req: AuthenticatedRequest, res: Response) {
    try {
      const { orderId } = req.params;
      const order = await OrderService.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }

      return res.status(200).json(order);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
