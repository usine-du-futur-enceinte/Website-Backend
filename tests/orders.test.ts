import request from "supertest";
import { app, server } from "../src/server"; // Assurez-vous d'importer correctement l'instance de votre application
import crypto from "crypto";
import { connectTestDB, closeTestDB } from "./setup";
import jwt, { JwtPayload } from "jsonwebtoken";

let userId: string;  // Variable pour stocker l'ID de l'utilisateur
let token: string;    // Variable pour stocker le token JWT
let orderId: string;  // Variable pour stocker l'ID de la commande

jest.setTimeout(50000);

const closeServer = async () => {
  server.close();
};

beforeAll(async () => {
  await connectTestDB();
  // Créer un utilisateur
  const res = await request(app).post("/register").send({
        email: "test@example.com",
        password: crypto.createHash("sha256").update("Test1234!").digest("hex"),
      });
  
  expect(res.statusCode).toBe(201);
  
  // Se connecter avec l'utilisateur pour récupérer le token
  const resLogin = await request(app).post("/login").send({
      email: "test@example.com",
      password: crypto.createHash("sha256").update("Test1234!").digest("hex"),
  });
 
  expect(resLogin.statusCode).toBe(200);
  token = resLogin.body.accessToken;
  const decoded = jwt.verify(res.body.accessToken, process.env.JWT_SECRET || "secret_key") as JwtPayload;
  userId = decoded.id;
});

afterAll(async () => {
  await closeTestDB();
  await closeServer();
});

describe("Tests API Orders", () => {

  it("✅ Devrait créer une nouvelle commande (POST /createOrder)", async () => {
    const orderData = {
      userId,
      totalPrice: 100,
      address: "123 Test St, Test City, TC",
      products: [
        { name: "Product 1", price: 50, quantity: 1 },
        { name: "Product 2", price: 50, quantity: 1 }
      ]
    };

    const response = await request(app)
      .post("/createOrder")
      .set("Authorization", `Bearer ${token}`) // Ajouter le token à l'entête de la requête
      .send(orderData);

    expect(response.statusCode).toBe(201);
    // Vérifie que la réponse est un objet
    expect(response.body).toHaveProperty("_id");
    orderId = response.body._id;
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("products");
    expect(response.body).toHaveProperty("totalPrice");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("date");

    // Vérifie que totalPrice est égal à 100
    expect(response.body.totalPrice).toBe(100);

    // Vérifie que l'adresse est correcte
    expect(response.body.address).toBe('123 Test St, Test City, TC');

    // Vérifie la structure du tableau de produits
    expect(response.body.products).toBeInstanceOf(Array);
    expect(response.body.products.length).toBe(2); // Vérifie qu'il y a 2 produits
    expect(response.body.products[0]).toHaveProperty("name");
    expect(response.body.products[0]).toHaveProperty("quantity");
    expect(response.body.products[0]).toHaveProperty("price");

    // Vérifie les détails du premier produit
    expect(response.body.products[0].name).toBe("Product 1");
    expect(response.body.products[0].price).toBe(50);
    expect(response.body.products[0].quantity).toBe(1);

    // Vérifie les détails du second produit
    expect(response.body.products[1].name).toBe("Product 2");
    expect(response.body.products[1].price).toBe(50);
    expect(response.body.products[1].quantity).toBe(1);
  });

  it("❌ Devrait refuser une création de commande sans authentification", async () => {
    const orderData = {
      userId,
      totalPrice: 100,
      address: "123 Test St, Test City, TC",
      products: [
        { name: "Product 1", price: 50, quantity: 1 },
        { name: "Product 2", price: 50, quantity: 1 }
      ]
    };

    const response = await request(app)
      .post("/createOrder")
      .send(orderData); // Sans token d'authentification

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Accès non autorisé");
  });

  it("✅ Devrait récupérer les commandes d'un utilisateur (GET /orders)", async () => {
    const response = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    // Vérifie que la réponse est un array
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("user");
    expect(response.body[0]).toHaveProperty("products");
    expect(response.body[0]).toHaveProperty("totalPrice");
    expect(response.body[0]).toHaveProperty("address");
    expect(response.body[0]).toHaveProperty("date");

    // Vérifie que totalPrice est égal à 100
    expect(response.body[0].totalPrice).toBe(100);

    // Vérifie que l'adresse est correcte
    expect(response.body[0].address).toBe('123 Test St, Test City, TC');

    // Vérifie la structure du tableau de produits
    expect(response.body[0].products).toBeInstanceOf(Array);
    expect(response.body[0].products.length).toBe(2); // Vérifie qu'il y a 2 produits
    expect(response.body[0].products[0]).toHaveProperty("name");
    expect(response.body[0].products[0]).toHaveProperty("quantity");
    expect(response.body[0].products[0]).toHaveProperty("price");

    // Vérifie les détails du premier produit
    expect(response.body[0].products[0].name).toBe("Product 1");
    expect(response.body[0].products[0].price).toBe(50);
    expect(response.body[0].products[0].quantity).toBe(1);

    // Vérifie les détails du second produit
    expect(response.body[0].products[1].name).toBe("Product 2");
    expect(response.body[0].products[1].price).toBe(50);
    expect(response.body[0].products[1].quantity).toBe(1);
  });

  it("✅ Devrait récupérer une commande spécifique (GET /orders/:orderId)", async () => {
    const response = await request(app)
      .get(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
      // Vérifie que le body de la réponse contient les bonnes propriétés
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("user._id");
    expect(response.body).toHaveProperty("user.email");
    expect(response.body).toHaveProperty("products");
    expect(response.body).toHaveProperty("totalPrice");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("date");

    // Vérifie que _id est une chaîne de caractères valide
    expect(typeof response.body._id).toBe("string");

    // Vérifie que l'user contient un _id et un email
    expect(typeof response.body.user._id).toBe("string");
    expect(typeof response.body.user.email).toBe("string");

    // Vérifie que products est un tableau avec les bons objets
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products).toHaveLength(2);

    // Vérifie les propriétés de chaque produit
    response.body.products.forEach((product: any) => {
      expect(product).toHaveProperty("name");
      expect(typeof product.name).toBe("string");
      expect(product).toHaveProperty("quantity");
      expect(typeof product.quantity).toBe("number");
      expect(product).toHaveProperty("price");
      expect(typeof product.price).toBe("number");
      expect(product).toHaveProperty("_id");
      expect(typeof product._id).toBe("string");
    });

    // Vérifie que totalPrice est bien un nombre
    expect(typeof response.body.totalPrice).toBe("number");

    // Vérifie que address est bien une chaîne de caractères
    expect(typeof response.body.address).toBe("string");

    // Vérifie que la date est bien une chaîne et qu'elle correspond à un format ISO 8601
    expect(typeof response.body.date).toBe("string");
    expect(new Date(response.body.date).toISOString()).toBe(response.body.date);
  });

  it("❌ Devrait échouer si les données de commande sont invalides (POST /createOrder)", async () => {
    const invalidOrderData = {
      userId, 
      totalPrice: 0,  // Total prix invalide
      address: "123 rue de test, Paris",
      products: []  // Liste de produits vide (ce qui est invalide)
    };
  
    const response = await request(app)
      .post("/createOrder")
      .set("Authorization", `Bearer ${token}`)  // Ajouter le token à l'entête de la requête
      .send(invalidOrderData);
  
    expect(response.statusCode).toBe(400);  // On attend une erreur 400 pour une mauvaise requête
    expect(response.body.message).toBe("Aucun produit dans la commande.");  // Message d'erreur attendu
  });
  
});
