import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export const connectTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {  // Vérifie qu'il n'est pas déjà connecté
    await mongoose.connect(mongoUri);
  }
};

export const closeTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
};
