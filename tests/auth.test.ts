import request from "supertest";
import { app, server } from "../src/server";
import { connectTestDB, closeTestDB } from "./setup";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
  server.close();
});

describe("Auth API", () => {
  test("devrait inscrire un utilisateur", async () => {
    const res = await request(app).post("/register").send({
      email: "test@example.com",
      password: crypto.createHash("sha256").update("Test1234!").digest("hex"),
    });

    expect(res.statusCode).toBe(201);
  });

  test("ne devrait pas inscrire un utilisateur avec un email déjà existant", async () => {
    await request(app).post("/register").send({
      email: "test@example.com",
      password: crypto.createHash("sha256").update("Test1234!").digest("hex"),
    });

    const res = await request(app).post("/register").send({
      email: "test@example.com",
      password: crypto.createHash("sha256").update("DifferentPassword123!").digest("hex"),
    });

    expect(res.statusCode).toBe(400);
  });

  test("devrait connecter un utilisateur avec de bons identifiants", async () => {
    await request(app).post("/register").send({
      email: "testuser@example.com",
      password: crypto.createHash("sha256").update("SecurePass123!").digest("hex"),
    });

    const res = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: crypto.createHash("sha256").update("SecurePass123!").digest("hex"),
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    const decoded = jwt.verify(res.body.accessToken, process.env.JWT_SECRET || "secret_key") as JwtPayload;
    console.log("User ID:", decoded.id);

    expect(decoded).toHaveProperty("id"); // Vérifie que l'ID est bien présent
  });

  test("ne devrait pas connecter un utilisateur avec un mauvais mot de passe", async () => {
    await request(app).post("/register").send({
      email: "anotheruser@example.com",
      password: crypto.createHash("sha256").update("RightPass123!").digest("hex"),
    });

    const res = await request(app).post("/login").send({
      email: "anotheruser@example.com",
      password: crypto.createHash("sha256").update("WrongPass!").digest("hex"),
    });

    expect(res.statusCode).toBe(401);
  });
});
