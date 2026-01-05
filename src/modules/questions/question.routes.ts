import { Router } from "express";
import { QuestionController } from "./question.controller.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { questionSchema, updateQuestionSchema } from "./question.schema.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import authMiddleware from "../../common/middlewares/auth.middleware.js";

const router = Router();
const controller = new QuestionController();

router.get("/", asyncHandler(controller.getAllQuestions));
router.get("/:questionId", asyncHandler(controller.getQuestionById));
router.get("/author/:authorId", asyncHandler(controller.getQuestionsByAuthor));

router.post(
  "/",
  authMiddleware,
  validate(questionSchema),
  asyncHandler(controller.createQuestion)
);
router.put(
  "/:questionId",
  authMiddleware,
  validate(updateQuestionSchema),
  asyncHandler(controller.updateQuestion)
);
router.delete(
  "/:questionId",
  authMiddleware,
  asyncHandler(controller.deleteQuestion)
);

export default router;
