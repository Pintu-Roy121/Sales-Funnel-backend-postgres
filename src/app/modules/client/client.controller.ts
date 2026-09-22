import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ClientService } from "./client.service";

const createClient = catchAsync(async (req: Request, res: Response) => {
  const result = await ClientService.createClient(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Client created successful!",
    data: result,
  });
});

const getAllClient = catchAsync(async (req: Request, res: Response) => {
  const result = await ClientService.getAllClient(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Successful!",
    data: result,
  });
});

export const ClientController = { createClient, getAllClient };
