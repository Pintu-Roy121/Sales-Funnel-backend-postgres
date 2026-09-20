"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const prisma_1 = require("@/app/config/prisma");
const appError_1 = __importDefault(require("@/app/errorHelpers/appError"));
const http_status_codes_1 = require("http-status-codes");
const createClient = async (payload) => {
    const { clientOldId } = payload;
    const isClientExist = await prisma_1.prisma.client.findUnique({
        where: { clientOldId },
    });
    if (isClientExist) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Client Already Exist");
    }
    // if (!clientId) {
    //   const randomDigits = Math.floor(100000 + Math.random() * 900000);
    //   payload.clientId = `CL-${randomDigits}`;
    // }
    const result = payload;
    // const result = await prisma.client.create({ data: payload });
    return result;
};
exports.ClientService = { createClient };
//# sourceMappingURL=client.service.js.map