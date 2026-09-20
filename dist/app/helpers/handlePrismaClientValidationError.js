"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    return {
        statusCode: 400,
        message: "Invalid database query. Please check the provided data.",
    };
};
exports.handleValidationError = handleValidationError;
//# sourceMappingURL=handlePrismaClientValidationError.js.map