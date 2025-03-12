import { Order } from "../models/order.model";

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: L'identifiant unique de la commande.
 *           example: "660a7b99e3b8a76dcd94a123"
 *         user:
 *           type: string
 *           description: L'identifiant de l'utilisateur ayant passé la commande.
 *           example: "60c5e58b57b24f2b7a8e14d9"
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du produit.
 *                 example: "Clavier mécanique"
 *               quantity:
 *                 type: integer
 *                 description: La quantité commandée.
 *                 example: 2
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Le prix unitaire du produit.
 *                 example: 79.99
 *         totalPrice:
 *           type: number
 *           format: float
 *           description: Le prix total de la commande.
 *           example: 159.98
 *         address:
 *           type: string
 *           description: L'adresse de livraison.
 *           example: "123 rue des Lilas, Paris, France"
 *         date:
 *           type: string
 *           format: date-time
 *           description: La date de création de la commande.
 *           example: "2025-03-12T14:30:00Z"
 */

export class OrderService {
  /**
   * @openapi
   * /orders:
   *   post:
   *     summary: Créer une nouvelle commande
   *     description: Permet à un utilisateur authentifié de créer une commande.
   *     tags:
   *       - Orders
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: string
   *                 description: L'ID de l'utilisateur.
   *                 example: "60c5e58b57b24f2b7a8e14d9"
   *               products:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     name:
   *                       type: string
   *                       example: "Clavier mécanique"
   *                     quantity:
   *                       type: integer
   *                       example: 2
   *                     price:
   *                       type: number
   *                       format: float
   *                       example: 79.99
   *               address:
   *                 type: string
   *                 example: "123 rue des Lilas, Paris, France"
   *     responses:
   *       201:
   *         description: Commande créée avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Order"
   *       400:
   *         description: Erreur dans la requête.
   */
  static async createOrder(userId: string, products: any[], address: string) {
    if (!products || products.length === 0) {
      throw new Error("Aucun produit dans la commande.");
    }

    const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = new Order({
      user: userId,
      products,
      totalPrice,
      address,
    });

    await order.save();
    return order;
  }

  /**
   * @openapi
   * /orders:
   *   get:
   *     summary: Récupérer les commandes d'un utilisateur
   *     description: Retourne toutes les commandes associées à un utilisateur.
   *     tags:
   *       - Orders
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Liste des commandes récupérée avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/Order"
   *       401:
   *         description: Non authentifié.
   */
  static async getOrdersByUser(userId: string) {
    return await Order.find({ user: userId }).populate("user", "email");
  }

  /**
   * @openapi
   * /orders/{orderId}:
   *   get:
   *     summary: Récupérer une commande par ID
   *     description: Retourne les détails d'une commande spécifique.
   *     tags:
   *       - Orders
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: orderId
   *         required: true
   *         schema:
   *           type: string
   *         description: L'identifiant unique de la commande.
   *     responses:
   *       200:
   *         description: Détails de la commande récupérés avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Order"
   *       404:
   *         description: Commande non trouvée.
   */
  static async getOrderById(orderId: string) {
    return await Order.findById(orderId).populate("user", "email");
  }
}
