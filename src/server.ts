import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as exampleRoute from "./routes/example.route";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});

const app: express.Application = express();

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(exampleRoute.getRouter());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(mongoose.modelNames());
});
