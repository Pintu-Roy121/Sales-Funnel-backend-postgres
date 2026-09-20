import chalk from "chalk";
import { Server } from "http";
import app from "./app";
import { connectDB } from "./app/config/prisma";

let server: Server;
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(chalk.cyan(`✓ Server is running on PORT ${PORT}`));
    });
  } catch (err) {
    console.error(chalk.red("Error starting server:"), err);
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
