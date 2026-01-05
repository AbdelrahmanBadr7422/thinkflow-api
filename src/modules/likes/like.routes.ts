import { Router } from "express";
import { LikeController } from "./like.controller.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import authMiddleware from "../../common/middlewares/auth.middleware.js";

const router = Router();
const controller = new LikeController();

// Public endpoints
router.get("/questions/:questionId", asyncHandler(controller.getQuestionLikes));
router.get("/comments/:commentId", asyncHandler(controller.getCommentLikes));
router.get(
  "/users/:userId/questions",
  asyncHandler(controller.getUserLikedQuestions)
);
router.get(
  "/users/:userId/comments",
  asyncHandler(controller.getUserLikedComments)
);

// Protected endpoints (need auth)
router.post("/toggle", authMiddleware, asyncHandler(controller.toggleLike));
router.get("/check", authMiddleware, asyncHandler(controller.checkIfLiked));

export default router;
