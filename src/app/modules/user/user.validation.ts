import { UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .trim()
    .min(1, "Name is required"),

  email: z
    .string({
      message: "Email is required",
    })
    .trim()
    .min(1, "Email is required")
    .email("Valid email is required")
    .toLowerCase(),

  password: z
    .string({
      message: "Password is required",
    })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  role: z
    .enum(Object.values(UserRole) as [string, ...string[]], {
      message: "Invalid user role",
    })
    .nullable()
    .optional(),

  status: z
    .enum(Object.values(UserStatus) as [string, ...string[]], {
      message: "Invalid user status",
    })
    .nullable()
    .optional(),

  avatar: z
    .string({
      message: "Avatar must be a string",
    })
    .trim()
    .nullable()
    .optional(),

  phone: z
    .string({
      message: "Phone must be a string",
    })
    .trim()
    .nullable()
    .optional(),

  department: z
    .string({
      message: "Department must be a string",
    })
    .trim()
    .nullable()
    .optional(),

  designation: z
    .string({
      message: "Designation must be a string",
    })
    .trim()
    .nullable()
    .optional(),

  zone: z
    .string({
      message: "Zone must be a string",
    })
    .trim()
    .nullable()
    .optional(),

  eid: z
    .string({
      message: "EID must be a string",
    })
    .trim()
    .nullable()
    .optional(),

  joinDate: z
    .string()
    .datetime({
      message: "Join date must be a valid date",
    })
    .nullable()
    .optional(),

  lastLogin: z
    .string()
    .datetime({
      message: "Last login must be a valid date",
    })
    .nullable()
    .optional(),

  accessDepartment: z
    .array(z.string(), {
      message: "Access department must be an array",
    })
    .nullable()
    .optional(),

  accessPath: z
    .array(z.string(), {
      message: "Access path must be an array",
    })
    .nullable()
    .optional(),

  roleDepartment: z
    .array(z.string(), {
      message: "Role department must be an array",
    })
    .nullable()
    .optional(),

  accessService: z
    .array(z.string(), {
      message: "Access service must be an array",
    })
    .nullable()
    .optional(),

  createdById: z
    .number({
      message: "Created by ID must be a valid integer",
    })
    .int("Created by ID must be a valid integer")
    .min(1, "Created by ID must be a valid integer")
    .nullable()
    .optional(),

  teamLeadId: z
    .number({
      message: "Team lead ID must be a valid integer",
    })
    .int("Team lead ID must be a valid integer")
    .min(1, "Team lead ID must be a valid integer")
    .nullable()
    .optional(),

  atlId: z
    .number({
      message: "ATL ID must be a valid integer",
    })
    .int("ATL ID must be a valid integer")
    .min(1, "ATL ID must be a valid integer")
    .nullable()
    .optional(),
});

// import { UserRole, UserStatus } from "@prisma/client";
// import { body } from "express-validator";

// export const createUserValidator = [
//   body("name").trim().notEmpty().withMessage("Name is required"),
//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Valid email is required")
//     .normalizeEmail(),
//   body("password")
//     .notEmpty()
//     .withMessage("Password is required")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters"),
//   body("role")
//     .optional({ nullable: true })
//     .isIn(Object.values(UserRole))
//     .withMessage("Invalid user role"),
//   body("status")
//     .optional({ nullable: true })
//     .isIn(Object.values(UserStatus))
//     .withMessage("Invalid user status"),
//   body("avatar")
//     .optional({ nullable: true })
//     .trim()
//     .isString()
//     .withMessage("Avatar must be a string"),
//   body("phone")
//     .optional({ nullable: true })
//     .trim()
//     .isString()
//     .withMessage("Phone must be a string"),
//   body("department")
//     .optional({ nullable: true })
//     .trim()
//     .isString()
//     .withMessage("Department must be a string"),
//   body("designation")
//     .optional({ nullable: true })
//     .trim()
//     .isString()
//     .withMessage("Designation must be a string"),
//   body("zone")
//     .optional({ nullable: true })
//     .trim()
//     .isString()
//     .withMessage("Zone must be a string"),
//   body("eid")
//     .optional({ nullable: true })
//     .trim()
//     .isString()
//     .withMessage("EID must be a string"),
//   body("joinDate")
//     .optional({ nullable: true })
//     .isISO8601()
//     .withMessage("Join date must be a valid date"),
//   body("lastLogin")
//     .optional({ nullable: true })
//     .isISO8601()
//     .withMessage("Last login must be a valid date"),
//   body("accessDepartment")
//     .optional({ nullable: true })
//     .isArray()
//     .withMessage("Access department must be an array"),
//   body("accessDepartment.*")
//     .isString()
//     .withMessage("Each access department must be a string"),
//   body("accessPath")
//     .optional({ nullable: true })
//     .isArray()
//     .withMessage("Access path must be an array"),
//   body("accessPath.*")
//     .isString()
//     .withMessage("Each access path must be a string"),
//   body("roleDepartment")
//     .optional({ nullable: true })
//     .isArray()
//     .withMessage("Role department must be an array"),
//   body("roleDepartment.*")
//     .isString()
//     .withMessage("Each role department must be a string"),
//   body("accessService")
//     .optional({ nullable: true })
//     .isArray()
//     .withMessage("Access service must be an array"),
//   body("accessService.*")
//     .isString()
//     .withMessage("Each access service must be a string"),
//   body("createdById")
//     .optional({ nullable: true })
//     .isInt({ min: 1 })
//     .withMessage("Created by ID must be a valid integer"),
//   body("teamLeadId")
//     .optional({ nullable: true })
//     .isInt({ min: 1 })
//     .withMessage("Team lead ID must be a valid integer"),
//   body("atlId")
//     .optional({ nullable: true })
//     .isInt({ min: 1 })
//     .withMessage("ATL ID must be a valid integer"),
// ];
