import { prisma } from "@/app/config/prisma";
import AppError from "@/app/errorHelpers/appError";
import { getPagination, getPaginationResponse } from "@/app/utils/pagination";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { TCreateTarget } from "./target.type";

const createTarget = async (payload: TCreateTarget) => {
    const { userId, month, targetType } = payload;

    if (!userId || !month || !targetType) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please provide user, month, and target type.")
    }
    const isUserExist = await prisma.user.findUnique({
        where: { id: userId }
    })
    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "The specified employee or team lead was not found.")
    }


    const result = isUserExist
    // const result = prisma.target.create({
    //     data: payload
    // });

    return result;
}

const getAllTarget = async (req: Request) => {
    const { page, limit, skip } = getPagination(req)

    const total = await prisma.target.count()
    const data = await prisma.target.findMany({
        take: limit,
        skip,
        orderBy: { createdAt: "desc" }
    })

    const result = await getPaginationResponse({
        data,
        total,
        page,
        limit
    })
    return result
}

export const TargetService = {
    createTarget,
    getAllTarget
}