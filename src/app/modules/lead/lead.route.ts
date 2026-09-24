import { validateRequest } from "@/app/middlewares/validateRequest";
import { Router } from "express";
import { LeadController } from "./lead.controller";
import { createLeadValidator } from "./lead.validation";

const router = Router()

router.post("/create-lead",
    validateRequest(createLeadValidator),
    LeadController.createLead)


export const LeadRoutes = router