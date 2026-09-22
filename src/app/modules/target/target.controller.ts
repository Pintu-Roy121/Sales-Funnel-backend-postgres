import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TargetService } from "./target.service";

const createTarget = catchAsync(async (req: Request, res: Response) => {
    const result = await TargetService.createTarget(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Target created successfully",
        data: result,
    });
})
const getAllTarget = catchAsync(async (req: Request, res: Response) => {
    const result = await TargetService.getAllTarget(req);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Successful",
        data: result,
    });
})

export const TargetController = {
    createTarget,
    getAllTarget
}