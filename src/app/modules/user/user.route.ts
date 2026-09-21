import { validateRequest } from "@/app/middlewares/validateRequest";
import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserValidator } from "./user.validation";

const router = Router();

router.post(
  "/create-user",
  validateRequest(createUserValidator),
  UserController.createUser,
);

router.get("/get-all", UserController.getAllUser);

export const UserRoutes = router;
