import Joi from "joi";

export const questionSchema = Joi.object({
  title: Joi.string().min(10).max(200).required().messages({
    "string.min": "Title must be at least 10 characters long",
    "string.max": "Title cannot exceed 200 characters",
  }),

  body: Joi.string().min(20).max(5000).required().messages({
    "string.min": "Question body must be at least 20 characters long",
    "string.max": "Question body cannot exceed 5000 characters",
  }),
});

export const updateQuestionSchema = Joi.object({
  title: Joi.string().min(10).max(200).optional().messages({
    "string.min": "Title must be at least 10 characters long",
    "string.max": "Title cannot exceed 200 characters",
  }),

  body: Joi.string().min(20).max(5000).optional().messages({
    "string.min": "Question body must be at least 20 characters long",
    "string.max": "Question body cannot exceed 5000 characters",
  }),
}).or("title", "body");