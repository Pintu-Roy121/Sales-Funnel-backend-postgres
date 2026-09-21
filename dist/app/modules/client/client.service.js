"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const prisma_1 = require("@/app/config/prisma");
const appError_1 = __importDefault(require("@/app/errorHelpers/appError"));
const pagination_1 = require("@/app/utils/pagination");
const http_status_codes_1 = require("http-status-codes");
const createClient = async (payload) => {
    const { clientOldId } = payload;
    const isClientExist = await prisma_1.prisma.client.findUnique({
        where: { clientOldId },
    });
    if (isClientExist) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Client Already Exist");
    }
    // const result = payload;
    const result = await prisma_1.prisma.client.create({ data: payload });
    return result;
};
const getAllClient = async (payload) => {
    const { page, limit, skip } = (0, pagination_1.getPagination)(payload);
    const total = await prisma_1.prisma.client.count();
    const data = await prisma_1.prisma.client.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
    });
    const result = (0, pagination_1.getPaginationResponse)({
        data,
        total,
        page,
        limit,
    });
    return result;
};
exports.ClientService = { createClient, getAllClient };
//# sourceMappingURL=client.service.js.map