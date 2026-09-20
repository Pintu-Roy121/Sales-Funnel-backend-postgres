"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (validators) => [
    ...validators,
    async (req, res, next) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
            }
            req.body = (0, express_validator_1.matchedData)(req);
            next();
        }
        catch (error) {
            next(error);
        }
    },
];
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map