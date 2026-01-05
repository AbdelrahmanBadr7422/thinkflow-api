import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

import { connectDB } from "./config/database.ts";
import { errorHandler } from "./common/errors/errorHandler.ts";
import swaggerDocs from "./config/swagger.ts";

import authRouter from "./modules/auth/auth.routes.ts";
import userRouter from "./modules/users/user.routes.ts";
import questionRouter from "./modules/questions/question.routes.ts";
import commentRouter from "./modules/comments/comment.routes.ts";
import likeRouter from "./modules/likes/like.routes.ts";
import authMiddleware from "./common/middlewares/auth.middleware.ts";

const app = express();

connectDB().then(() => console.log("Database connected"));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4200"
        : process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

// Request ID middleware
app.use((req, _res, next) => {
  req.requestId = randomUUID();
  console.log(`[${req.requestId}] ${req.method} ${req.originalUrl}`);
  next();
});

// API headers
app.use((_req, res, next) => {
  res.setHeader("X-API-Version", "1.0.0");
  res.setHeader("X-Service-Name", "ThinkFlow API");
  next();
});

swaggerDocs(app);

// Health check endpoint (improved)
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

// Rate limiting for auth endpoints
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
  res.json({
    message: "ThinkFlow API",
    version: "1.0.0",
    documentation: "/api-docs",
  });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
