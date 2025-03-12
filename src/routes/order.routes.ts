import express from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/createOrder", authMiddleware, OrderController.createOrder);
router.get("/orders", authMiddleware, OrderController.getOrdersByUser);
router.get("/orders/:orderId", authMiddleware, OrderController.getOrderById);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateOrderRequest:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du produit.
 *                 example: "Produit A"
 *               quantity:
 *                 type: integer
 *                 description: Quantité du produit.
 *                 example: 2
 *               price:
 *                 type: number
 *                 description: Prix du produit.
 *                 example: 15.50
 *         address:
 *           type: string
 *           description: L'adresse de livraison.
 *           example: "123 rue Exemple, Ville, Pays"
 *   responses:
 *     201:
 *       description: Commande créée avec succès.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Identifiant unique de la commande.
 *                 example: "60c5e58b57b24f2b7a8e14d9"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Produit A"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 15.50
 *               totalPrice:
 *                 type: number
 *                 description: Prix total de la commande.
 *                 example: 31.00
 *               address:
 *                 type: string
 *                 example: "123 rue Exemple, Ville, Pays"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-12T15:30:00Z"
 *     400:
 *       description: Mauvaise demande (par exemple, produits manquants ou adresse invalide).
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Paramètres manquants"
 *     401:
 *       description: Utilisateur non authentifié.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Utilisateur non authentifié"
 *     500:
 *       description: Erreur interne du serveur.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Erreur lors de la création de la commande"
 * paths:
 *   /createOrder:
 *     post:
 *       summary: Créer une commande
 *       description: Crée une commande pour un utilisateur authentifié.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateOrderRequest'
 *       responses:
 *         201:
 *           $ref: '#/components/responses/201'
 *         400:
 *           $ref: '#/components/responses/400'
 *         401:
 *           $ref: '#/components/responses/401'
 *   /orders:
 *     get:
 *       summary: Obtenir les commandes d'un utilisateur
 *       description: Récupère toutes les commandes de l'utilisateur authentifié.
 *       responses:
 *         200:
 *           description: Liste des commandes de l'utilisateur.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60c5e58b57b24f2b7a8e14d9"
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Produit A"
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 15.50
 *                     totalPrice:
 *                       type: number
 *                       example: 31.00
 *                     address:
 *                       type: string
 *                       example: "123 rue Exemple, Ville, Pays"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-12T15:30:00Z"
 *         401:
 *           $ref: '#/components/responses/401'
 *   /orders/{orderId}:
 *     get:
 *       summary: Obtenir une commande par ID
 *       description: Récupère une commande spécifique à l'aide de son ID.
 *       parameters:
 *         - name: orderId
 *           in: path
 *           required: true
 *           description: L'ID de la commande.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Détails de la commande.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60c5e58b57b24f2b7a8e14d9"
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Produit A"
 *                         quantity:
 *                           type: integer
 *                           example: 2
 *                         price:
 *                           type: number
 *                           example: 15.50
 *                   totalPrice:
 *                     type: number
 *                     example: 31.00
 *                   address:
 *                     type: string
 *                     example: "123 rue Exemple, Ville, Pays"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-12T15:30:00Z"
 *         401:
 *           $ref: '#/components/responses/401'
 *         500:
 *           $ref: '#/components/responses/500'
 */
