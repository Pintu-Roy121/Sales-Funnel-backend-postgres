import { Prisma } from "@prisma/client";
import type { TGenericErrorResponse } from "../interfaces/error.types.js";

export const handlePrismaError = (err: unknown): TGenericErrorResponse => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return {
          statusCode: 409,
          message: "A record with this value already exists.",
        };

      case "P2025":
        return {
          statusCode: 404,
          message: "Record not found.",
        };

      case "P2003":
        return {
          statusCode: 409,
          message: "The operation failed because a related record does not exist.",
        };

      default:
        return {
          statusCode: 400,
          message: "Database operation failed.",
        };
    }
  }

  return {
    statusCode: 500,
    message: "Internal server error.",
  };
};
