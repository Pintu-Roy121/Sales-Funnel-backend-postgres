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


/* =========================================================
   Lead
========================================================= */

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
});


/* =========================================================
   Update Lead
========================================================= */

export const updateLeadSchema = createLeadSchema.partial();


// import { ActivationStatus, BillingStatus, ClientClass, ClientType, LeadStatus } from '@prisma/client';
// import { body } from 'express-validator';

// export const createLeadSchema = [
//     // User relations
//     body('kamId')
//         .isInt({ min: 1 })
//         .withMessage('kamId must be a valid integer'),

//     body('userEmail')
//         .notEmpty()
//         .withMessage('userEmail is required')
//         .isEmail()
//         .withMessage('userEmail must be a valid email'),
//     // body('teamLeadId')
//     //     .optional({ values: "null" })
//     //     .isInt({ min: 1 })
//     //     .withMessage('teamLeadId must be a valid integer'),

//     // body('atlId')
//     //     .optional({ nullable: true })
//     //     .isInt({ min: 1 })
//     //     .withMessage('atlId must be a valid integer'),

//     // body('createdById')
//     //     .optional({ nullable: true })
//     //     .isInt({ min: 1 })
//     //     .withMessage('createdById must be a valid integer'),

//     // Client information
//     body('clientType')
//         .optional()
//         .default('CORP')
//         .isIn(Object.values(ClientType))
//         .withMessage('Invalid clientType'),

//     body('clientClass')
//         .optional()
//         .default('new')
//         .isIn(Object.values(ClientClass))
//         .withMessage('Invalid clientClass'),

//     body('organizationName')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('organizationName must be a string'),

//     body('division')
//         .notEmpty()
//         .withMessage('division is required')
//         .isString()
//         .trim()
//         .withMessage('division must be a string'),

//     body('district')
//         .notEmpty()
//         .withMessage('district is required')
//         .isString()
//         .trim()
//         .withMessage('district must be a string'),

//     body('thana')
//         .notEmpty()
//         .withMessage('thana is required')
//         .isString()
//         .trim()
//         .withMessage('thana must be a string'),

//     body('detailedAddress')
//         .optional({ values: "null" })
//         .isString()
//         .trim()
//         .withMessage('detailedAddress must be a string'),

//     body('clientFName')
//         .notEmpty()
//         .withMessage('clientFName is required')
//         .isString()
//         .trim()
//         .withMessage('clientFName must be a string'),

//     body('clientLName')
//         .notEmpty()
//         .withMessage('clientLName is required')
//         .isString()
//         .trim()
//         .withMessage('clientLName must be a string'),

//     body('clientDesignation')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('clientDesignation must be a string'),

//     body('clientMobileNumber')
//         .notEmpty()
//         .withMessage('clientMobileNumber is required')
//         .isMobilePhone('bn-BD')
//         .withMessage('Invalid Bangladesh mobile number'),

//     body('clientEmail')
//         .notEmpty()
//         .withMessage('clientEmail is required')
//         .isEmail()
//         .normalizeEmail()
//         .withMessage('Invalid email address'),

//     body('clientIndustry')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('clientIndustry must be a string'),

//     body('houseHold')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('houseHold must be a string'),

//     body('existingPreviousIsp')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('existingPreviousIsp must be a string'),

//     body('connectivityMethod')
//         .notEmpty()
//         .withMessage('connectivityMethod is required')
//         .isString()
//         .trim()
//         .withMessage('connectivityMethod must be a string'),

//     body('serviceClass')
//         .notEmpty()
//         .withMessage('serviceClass is required')
//         .isString()
//         .trim()
//         .withMessage('serviceClass must be a string'),

//     body('serviceType')
//         .isArray({ min: 1 })
//         .withMessage('serviceType must be a non-empty array'),

//     body('serviceType.*')
//         .isString()
//         .trim()
//         .withMessage('Each serviceType must be a string'),

//     body('addOnType')
//         .optional()
//         .isString()
//         .trim()
//         .withMessage('addOnType must be a string'),

//     body('packageName')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('packageName must be a string'),

//     // Lead metrics
//     body('interactionCount')
//         .optional()
//         .isInt({ min: 0 })
//         .withMessage('interactionCount must be a non-negative integer'),

//     body('mrcAmount')
//         .optional()
//         .isDecimal()
//         .withMessage('mrcAmount must be a valid decimal number'),

//     body('otcAmount')
//         .optional()
//         .isDecimal()
//         .withMessage('otcAmount must be a valid decimal number'),

//     body('expectedClosingMonth')
//         .notEmpty()
//         .withMessage('expectedClosingMonth is required')
//         .isString()
//         .trim()
//         .withMessage('expectedClosingMonth must be a string'),

