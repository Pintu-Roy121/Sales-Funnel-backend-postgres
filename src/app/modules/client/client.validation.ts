import { ClientClass, ClientType } from "@prisma/client";
import { z } from "zod";

export const createClientSchema = z.object({
  clientType: z
    .enum(Object.values(ClientType) as [string, ...string[]], {
      message: "Client type must be a string",
    })
    .default(ClientType.CORP),

  clientClass: z
    .enum(Object.values(ClientClass) as [string, ...string[]], {
      message: "Client class must be a string",
    })
    .default(ClientClass.new),

  clientFName: z
    .string({
      message: "Client first name is required",
    })
    .trim()
    .min(1, "Client first name is required"),

  clientLName: z
    .string({
      message: "Client last name is required",
    })
    .trim()
    .min(1, "Client last name is required"),

  organizationName: z
    .string({
      message: "Organization name is required",
    })
    .trim()
    .min(1, "Organization name is required"),

  email: z
    .email("Valid email is required")
    .trim()
    .toLowerCase(),

  phone: z
    .string({
      message: "Phone number is required",
    })
    .trim()
    .min(1, "Phone number is required"),

  locationId: z.coerce
    .number({
      message: "Location ID must be a valid integer",
    })
    .int("Location ID must be a valid integer"),

  detailedAddress: z
    .string({
      message: "Detailed address is required",
    })
    .trim()
    .min(1, "Detailed address is required"),

  clientDesignation: z
    .string()
    .trim()
    .nullable()
    .optional(),

  houseHold: z
    .string()
    .trim()
    .nullable()
    .optional(),

  clientIndustry: z
    .string()
    .trim()
    .nullable()
    .optional(),

  status: z
    .string()
    .trim()
    .default("active"),
});

export type TCreateClient = z.infer<typeof createClientSchema>;