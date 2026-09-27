import { ClientClass, ClientType } from "@prisma/client";
import { z } from "zod";

export const connectivityLocationSchema = z.object({
    serviceName: z
        .string()
        .min(1, "Service name is required"),

    address: z
        .string()
        .min(1, "Address is required"),

    packageName: z
        .string()
        .optional(),

    remarks: z
        .string()
        .optional(),

    mrc: z
        .number()
        .nonnegative("MRC cannot be negative")
        .optional(),

    otc: z
        .number()
        .nonnegative("OTC cannot be negative")
        .optional(),

    qty: z
        .number()
        .int("Quantity must be an integer")
        .nonnegative("Quantity cannot be negative")
        .optional(),

    tkPerMb: z
        .number()
        .nonnegative("Tk per MB cannot be negative")
        .optional(),
});
//MaturityHistorySchema
export const maturityHistorySchema = z.object({
    leadId: z
        .number()
        .int()
        .positive(),

    stage: z
        .string()
        .trim()
        .min(1, "Stage is required"),

    percentage: z
        .number()
        .min(0, "Percentage cannot be less than 0")
        .max(100, "Percentage cannot be greater than 100"),

    oldMrcAmount: z
        .number()
        .nonnegative()
        .optional()
        .nullable(),

    newMrcAmount: z
        .number()
        .nonnegative()
        .optional()
        .nullable(),

    oldOtcAmount: z
        .number()
        .nonnegative()
        .optional()
        .nullable(),

    newOtcAmount: z
        .number()
        .nonnegative()
        .optional()
        .nullable(),

    oldExpectedClosingMonth: z
        .string()
        .trim()
        .optional()
        .nullable(),

    newExpectedClosingMonth: z
        .string()
        .trim()
        .optional()
        .nullable(),

    updatedAt: z
        .coerce
        .date()
        .optional(),

    note: z
        .string()
        .trim()
        .default("Pipeline metrics updated."),
});

export const maturityHistoriesSchema = z.array(
    maturityHistorySchema.omit({
        leadId: true,
    })
);
export const leadSchema = z.object({

    // User relations
    kamId: z
        .number()
        .int()
        .positive({ error: "Kam Id is require" })
        .optional(),

    userEmail: z.string().email("Invalid user email"),

    teamLeadId: z
        .number()
        .int()
        .positive()
        .optional(),

    atlId: z
        .number()
        .int()
        .positive()
        .optional(),

    createdById: z
        .number()
        .int()
        .positive()
        .optional(),


    // Client information
    clientType: z
        .enum(Object.values(ClientType) as [string])
        .optional(),

    clientClass: z
        .enum(Object.values(ClientClass) as [string])
        .optional(),

    organizationName: z
        .string()
        .optional(),

    division: z
        .string()
        .min(1, "Division is required"),

    district: z
        .string()
        .min(1, "District is required"),

    thana: z
        .string()
        .min(1, "Thana is required"),

    detailedAddress: z
        .string()
        .min(1, "Detailed address is required"),

    clientFName: z
        .string()
        .min(1, "Client first name is required"),

    clientLName: z
        .string()
        .min(1, "Client last name is required"),

    clientDesignation: z
        .string()
        .optional(),

    clientMobileNumber: z
        .string()
        .min(1, "Client mobile number is required"),

    clientEmail: z
        .email("Invalid client email"),

    clientIndustry: z
        .string()
        .optional(),

    houseHold: z
        .string()
        .optional(),


    // Existing ISP / Connectivity
    existingPreviousIsp: z
        .string()
        .optional(),

    connectivityMethod: z
        .string()
        .min(1, "Connectivity method is required"),

    serviceClass: z
        .string()
        .min(1, "Service class is required"),

    // serviceType: z
    //     .array(z.string())
    //     .min(1, "At least one service type is required"),

    addOnType: z
        .string()
        .optional(),

    // packageName: z
    //     .string()
    //     .optional(),


    // Lead metrics
    interactionCount: z
        .number()
        .int()
        .nonnegative()
        .optional(),

    mrcAmount: z
        .number()
        .nonnegative()
        .optional(),

    otcAmount: z
        .number()
        .nonnegative()
        .optional(),

    expectedClosingMonth: z
        .string()
        .min(1, "Expected closing month is required"),

    maturityStage: z
        .string()
        .optional(),

    maturityPercentage: z
        .number()
        .min(0)
        .max(100)
        .optional(),

    remarks: z
        .string()
        .optional(),


    // Activation
    expectedActivationDate: z
        .coerce
        .date()
        .optional(),

    lostNote: z
        .string()
        .optional(),

    wonDocumentUrl: z
        .string()
        .url()
        .optional(),

    proposalDocumentUrl: z
        .string()
        .url()
        .optional(),


    // Status
    status: z
        .string()
        .optional(),

    totalUser: z
        .number()
        .int()
        .nonnegative()
        .optional(),

    activationStatus: z
        .string()
        .optional(),

    actualActivationDate: z
        .coerce
        .date()
        .optional(),

    startBillingDate: z
        .coerce
        .date()
        .optional(),

    isActivationMailSend: z
        .boolean()
        .optional(),

    isBillingMailSend: z
        .boolean()
        .optional(),

    billingStatus: z
        .string()
        .optional(),


    // Activation / Billing information
    popName: z
        .string()
        .optional(),

    nid: z
        .string()
        .optional(),

    serviceId: z
        .string()
        .optional(),

    billingAccess: z
        .string()
        .optional(),

    myStoreId: z
        .string()
        .optional(),

    ticketId: z
        .string()
        .optional(),

    pppoeUser: z
        .string()
        .optional(),

    pppoePassword: z
        .string()
        .optional(),

    ispType: z
        .string()
        .optional(),


    // Location relation
    locationId: z
        .number()
        .int()
        .positive()
        .optional(),
});


/* =========================================================
   Create Lead
   Lead + Connectivity Locations
========================================================= */

export const createLeadSchema = leadSchema.extend({

    connectivityLocations: z
        .array(connectivityLocationSchema)
        .optional(),
    maturityHistories: maturityHistoriesSchema.optional(),
});



/* =========================================================
   Update Lead
========================================================= */

export const updateLeadSchema = createLeadSchema.partial();

