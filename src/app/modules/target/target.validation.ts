import { TargetType } from "@prisma/client";
import { z } from "zod";

const decimalField = (fieldName: string) =>
    z
        .union([
            z.string(),
            z.number(),
        ])
        .refine(
            (value) => {
                const stringValue = String(value);

                return /^\d+(\.\d+)?$/.test(stringValue);
            },
            {
                message: `${fieldName} must be a valid decimal number`,
            },
        )
        .refine(
            (value) => Number(value) >= 0,
            {
                message: `${fieldName} cannot be negative`,
            },
        );

const positiveIntegerField = (fieldName: string) =>
    z.coerce
        .number({
            message: `${fieldName} must be a positive integer`,
        })
        .int(`${fieldName} must be a positive integer`)
        .min(1, `${fieldName} must be a positive integer`);

const nonNegativeIntegerField = (fieldName: string) =>
    z.coerce
        .number({
            message: `${fieldName} must be a non-negative integer`,
        })
        .int(`${fieldName} must be a non-negative integer`)
        .min(0, `${fieldName} must be a non-negative integer`);

export const createTargetSchema = z.object({
    month: z
        .string({
            message: "Month is required",
        })
        .trim()
        .min(1, "Month is required")
        .regex(
            /^\d{4}-(0[1-9]|1[0-2])$/,
            "Month must be in YYYY-MM format",
        ),

    targetType: z
        .enum(Object.values(TargetType) as [string, ...string[]], {
            message: "Target type must be amount, pcs, or both",
        })
        .default(TargetType.both),

    targetAmount: decimalField("Target amount").optional(),

    targetPcs: nonNegativeIntegerField("Target pcs").optional(),

    achievedAmount: decimalField("Achieved amount").optional(),

    maturityAmount: decimalField("Maturity amount").optional(),

    achievedPcs: nonNegativeIntegerField("Achieved pcs").optional(),

    maturityPcs: nonNegativeIntegerField("Maturity pcs").optional(),

    userId: positiveIntegerField("User ID"),

    setById: positiveIntegerField("Set by ID"),

    teamLeadId: positiveIntegerField("Team lead ID"),
});

export type TCreateTarget = z.infer<typeof createTargetSchema>;