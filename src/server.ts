import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import { swaggerDocs } from "./config/swagger"; // Importer la configuration Swagger
import swaggerUi from "swagger-ui-express"; // Importer swagger-ui-express

dotenv.config();
const PORT = process.env.PORT || 3030;

const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri).then(() => {
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });
} else {
  console.error("MONGO_URI is not defined");
}

const app: express.Application = express();
app.use(cors());

app.use(express.json());

// Utiliser Swagger UI pour la documentation API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(authRoutes);
app.use(orderRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
