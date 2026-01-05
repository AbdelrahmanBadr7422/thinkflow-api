import { type Request, type Response, type NextFunction } from "express";
import { type ObjectSchema } from "joi";
import { ApiError } from "../errors/ApiError.js";

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }

    next();
  };
