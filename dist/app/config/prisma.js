"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.prisma = void 0;
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const chalk_1 = __importDefault(require("chalk"));
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}
const adapter = new adapter_pg_1.PrismaPg({
    connectionString,
});
exports.prisma = new client_1.PrismaClient({
    adapter,
});
const connectDB = async () => {
    await exports.prisma.$queryRaw `SELECT 1`;
    console.log(chalk_1.default.green.bold("✓ Database connected successfully"));
};
exports.connectDB = connectDB;
//# sourceMappingURL=prisma.js.map