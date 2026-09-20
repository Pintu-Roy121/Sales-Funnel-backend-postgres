import { prisma } from "@/app/config/prisma";
import AppError from "@/app/errorHelpers/appError";
import { StatusCodes } from "http-status-codes";
import { TClient } from "./client.interface";

const createClient = async (payload: TClient) => {
  const { clientOldId } = payload;

  const isClientExist = await prisma.client.findUnique({
    where: { clientOldId },
  });

  if (isClientExist) {
    throw new AppError(StatusCodes.CONFLICT, "Client Already Exist");
  }

  // if (!clientId) {
  //   const randomDigits = Math.floor(100000 + Math.random() * 900000);
  //   payload.clientId = `CL-${randomDigits}`;
  // }

  const result = payload;
  // const result = await prisma.client.create({ data: payload });

  return result;
};

export const ClientService = { createClient };
