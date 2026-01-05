import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import guestOnlyMiddleware from "../../common/middlewares/guestOnly.middleware.js";

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
