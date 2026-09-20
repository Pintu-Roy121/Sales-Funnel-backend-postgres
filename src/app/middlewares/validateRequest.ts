import { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

export const validateRequest = (validators: any[]) => [
  ...validators,

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      req.body = matchedData(req);

      next();
    } catch (error) {
      next(error);
    }
  },
];
