import Joi from "joi";

export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional().messages({
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot exceed 30 characters",
  }),

  email: Joi.string().email().optional().messages({
    "string.email": "Please provide a valid email address",
  }),
}).or("username", "email");

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    "any.required": "Old password is required",
  }),

  newPassword: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    "any.required": "New password is required",
  }),
});