//     body('maturityStage')
//         .optional()
//         .isString()
//         .trim()
//         .withMessage('maturityStage must be a string'),

//     body('maturityPercentage')
//         .optional()
//         .isDecimal()
//         .withMessage('maturityPercentage must be a valid decimal number')
//         .custom((value) => {
//             const percentage = Number(value);

//             if (percentage < 0 || percentage > 100) {
//                 throw new Error('maturityPercentage must be between 0 and 100');
//             }

//             return true;
//         }),

//     body('remarks')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('remarks must be a string'),

//     // Activation
//     body('expectedActivationDate')
//         .optional({ nullable: true })
//         .isISO8601()
//         .withMessage('expectedActivationDate must be a valid date'),

//     body('lostNote')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('lostNote must be a string'),

//     body('wonDocumentUrl')
//         .optional({ nullable: true })
//         .isURL()
//         .withMessage('wonDocumentUrl must be a valid URL'),

//     body('proposalDocumentUrl')
//         .optional({ nullable: true })
//         .isURL()
//         .withMessage('proposalDocumentUrl must be a valid URL'),

//     body('status')
//         .optional()
//         .default('open')
//         .isIn(Object.values(LeadStatus))
//         .withMessage('Invalid lead status'),

//     body('totalUser')
//         .optional()
//         .isInt({ min: 0 })
//         .withMessage('totalUser must be a non-negative integer'),

//     body('activationStatus')
//         .optional()
//         .default('pending')
//         .isIn(Object.values(ActivationStatus))
//         .withMessage('Invalid activationStatus'),

//     body('actualActivationDate')
//         .optional({ nullable: true })
//         .isISO8601()
//         .withMessage('actualActivationDate must be a valid date'),

//     body('startBillingDate')
//         .optional({ nullable: true })
//         .isISO8601()
//         .withMessage('startBillingDate must be a valid date'),

//     body('isActivationMailSend')
//         .optional()
//         .isBoolean()
//         .withMessage('isActivationMailSend must be a boolean'),

//     body('isBillingMailSend')
//         .optional()
//         .isBoolean()
//         .withMessage('isBillingMailSend must be a boolean'),

//     body('billingStatus')
//         .optional()
//         .default('pending')
//         .isIn(Object.values(BillingStatus))
//         .withMessage('Invalid billingStatus'),

//     // Additional activation information
//     body('popName')
//         .optional()
//         .isString()
//         .trim()
//         .withMessage('popName must be a string'),

//     body('nid')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('nid must be a string'),

//     body('serviceId')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('serviceId must be a string'),

//     body('billingAccess')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('billingAccess must be a string'),

//     body('myStoreId')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('myStoreId must be a string'),

//     body('ticketId')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('ticketId must be a string'),

//     body('pppoeUser')
//         .optional({ nullable: true })
//         .isString()
//         .trim()
//         .withMessage('pppoeUser must be a string'),

//     body('pppoePassword')
//         .optional({ nullable: true })
//         .isString()
//         .withMessage('pppoePassword must be a string'),

//     body('ispType')
//         .optional()
//         .isString()
//         .trim()
//         .withMessage('ispType must be a string'),

//     // Location relation
//     body('locationId')
//         .optional({ nullable: true })
//         .isInt({ min: 1 })
//         .withMessage('locationId must be a valid integer'),

//     //Connectivity Location
//     body("connectivityLocations")
//         .optional()
//         .isArray()
//         .withMessage("connectivityLocations must be an array"),

//     body("connectivityLocations.*.serviceName")
//         .trim()
//         .notEmpty()
//         .withMessage("serviceName is required"),

//     body("connectivityLocations.*.address")
//         .trim()
//         .notEmpty()
//         .withMessage("address is required"),

//     body("connectivityLocations.*.packageName")
//         .optional()
//         .isString()
//         .withMessage("packageName must be a string")
//         .trim(),

//     body("connectivityLocations.*.remarks")
//         .optional()
//         .isString()
//         .withMessage("remarks must be a string")
//         .trim(),

//     body("connectivityLocations.*.mrc")
//         .optional()
//         .isFloat({ min: 0 })
//         .withMessage("mrc must be a valid number"),

//     body("connectivityLocations.*.otc")
//         .optional()
//         .isFloat({ min: 0 })
//         .withMessage("otc must be a valid number"),

//     body("connectivityLocations.*.qty")
//         .optional()
//         .isInt({ min: 0 })
//         .withMessage("qty must be a valid integer"),

//     body("connectivityLocations.*.tkPerMb")
//         .optional()
//         .isFloat({ min: 0 })
//         .withMessage("tkPerMb must be a valid number"),
// ];

