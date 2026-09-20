"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandlers_1 = require("./app/middlewares/globalErrorHandlers");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
    "https://sales.agni.com",
    "http://localhost:3001",
];
// Middleware
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routes_1.router);
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server API is running",
        timestamp: new Date(),
    });
});
app.use(globalErrorHandlers_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map