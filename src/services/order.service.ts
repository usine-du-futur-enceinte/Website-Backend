import { Order } from "../models/order.model";

export class OrderService {
  static async createOrder(userId: string, products: any[], address: string) {
    if (!products || products.length === 0) {
      throw new Error("Aucun produit dans la commande.");
    }

    // Calcul du prix total
    const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Création de la commande
    const order = new Order({
      user: userId,
      products,
      totalPrice,
      address,
    });

    await order.save();
    return order;
  }

  static async getOrdersByUser(userId: string) {
    return await Order.find({ user: userId }).populate("user", "email");
  }

  static async getOrderById(orderId: string) {
    return await Order.findById(orderId).populate("user", "email");
  }
}
