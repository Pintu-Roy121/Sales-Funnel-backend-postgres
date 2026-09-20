import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";
import { handleValidationError } from "../helpers/handlePrismaClientValidationError";
import { handlePrismaError } from "../helpers/handlePrismaError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  // Duplicate error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(err);
    const simplifiedError = handlePrismaError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err.name === "PrismaClientValidationError") {
    const simplifiedError = handleValidationError(err);
    return {
      statusCode: simplifiedError.statusCode,
      message: simplifiedError.message,
    };
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
