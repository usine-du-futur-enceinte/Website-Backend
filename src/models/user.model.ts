import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: true,
    unique: true 
  },
  password: { 
    type: String,
    required: true
  },
});

export const User = mongoose.model("Users", userSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur (doit être unique).
 *           example: "example@example.com"
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur.
 *           example: "password123"
 */
