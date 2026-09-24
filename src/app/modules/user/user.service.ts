import { envVars } from "@/app/config/env";
import { prisma } from "@/app/config/prisma";
import AppError from "@/app/errorHelpers/appError";
import { getPagination, getPaginationResponse } from "@/app/utils/pagination";
import bcrypt from "bcryptjs";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { TCreateUser } from "./user.interface";

const createUser = async (payload: TCreateUser) => {
  const { password, email, ...rest } = payload;

  if (!email) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email is required!");
  }
  if (!password) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is required!");
  }
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new AppError(StatusCodes.CONFLICT, "Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const createPayload = {
    ...rest,
    email,
    password: hashedPassword,
  };

  const userCount = await prisma.user.count();

  // First user = System Admin
  if (userCount === 0) {
    const result = await prisma.user.create({
      data: createPayload
    });

    return result;
  }

  const result = await prisma.user.create({ data: createPayload });

  return result;
};

const getAllUser = async (req: Request) => {
  const { page, limit, skip } = getPagination(req);

  const total = await prisma.user.count();
  const data = await prisma.user.findMany({
    take: limit,
    skip,
    orderBy: { createdAt: "desc" },
  });

  const result = getPaginationResponse({ data, total, page, limit });
  return result;
};

export const UserService = { createUser, getAllUser };
