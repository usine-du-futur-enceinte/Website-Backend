import request from "supertest";
import { app, server } from "../src/server";
import { connectTestDB, closeTestDB } from "./setup";

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
      password: "Test1234!",
    });

    expect(res.statusCode).toBe(201);
  });

  test("ne devrait pas inscrire un utilisateur avec un email déjà existant", async () => {
    await request(app).post("/register").send({
      email: "test@example.com",
      password: "Test1234!",
    });

    const res = await request(app).post("/register").send({
      email: "test@example.com",
      password: "DifferentPassword123!",
    });

    expect(res.statusCode).toBe(400);
  });

  test("devrait connecter un utilisateur avec de bons identifiants", async () => {
    await request(app).post("/register").send({
      email: "testuser@example.com",
      password: "SecurePass123!",
    });

    const res = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: "SecurePass123!",
    });

    expect(res.statusCode).toBe(200);
  });

  test("ne devrait pas connecter un utilisateur avec un mauvais mot de passe", async () => {
    await request(app).post("/register").send({
      email: "anotheruser@example.com",
      password: "RightPass123!",
    });

    const res = await request(app).post("/login").send({
      email: "anotheruser@example.com",
      password: "WrongPass!",
    });

    expect(res.statusCode).toBe(401);
  });
});
