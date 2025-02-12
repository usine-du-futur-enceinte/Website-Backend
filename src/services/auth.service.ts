import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "secret_key";
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || "refresh_secret_key"; // Clé secrète pour le token de rafraîchissement

export class AuthService {
  static async register(email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email déjà utilisé");
    }

    const user = new User({ email, password });
    await user.save();

    // Générer un token d'accès
    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      SECRET_KEY,
      { expiresIn: "1h" } // Expire dans 1 heure
    );

    // Générer un token de rafraîchissement
    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      REFRESH_SECRET_KEY,
      { expiresIn: "7d" } // Expire dans 7 jours
    );

    return {
      message: "Utilisateur inscrit avec succès",
      accessToken,
      refreshToken,
    };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email incorrect");
    }
    if (password !== user.password) {
      throw new Error("mot de passe incorrect");
    }

    // Générer un token d'accès
    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Générer un token de rafraîchissement
    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }
}
