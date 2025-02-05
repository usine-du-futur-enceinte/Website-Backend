import { Router } from "express";
import * as exampleController from "../controllers/example.controller";

export function getRouter() {
  const router = Router();

  router.get("/examples/:name", exampleController.getExamplesByName);

  return router;
}
