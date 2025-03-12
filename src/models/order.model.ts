import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users", 
    required: true 
  },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalPrice: { 
    type: Number, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

export const Order = mongoose.model("Orders", orderSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: L'ID de l'utilisateur qui a passé la commande (référence à un objet utilisateur).
 *           example: "60c72b2f5b8f7f001f83f9b7"
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du produit.
 *                 example: "T-shirt"
 *               quantity:
 *                 type: integer
 *                 description: La quantité de produit commandée.
 *                 example: 2
 *               price:
 *                 type: number
 *                 description: Le prix du produit.
 *                 example: 19.99
 *         totalPrice:
 *           type: number
 *           description: Le prix total de la commande.
 *           example: 39.98
 *         address:
 *           type: string
 *           description: L'adresse de livraison pour la commande.
 *           example: "123 Rue de Paris, 75000 Paris, France"
 *         date:
 *           type: string
 *           format: date-time
 *           description: La date de la commande (automatiquement définie à la date actuelle).
 *           example: "2025-03-12T08:30:00Z"
 */
