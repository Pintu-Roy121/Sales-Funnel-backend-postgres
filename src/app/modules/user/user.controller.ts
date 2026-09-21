import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Successful!",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Successful!",
    data: result,
  });
});

export const UserController = { createUser, getAllUser };
