import { type Request, type Response, type NextFunction } from "express";
import { ApiError } from "./ApiError.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  logger.error(err.message, {
    path: req.originalUrl,
    method: req.method,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" && statusCode === 500
        ? "Internal server error"
        : err.message,
  });
};
