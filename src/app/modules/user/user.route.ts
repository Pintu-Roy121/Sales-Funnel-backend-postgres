import { validateRequest } from "@/app/middlewares/validateRequest";
import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserSchema } from "./user.validation";

const router = Router();

router.post(
  "/create-user",
  validateRequest(createUserSchema),
  UserController.createUser,
);

router.get("/get-all", UserController.getAllUser);

export const UserRoutes = router;
