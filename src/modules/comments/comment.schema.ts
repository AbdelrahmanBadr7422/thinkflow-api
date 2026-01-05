import Joi from "joi";

export const commentSchema = Joi.object({
  body: Joi.string().min(5).max(5000).required().messages({
    "string.min": "Comment body must be at least 5 characters long",
    "string.max": "Comment body cannot exceed 5000 characters",
  }),
  questionId: Joi.string().required().messages({
    "string.empty": "Question ID is required",
  }),
});

export const updateCommentSchema = Joi.object({
  body: Joi.string().min(5).max(5000).required().messages({
    "string.min": "Comment body must be at least 5 characters long",
    "string.max": "Comment body cannot exceed 5000 characters",
  }),
});
