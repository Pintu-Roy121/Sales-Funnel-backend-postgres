import { Response } from "express";
interface IMeta {
    page?: number;
    limit?: number;
    totalPage?: number;
    total: number;
}
interface IResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    meta?: IMeta;
}
export declare const sendResponse: <T>(res: Response, data: IResponse<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map