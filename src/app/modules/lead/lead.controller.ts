import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LeadService } from "./lead.service";

const createLead = catchAsync(async (req: Request, res: Response) => {
    const result = await LeadService.createLead(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Lead created successfully",
        data: result
    })
})

const getAll = catchAsync(async (req: Request, res: Response) => {
    const result = await LeadService.getAll(req)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Successfully",
        data: result
    })
})

export const LeadController = {
    createLead,
    getAll
}