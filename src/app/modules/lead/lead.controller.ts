import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { Request, Response } from "express";
import { LeadService } from "./lead.service";

const createLead = catchAsync(async (req: Request, res: Response) => {
    const result = await LeadService.createLead(req)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Lead created successfully",
        data: result
    })
})

export const LeadController = {
    createLead
}