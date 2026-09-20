"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const client_1 = require("@prisma/client");
const env_1 = require("../config/env");
const appError_1 = __importDefault(require("../errorHelpers/appError"));
const handlePrismaClientValidationError_1 = require("../helpers/handlePrismaClientValidationError");
const handlePrismaError_1 = require("../helpers/handlePrismaError");
const globalErrorHandler = async (err, req, res, next) => {
    if (env_1.envVars.NODE_ENV === "development") {
        console.log(err);
    }
    let errorSources = [];
    let statusCode = 500;
    let message = "Something Went Wrong!!";
    // Duplicate error
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        console.log(err);
        const simplifiedError = (0, handlePrismaError_1.handlePrismaError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "PrismaClientValidationError") {
        const simplifiedError = (0, handlePrismaClientValidationError_1.handleValidationError)(err);
        return {
            statusCode: simplifiedError.statusCode,
            message: simplifiedError.message,
        };
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