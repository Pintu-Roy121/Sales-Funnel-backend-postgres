import { body } from "express-validator";

export const createClientValidator = [
  body("clientOldId")
    .trim()
    .notEmpty()
    .withMessage("Old Client ID is required"),

  body("clientType")
    .optional({ values: "null" })
    .trim()
    .isString()
    .withMessage("Client type must be a string"),

  body("clientFName")
    .trim()
    .notEmpty()
    .withMessage("Client first name is required"),

  body("clientLName")
    .trim()
    .notEmpty()
    .withMessage("Client last name is required"),

  body("companyName").trim().notEmpty().withMessage("Company name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone").trim().notEmpty().withMessage("Phone number is required"),

  body("division").trim().notEmpty().withMessage("Division is required"),

  body("district").trim().notEmpty().withMessage("District is required"),

  body("thana").trim().notEmpty().withMessage("Thana is required"),
  body("status")
    .optional({ values: "null" })
    .trim()
    .isString()
    .withMessage("Status must be a string"),
  body("fullAddress").trim().notEmpty().withMessage("Full address is required"),
];
