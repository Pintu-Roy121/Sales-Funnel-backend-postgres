import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data?.statusCode).json({
    statusCode: data?.statusCode,
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};
