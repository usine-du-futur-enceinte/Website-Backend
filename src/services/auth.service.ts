import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "secret_key";
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || "refresh_secret_key";

export class AuthService {
  /**
   * @openapi
   * /auth/register:
   *   post:
   *     summary: Inscription d'un nouvel utilisateur
   *     description: Crée un compte utilisateur et génère un token d'accès et un token de rafraîchissement.
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: "exemple@email.com"
   *               password:
   *                 type: string
   *                 format: password
   *                 example: "MotDePasse123"
   *     responses:
   *       201:
   *         description: Utilisateur inscrit avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Utilisateur inscrit avec succès"
   *                 accessToken:
   *                   type: string
   *                 refreshToken:
   *                   type: string
   *       400:
   *         description: Email déjà utilisé.
   */
  static async register(email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email déjà utilisé");
    }

    const user = new User({ email, password });
    await user.save();

    const accessToken = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ email: user.email, id: user._id }, REFRESH_SECRET_KEY, { expiresIn: "7d" });

    return {
      message: "Utilisateur inscrit avec succès",
      accessToken,
      refreshToken,
    };
  }

  /**
   * @openapi
   * /auth/login:
   *   post:
   *     summary: Connexion utilisateur
   *     description: Permet à un utilisateur existant de se connecter et de recevoir un token JWT.
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: "exemple@email.com"
   *               password:
   *                 type: string
   *                 format: password
   *                 example: "MotDePasse123"
   *     responses:
   *       200:
   *         description: Connexion réussie.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                 refreshToken:
   *                   type: string
   *       400:
   *         description: Email ou mot de passe incorrect.
   */
  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email incorrect");
    }
    if (password !== user.password) {
      throw new Error("Mot de passe incorrect");
    }

    const accessToken = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ email: user.email, id: user._id }, REFRESH_SECRET_KEY, { expiresIn: "7d" });

    return { accessToken, refreshToken };
  }
}
