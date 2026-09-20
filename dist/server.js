"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./app/config/prisma");
let server;
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await (0, prisma_1.connectDB)();
        server = app_1.default.listen(PORT, () => {
            console.log(chalk_1.default.cyan(`✓ Server is running on PORT ${PORT}`));
        });
    }
    catch (err) {
        console.error(chalk_1.default.red("Error starting server:"), err);
    }
};
startServer();
process.on("unhandledRejection", () => {
    console.error("Unhandled Rejection detected. Shutting down gracefully...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", () => {
    console.error("Uncaught Exception detected. Shutting down gracefully...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGTERM", () => {
    console.error("SIGTERM received. Shutting down gracefully...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//# sourceMappingURL=server.js.map