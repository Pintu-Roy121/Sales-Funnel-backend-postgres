import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";
import { handlePrismaError } from "../helpers/handlePrismaError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Global Error", err);
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = err.message || "Something Went Wrong!!";

  // Duplicate error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handlePrismaError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    ((message = "Validation Error"),
      (err = err.message),
      (statusCode = StatusCodes.BAD_REQUEST));
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    ((message = "Unknown Prisma error occurred!"),
      (err = err.message),
      (statusCode = StatusCodes.BAD_REQUEST));
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    ((message = "Prisma client failed to initialize!"),
      (err = err.message),
      (statusCode = StatusCodes.BAD_REQUEST));
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
