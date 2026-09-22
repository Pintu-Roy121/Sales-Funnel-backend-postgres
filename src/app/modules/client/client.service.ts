import { prisma } from "@/app/config/prisma";
import AppError from "@/app/errorHelpers/appError";
import { getPagination, getPaginationResponse } from "@/app/utils/pagination";
import { Request } from "express";
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

  const result = await prisma.client.create({ data: payload });

  return result;
};

const getAllClient = async (payload: Request) => {
  const { page, limit, skip } = getPagination(payload);

  const total = await prisma.client.count();
  const data = await prisma.client.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const result = getPaginationResponse({
    data,
    total,
    page,
    limit,
  });
  return result;
};

export const ClientService = { createClient, getAllClient };
