import Joi from "joi";

export const createLikeSchema = Joi.object({
  questionId: Joi.string().optional(),
  commentId: Joi.string().optional(),
}).xor("questionId", "commentId");

export const toggleLikeSchema = Joi.object({
  questionId: Joi.string().optional(),
  commentId: Joi.string().optional(),
}).xor("questionId", "commentId");
