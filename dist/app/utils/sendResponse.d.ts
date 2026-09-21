import { Response } from "express";
interface IResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}
export declare const sendResponse: <T>(res: Response, data: IResponse<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map