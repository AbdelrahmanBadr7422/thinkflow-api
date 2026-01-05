import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot exceed 30 characters",
  }),

  email: Joi.string().email().required().lowercase().messages({
    "string.email": "Please provide a valid email address",
  }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().optional(),
  username: Joi.string().min(3).max(30).optional(),
  password: Joi.string().required(),
}).or("email", "username");
