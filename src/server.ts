import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.route";

dotenv.config();
const PORT = process.env.PORT || 3030;

if (process.env.NODE_ENV !== "test") {  // Évite la connexion pendant les tests
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
}

const app: express.Application = express();
app.use(cors());

app.use(express.json());
app.use(authRoutes);


const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
