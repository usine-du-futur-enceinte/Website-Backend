import { Response } from "express";
import { OrderService } from "../services/order.service";
import { AuthenticatedRequest } from "../types/express";

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60f5a5fef9b1a90c8b8d4e2e"
 *         userId:
 *           type: string
 *           example: "60f5a5fef9b1a90c8b8d4e2d"
 *         products:
 *           type: array
 *           items:
 *             type: string
 *             example: "product123"
 *         address:
 *           type: string
 *           example: "123 Rue Exemple, Paris, France"
 *         status:
 *           type: string
 *           example: "pending"
 */

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Créer une nouvelle commande
 *     description: Permet à un utilisateur authentifié de créer une commande avec une liste de produits et une adresse.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "product123"
 *               address:
 *                 type: string
 *                 example: "123 Rue Exemple, Paris, France"
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Utilisateur non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non authentifié"
 *       400:
 *         description: Erreur de création de la commande
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la création de la commande"
 */

/**
 * @openapi
 * /orders/user:
 *   get:
 *     summary: Récupérer les commandes d'un utilisateur
 *     description: Permet de récupérer toutes les commandes d'un utilisateur authentifié.
 *     responses:
 *       200:
 *         description: Liste des commandes de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Utilisateur non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non authentifié"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la récupération des commandes"
 */

/**
 * @openapi
 * /orders/{orderId}:
 *   get:
 *     summary: Récupérer une commande par ID
 *     description: Permet de récupérer une commande spécifique à partir de son ID.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la commande à récupérer.
 *     responses:
 *       200:
 *         description: Commande trouvée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la récupération de la commande"
 */
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

      return res.status(200).json(order);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
