import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { TGenericErrorResponse } from "../interfaces/error.types.js";

export const handleValidationError = (
  err: Prisma.PrismaClientValidationError,
): TGenericErrorResponse => {
  let message = ''
  const fields = [
    ...err.message.matchAll(/(?:Argument|argument) `([^`]+)`/g),
  ].map((match) => match[1]);

  if (fields.length > 0) {
    message = `Invalid value for field: ${fields.join(", ")}`;
  } else {
    message = "Invalid data provided.";
  }
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message
  };
};
