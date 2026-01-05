import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.ts";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.token ||
    (authHeader?.startsWith("Bearer ") && authHeader.split(" ")[1]);

  if (!token) {
    return next(
      new ApiError(
        401,
        "Authentication required. Please login or provide a valid token."
      )
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      next(new ApiError(401, "Token has expired. Please login again."));
    } else {
      next(new ApiError(401, "Invalid token. Please login again."));
    }
  }
};
