import express from "express";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur.
 *           example: "example@example.com"
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur.
 *           example: "password123"
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur.
 *           example: "example@example.com"
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur.
 *           example: "password123"
 *   responses:
 *     201:
 *       description: L'utilisateur a été enregistré avec succès.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Inscription réussie"
 *     400:
 *       description: Mauvaise demande (par exemple, email ou mot de passe incorrect).
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Email ou mot de passe invalide"
 *     401:
 *       description: Authentification échouée (par exemple, mauvais identifiants).
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Identifiants incorrects"
 * paths:
 *   /register:
 *     post:
 *       summary: Inscrire un nouvel utilisateur
 *       description: Crée un nouvel utilisateur avec un email et un mot de passe.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterRequest'
 *       responses:
 *         201:
 *           $ref: '#/components/responses/201'
 *         400:
 *           $ref: '#/components/responses/400'
 *   /login:
 *     post:
 *       summary: Authentifier un utilisateur
 *       description: Authentifie un utilisateur avec un email et un mot de passe.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginRequest'
 *       responses:
 *         200:
 *           description: L'utilisateur a été authentifié avec succès.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     description: Le token d'authentification JWT.
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzcyYjJmNWI4ZjdmMDAxZjgzZjk2NSIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSJ9.WFhTfLZwUOGq9-dRwvLM_qwZ4AKcxH7-oBOE8TofF1g"
 *         401:
 *           $ref: '#/components/responses/401'
 */
