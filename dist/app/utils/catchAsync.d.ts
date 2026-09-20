import { NextFunction, Request, Response } from "express";
type TAsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const catchAsync: (fn: TAsyncHandler) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=catchAsync.d.ts.map