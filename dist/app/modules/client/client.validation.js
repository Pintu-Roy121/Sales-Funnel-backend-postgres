"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createClientValidator = [
    (0, express_validator_1.body)("clientOldId")
        .trim()
        .notEmpty()
        .withMessage("Old Client ID is required"),
    (0, express_validator_1.body)("clientType")
        .optional({ values: "null" })
        .trim()
        .isString()
        .withMessage("Client type must be a string"),
    (0, express_validator_1.body)("clientFName")
        .trim()
        .notEmpty()
        .withMessage("Client first name is required"),
    (0, express_validator_1.body)("clientLName")
        .trim()
        .notEmpty()
        .withMessage("Client last name is required"),
    (0, express_validator_1.body)("companyName").trim().notEmpty().withMessage("Company name is required"),
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required")
        .normalizeEmail(),
    (0, express_validator_1.body)("phone").trim().notEmpty().withMessage("Phone number is required"),
    (0, express_validator_1.body)("division").trim().notEmpty().withMessage("Division is required"),
    (0, express_validator_1.body)("district").trim().notEmpty().withMessage("District is required"),
    (0, express_validator_1.body)("thana").trim().notEmpty().withMessage("Thana is required"),
    (0, express_validator_1.body)("status")
        .optional({ values: "null" })
        .trim()
        .isString()
        .withMessage("Status must be a string"),
    (0, express_validator_1.body)("fullAddress").trim().notEmpty().withMessage("Full address is required"),
];
//# sourceMappingURL=client.validation.js.map