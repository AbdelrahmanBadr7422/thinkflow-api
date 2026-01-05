import { Router } from "express";
import { UserController } from "./user.controller.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { updateProfileSchema, changePasswordSchema } from "./user.schema.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";

const router = Router();
const controller = new UserController();

router.get("/profile", asyncHandler(controller.getProfile));
router.put(
  "/update-profile",
  validate(updateProfileSchema),
  asyncHandler(controller.updateProfile)
);
router.put(
  "/change-password",
  validate(changePasswordSchema),
  asyncHandler(controller.changePassword)
);

export default router;
