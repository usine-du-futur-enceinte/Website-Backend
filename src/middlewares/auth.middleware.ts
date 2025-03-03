import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";
import { AuthenticatedRequest } from "../types/express"; // Import du type étendu

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
