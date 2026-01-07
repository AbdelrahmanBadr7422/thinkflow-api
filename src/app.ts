import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

import { connectDB } from "./config/database.js";
import { errorHandler } from "./common/errors/errorHandler.js";
import swaggerDocs from "./config/swagger.js";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/users/user.routes.js";
import questionRouter from "./modules/questions/question.routes.js";
import commentRouter from "./modules/comments/comment.routes.js";
import likeRouter from "./modules/likes/like.routes.js";
import authMiddleware from "./common/middlewares/auth.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB().then(() => console.log("Database connected"));

const frontendURL = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:4200",
      "https://thinkflow-api.vercel.app/",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

app.use((req, _res, next) => {
  req.requestId = randomUUID();
  console.log(`[${req.requestId}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use((_req, res, next) => {
  res.setHeader("X-API-Version", "1.0.0");
  res.setHeader("X-Service-Name", "ThinkFlow API");
  next();
});

swaggerDocs(app);

app.get("/health", async (_req, res) => {
  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "thinkflow-api",
    version: "1.0.0",
    uptime: process.uptime(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  };
  res.json(healthCheck);
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
});

app.use("/api/v1/auth", authLimiter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/users", authMiddleware, userRouter);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
