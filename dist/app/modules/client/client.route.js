"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const validateRequest_1 = require("@/app/middlewares/validateRequest");
const express_1 = require("express");
const client_controller_1 = require("./client.controller");
const client_validation_1 = require("./client.validation");
const router = (0, express_1.Router)();
router.post("/create-client", (0, validateRequest_1.validateRequest)(client_validation_1.createClientValidator), client_controller_1.ClientController.createClient);
router.get("/get-all", client_controller_1.ClientController.getAllClient);
exports.ClientRoutes = router;
//# sourceMappingURL=client.route.js.map