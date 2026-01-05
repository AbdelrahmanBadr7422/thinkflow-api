import { Router } from "express";
import { CommentController } from "./comment.controller.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { commentSchema, updateCommentSchema } from "./comment.schema.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import authMiddleware from "../../common/middlewares/auth.middleware.js";

const router = Router();
const controller = new CommentController();

router.get("/:commentId", asyncHandler(controller.getCommentById));
router.get("/author/:authorId", asyncHandler(controller.getCommentsByAuthor));
router.get(
  "/question/:questionId",
  asyncHandler(controller.getCommentsByQuestion)
);
router.get(
  "/author/:authorId/count",
  asyncHandler(controller.countCommentsByAuthor)
);
router.get(
  "/question/:questionId/count",
  asyncHandler(controller.countCommentsByQuestion)
);

router.post(
  "/",
  authMiddleware,
  validate(commentSchema),
  asyncHandler(controller.createComment)
);
router.put(
  "/:commentId",
  authMiddleware,
  validate(updateCommentSchema),
  asyncHandler(controller.updateComment)
);
router.delete(
  "/:commentId",
  authMiddleware,
  asyncHandler(controller.deleteComment)
);

export default router;
