import { Router } from "express";
import { LeadController } from "./lead.controller";

const router = Router()

router.post("/create-lead",
    // validateRequest(createLeadValidator),
    LeadController.createLead)


export const LeadRoutes = router