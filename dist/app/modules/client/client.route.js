"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = require("express");
const client_controller_1 = require("./client.controller");
const router = (0, express_1.Router)();
router.post("/create-client", 
//   validateRequest(createClientValidator),
client_controller_1.ClientController.createClient);
exports.ClientRoutes = router;
//# sourceMappingURL=client.route.js.map