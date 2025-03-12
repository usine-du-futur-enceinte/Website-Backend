import { Request } from "express";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuthenticatedRequest:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: L'identifiant unique de l'utilisateur.
 *               example: "60c5e58b57b24f2b7a8e14d9"
 *             email:
 *               type: string
 *               description: L'adresse email de l'utilisateur.
 *               example: "user@example.com"
 *       required:
 *         - user
 */

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}
