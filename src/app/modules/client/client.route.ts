import { validateRequest } from "@/app/middlewares/validateRequest";
import { Router } from "express";
import { ClientController } from "./client.controller";
import { createClientSchema } from "./client.validation";

const router = Router();

router.post(
  "/create-client",
  validateRequest(createClientSchema),
  ClientController.createClient,
);

router.get("/get-all", ClientController.getAllClient);

export const ClientRoutes = router;
