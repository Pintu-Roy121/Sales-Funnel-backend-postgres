
import { ActivationStatus, BillingStatus, ClientClass, ClientType, LeadStatus } from '@prisma/client';
import { body } from 'express-validator';

export const createLeadValidator = [
    // User relations
    body('kamId')
        .isInt({ min: 1 })
        .withMessage('kamId must be a valid integer'),

    body('teamLeadId')
        .isInt({ min: 1 })
        .withMessage('teamLeadId must be a valid integer'),

    body('atlId')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('atlId must be a valid integer'),

    body('createdById')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('createdById must be a valid integer'),

    // Client information
    body('clientType')
        .optional()
        .default('CORP')
        .isIn(Object.values(ClientType))
        .withMessage('Invalid clientType'),

    body('clientClass')
        .optional()
        .default('new')
        .isIn(Object.values(ClientClass))
        .withMessage('Invalid clientClass'),

    body('organizationName')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('organizationName must be a string'),

    body('division')
        .notEmpty()
        .withMessage('division is required')
        .isString()
        .trim()
        .withMessage('division must be a string'),

    body('district')
        .notEmpty()
        .withMessage('district is required')
        .isString()
        .trim()
        .withMessage('district must be a string'),

    body('thana')
        .notEmpty()
        .withMessage('thana is required')
        .isString()
        .trim()
        .withMessage('thana must be a string'),

    body('detailedAddress')
        .notEmpty()
        .withMessage('detailedAddress is required')
        .isString()
        .trim()
        .withMessage('detailedAddress must be a string'),

    body('clientFName')
        .notEmpty()
        .withMessage('clientFName is required')
        .isString()
        .trim()
        .withMessage('clientFName must be a string'),

    body('clientLName')
        .notEmpty()
        .withMessage('clientLName is required')
        .isString()
        .trim()
        .withMessage('clientLName must be a string'),

    body('clientDesignation')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('clientDesignation must be a string'),

    body('clientMobileNumber')
        .notEmpty()
        .withMessage('clientMobileNumber is required')
        .isMobilePhone('bn-BD')
        .withMessage('Invalid Bangladesh mobile number'),

    body('clientEmail')
        .notEmpty()
        .withMessage('clientEmail is required')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address'),

    body('clientIndustry')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('clientIndustry must be a string'),

    body('houseHold')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('houseHold must be a string'),

    body('existingPreviousIsp')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('existingPreviousIsp must be a string'),

    body('connectivityMethod')
        .notEmpty()
        .withMessage('connectivityMethod is required')
        .isString()
        .trim()
        .withMessage('connectivityMethod must be a string'),

    body('serviceClass')
        .notEmpty()
        .withMessage('serviceClass is required')
        .isString()
        .trim()
        .withMessage('serviceClass must be a string'),

    body('serviceType')
        .isArray({ min: 1 })
        .withMessage('serviceType must be a non-empty array'),

    body('serviceType.*')
        .isString()
        .trim()
        .withMessage('Each serviceType must be a string'),

    body('addOnType')
        .optional()
        .isString()
        .trim()
        .withMessage('addOnType must be a string'),

    body('packageName')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('packageName must be a string'),

    // Lead metrics
    body('interactionCount')
        .optional()
        .isInt({ min: 0 })
        .withMessage('interactionCount must be a non-negative integer'),

    body('mrcAmount')
        .optional()
        .isDecimal()
        .withMessage('mrcAmount must be a valid decimal number'),

    body('otcAmount')
        .optional()
        .isDecimal()
        .withMessage('otcAmount must be a valid decimal number'),

    body('expectedClosingMonth')
        .notEmpty()
        .withMessage('expectedClosingMonth is required')
        .isString()
        .trim()
        .withMessage('expectedClosingMonth must be a string'),

    body('maturityStage')
        .optional()
        .isString()
        .trim()
        .withMessage('maturityStage must be a string'),

    body('maturityPercentage')
        .optional()
        .isDecimal()
        .withMessage('maturityPercentage must be a valid decimal number')
        .custom((value) => {
            const percentage = Number(value);

            if (percentage < 0 || percentage > 100) {
                throw new Error('maturityPercentage must be between 0 and 100');
            }

            return true;
        }),

    body('remarks')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('remarks must be a string'),

    // Activation
    body('expectedActivationDate')
        .optional({ nullable: true })
        .isISO8601()
        .withMessage('expectedActivationDate must be a valid date'),

    body('lostNote')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('lostNote must be a string'),

    body('wonDocumentUrl')
        .optional({ nullable: true })
        .isURL()
        .withMessage('wonDocumentUrl must be a valid URL'),

    body('proposalDocumentUrl')
        .optional({ nullable: true })
        .isURL()
        .withMessage('proposalDocumentUrl must be a valid URL'),

    body('status')
        .optional()
        .default('open')
        .isIn(Object.values(LeadStatus))
        .withMessage('Invalid lead status'),

    body('totalUser')
        .optional()
        .isInt({ min: 0 })
        .withMessage('totalUser must be a non-negative integer'),

    body('activationStatus')
        .optional()
        .default('pending')
        .isIn(Object.values(ActivationStatus))
        .withMessage('Invalid activationStatus'),

    body('actualActivationDate')
        .optional({ nullable: true })
        .isISO8601()
        .withMessage('actualActivationDate must be a valid date'),

    body('startBillingDate')
        .optional({ nullable: true })
        .isISO8601()
        .withMessage('startBillingDate must be a valid date'),

    body('isActivationMailSend')
        .optional()
        .isBoolean()
        .withMessage('isActivationMailSend must be a boolean'),

    body('isBillingMailSend')
        .optional()
        .isBoolean()
        .withMessage('isBillingMailSend must be a boolean'),

    body('billingStatus')
        .optional()
        .default('pending')
        .isIn(Object.values(BillingStatus))
        .withMessage('Invalid billingStatus'),

    // Additional activation information
    body('popName')
        .optional()
        .isString()
        .trim()
        .withMessage('popName must be a string'),

    body('nid')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('nid must be a string'),

    body('serviceId')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('serviceId must be a string'),

    body('billingAccess')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('billingAccess must be a string'),

    body('myStoreId')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('myStoreId must be a string'),

    body('ticketId')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('ticketId must be a string'),

    body('pppoeUser')
        .optional({ nullable: true })
        .isString()
        .trim()
        .withMessage('pppoeUser must be a string'),

    body('pppoePassword')
        .optional({ nullable: true })
        .isString()
        .withMessage('pppoePassword must be a string'),

    body('ispType')
        .optional()
        .isString()
        .trim()
        .withMessage('ispType must be a string'),

    // Location relation
    body('locationId')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('locationId must be a valid integer'),
];
