"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const env_1 = require("../config/env");
const appError_1 = __importDefault(require("../errorHelpers/appError"));
const handlePrismaError_1 = require("../helpers/handlePrismaError");
const globalErrorHandler = async (err, req, res, next) => {
    if (env_1.envVars.NODE_ENV === "development") {
        console.log("Global Error", err);
    }
    let errorSources = [];
    let statusCode = 500;
    let message = err.message || "Something Went Wrong!!";
    // Duplicate error
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = (0, handlePrismaError_1.handlePrismaError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        ((message = "Validation Error"),
            (err = err.message),
            (statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    else if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        ((message = "Unknown Prisma error occurred!"),
            (err = err.message),
            (statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    else if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        ((message = "Prisma client failed to initialize!"),
            (err = err.message),
            (statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    else if (err instanceof appError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: env_1.envVars.NODE_ENV === "development" ? err : null,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=globalErrorHandlers.js.map