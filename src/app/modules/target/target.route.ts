import { validateRequest } from "@/app/middlewares/validateRequest";
import { Router } from "express";
import { TargetController } from "./target.controller";
import { createTargetValidation } from "./target.validation";

const router = Router();

router.post("/create-target", validateRequest(createTargetValidation), TargetController.createTarget);
router.get("/get-all", TargetController.getAllTarget)

export const TargetRoutes = router;