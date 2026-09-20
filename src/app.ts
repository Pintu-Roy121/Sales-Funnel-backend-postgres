import cors from "cors";
import express from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://sales.agni.com",
  "http://localhost:3001",
];
// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server API is running",
    timestamp: new Date(),
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
