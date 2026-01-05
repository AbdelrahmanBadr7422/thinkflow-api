import { Router } from "express";
import { UserController } from "./user.controller.ts";
import { validate } from "../../common/middlewares/validate.middleware.ts";
import { updateProfileSchema, changePasswordSchema } from "./user.schema.ts";
import { asyncHandler } from "../../common/middlewares/asyncHandler.ts";

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
