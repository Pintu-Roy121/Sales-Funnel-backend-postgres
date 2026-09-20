import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

export const prisma = new PrismaClient({
  adapter,
});

export const connectDB = async () => {
  await prisma.$queryRaw`SELECT 1`;
  console.log(chalk.green.bold("✓ Database connected successfully"));
};
