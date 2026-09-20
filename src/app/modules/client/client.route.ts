import { Router } from "express";
import { ClientController } from "./client.controller";

const router = Router();

router.post(
  "/create-client",
  //   validateRequest(createClientValidator),
  ClientController.createClient,
);

export const ClientRoutes = router;
