import { type Request, type Response, type NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies?.token || req.headers.authorization) {
    return res.status(400).json({
      success: false,
      message: "Already logged in",
    });
  }
  next();
};
