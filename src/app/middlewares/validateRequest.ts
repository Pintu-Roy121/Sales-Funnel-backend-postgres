import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

export const validateRequest =
  (zodSchema: ZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // req.body =JSON.parse(req.body.data || {}) || req.body
        if (req.body.data) {
          req.body = JSON.parse(req.body.data);
        }
        req.body = await zodSchema.parseAsync(req.body);
        next();
      } catch (error) {
        next(error);
      }
    };

// import { NextFunction, Request, Response } from "express";
// import { matchedData, validationResult } from "express-validator";

// export const validateRequest = (validators: any[]) => [
//   ...validators,

//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           success: false,
//           message: "Validation failed",
//           errors: errors.array(),
//         });
//       }

//       req.body = matchedData(req);

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
// ];
