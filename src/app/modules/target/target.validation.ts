import { TargetType } from '@prisma/client';
import { body } from 'express-validator';

export const createTargetValidation = [
    body('month')
        .trim()
        .notEmpty()
        .withMessage('Month is required')
        .matches(/^\d{4}-(0[1-9]|1[0-2])$/)
        .withMessage('Month must be in YYYY-MM format'),

    body('targetType')
        .default('both')
        .isIn(Object.values(TargetType))
        .withMessage('Target type must be amount, pcs, or both'),

    body('targetAmount')
        .optional()
        .isDecimal()
        .withMessage('Target amount must be a valid decimal number')
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error('Target amount cannot be negative');
            }

            return true;
        }),

    body('targetPcs')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Target pcs must be a non-negative integer'),

    body('achievedAmount')
        .optional()
        .isDecimal()
        .withMessage('Achieved amount must be a valid decimal number')
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error('Achieved amount cannot be negative');
            }

            return true;
        }),

    body('maturityAmount')
        .optional()
        .isDecimal()
        .withMessage('Maturity amount must be a valid decimal number')
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error('Maturity amount cannot be negative');
            }

            return true;
        }),

    body('achievedPcs')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Achieved pcs must be a non-negative integer'),

    body('maturityPcs')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Maturity pcs must be a non-negative integer'),

    body('userId')
        .notEmpty()
        .withMessage('User ID is required')
        .isInt({ min: 1 })
        .withMessage('User ID must be a positive integer'),

    body('setById')
        .notEmpty()
        .withMessage('Set by ID is required')
        .isInt({ min: 1 })
        .withMessage('Set by ID must be a positive integer'),

    body('teamLeadId')
        .notEmpty()
        .withMessage('Team lead ID is required')
        .isInt({ min: 1 })
        .withMessage('Team lead ID must be a positive integer'),
];