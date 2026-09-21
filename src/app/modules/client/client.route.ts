import { validateRequest } from "@/app/middlewares/validateRequest";
import { Router } from "express";
import { ClientController } from "./client.controller";
import { createClientValidator } from "./client.validation";

const router = Router();

router.post(
  "/create-client",
  validateRequest(createClientValidator),
  ClientController.createClient,
);

router.get("/get-all", ClientController.getAllClient);

export const ClientRoutes = router;
