import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

export class AuthService {
  static async register(email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return { message: "Utilisateur inscrit avec succès" };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    return { token };
  }
}