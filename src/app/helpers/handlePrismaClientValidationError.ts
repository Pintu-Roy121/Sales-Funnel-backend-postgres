import { Prisma } from "@prisma/client";
import type { TGenericErrorResponse } from "../interfaces/error.types.js";

export const handleValidationError = (
  err: Prisma.PrismaClientValidationError,
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid database query. Please check the provided data.",
  };
};
