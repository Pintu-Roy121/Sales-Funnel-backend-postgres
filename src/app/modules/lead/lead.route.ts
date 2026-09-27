import { validateRequest } from "@/app/middlewares/validateRequest";
import { Router } from "express";
import { LeadController } from "./lead.controller";
import { createLeadSchema } from "./lead.validation";

const router = Router()

router.post("/create-lead",
    validateRequest(createLeadSchema),
    LeadController.createLead)

router.get("/get-all-lead", LeadController.getAll)


export const LeadRoutes = router