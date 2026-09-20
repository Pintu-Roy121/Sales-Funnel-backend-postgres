import { NextFunction, Request, Response } from "express";
export declare const globalErrorHandler: (err: any, req: Request, res: Response, next: NextFunction) => Promise<{
    statusCode: number;
    message: string;
} | undefined>;
//# sourceMappingURL=globalErrorHandlers.d.ts.map