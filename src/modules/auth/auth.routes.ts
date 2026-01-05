import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import { validate } from "../../common/middlewares/validate.middleware.ts";
import { registerSchema, loginSchema } from "./auth.schema.ts";
import guestOnlyMiddleware from "../../common/middlewares/guestOnly.middleware.ts";

const router = Router();
const controller = new AuthController();

router.post(
  "/register",
  guestOnlyMiddleware,
  validate(registerSchema),
  controller.register
);

router.post(
  "/login",
  guestOnlyMiddleware,
  validate(loginSchema),
  controller.login
);

router.post("/logout", controller.logout);

export default router;
