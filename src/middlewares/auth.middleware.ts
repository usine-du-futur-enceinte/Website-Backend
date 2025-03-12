import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/express"; // Import du type étendu

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * security:
 *   - BearerAuth: []
 */

/**
 * @openapi
 * /protected-endpoint:
 *   get:
 *     summary: Endpoint protégé nécessitant un token JWT valide
 *     description: Utilise ce point d'API pour tester l'accès protégé, nécessitant un token JWT valide.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé, token valide
 *       401:
 *         description: Accès non autorisé, token manquant ou invalide
 *       403:
 *         description: Token invalide ou expiré
 */
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Récupère le token après "Bearer"

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; email: string };
    req.user = decoded; // Ajoute l'utilisateur à la requête
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalide" });
  }
};
