import { ClientClass, ClientType } from "@prisma/client";
import { body } from "express-validator";

export const createClientValidator = [
  body("clientType")
    .default('CORP')
    .isIn(Object.values(ClientType))
    .withMessage("Client type must be a string"),

  body("clientClass")
    .default('new')
    .isIn(Object.values(ClientClass))
    .withMessage("Client class must be a string"),

  body("clientFName")
    .trim()
    .notEmpty()
    .withMessage("Client first name is required"),

  body("clientLName")
    .trim()
    .notEmpty()
    .withMessage("Client last name is required"),

  body("organizationName")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("locationId")
    .isInt()
    .withMessage("Location ID must be a valid integer"),

  body("detailedAddress")
    .trim()
    .notEmpty()
    .withMessage("Detailed address is required"),

  body("clientDesignation")
    .optional({ values: "null" })
    .trim()
    .isString()
    .withMessage("Client designation must be a string"),

  body("houseHold")
    .optional({ values: "null" })
    .trim()
    .isString()
    .withMessage("Household must be a string"),

  body("clientIndustry")
    .optional({ values: "null" })
    .trim()
    .isString()
    .withMessage("Client industry must be a string"),

  body("status")
    .default("active")
    .trim()
    .isString()
    .withMessage("Status must be a string"),
];



// export const createClientValidator = [
//   body("clientOldId")
//     .trim()
//     .notEmpty()
//     .withMessage("Old Client ID is required"),

//   body("clientType")
//     .optional({ values: "null" })
//     .trim()
//     .isString()
//     .withMessage("Client type must be a string"),

//   body("clientFName")
//     .trim()
//     .notEmpty()
//     .withMessage("Client first name is required"),

//   body("clientLName")
//     .trim()
//     .notEmpty()
//     .withMessage("Client last name is required"),

//   body("companyName").trim().notEmpty().withMessage("Company name is required"),

//   body("email")
//     .trim()
//     .isEmail()
//     .withMessage("Valid email is required")
//     .normalizeEmail(),

//   body("phone").trim().notEmpty().withMessage("Phone number is required"),

//   body("division").trim().notEmpty().withMessage("Division is required"),

//   body("district").trim().notEmpty().withMessage("District is required"),

//   body("thana").trim().notEmpty().withMessage("Thana is required"),
//   body("status")
//     .optional({ values: "null" })
//     .trim()
//     .isString()
//     .withMessage("Status must be a string"),
//   body("fullAddress").trim().notEmpty().withMessage("Full address is required"),
// ];
