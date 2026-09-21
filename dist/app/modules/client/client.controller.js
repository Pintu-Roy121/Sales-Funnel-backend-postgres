"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const catchAsync_1 = require("@/app/utils/catchAsync");
const sendResponse_1 = require("@/app/utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const client_service_1 = require("./client.service");
const createClient = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await client_service_1.ClientService.createClient(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Successful!",
        data: result,
    });
});
const getAllClient = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await client_service_1.ClientService.getAllClient(req);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Successful!",
        data: result,
    });
});
exports.ClientController = { createClient, getAllClient };
//# sourceMappingURL=client.controller.js.map