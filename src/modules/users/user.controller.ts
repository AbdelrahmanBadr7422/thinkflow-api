import { type Request, type Response } from "express";
import { UserService } from "./user.service.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";

const userService = new UserService();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User profile management
 */
export class UserController {
  /**
   * @swagger
   * /api/v1/users/profile:
   *   get:
   *     summary: Get current user profile
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     username:
   *                       type: string
   *                     email:
   *                       type: string
   *                     createdAt:
   *                       type: string
   *                       format: date-time
   *                     updatedAt:
   *                       type: string
   *                       format: date-time
   */
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const profile = await userService.getProfile(req.user!.userId);
    res.status(200).json({
      success: true,
      data: profile,
    });
  });

  /**
   * @swagger
   * /api/v1/users/update-profile:
   *   put:
   *     summary: Update user profile
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 minLength: 3
   *                 maxLength: 30
   *               email:
   *                 type: string
   *                 format: email
   *     responses:
   *       200:
   *         description: Profile updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Profile updated successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     username:
   *                       type: string
   *                     email:
   *                       type: string
   */
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const updatedProfile = await userService.updateProfile(
      req.user!.userId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  });

  /**
   * @swagger
   * /api/v1/users/change-password:
   *   put:
   *     summary: Change user password
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - oldPassword
   *               - newPassword
   *             properties:
   *               oldPassword:
   *                 type: string
   *               newPassword:
   *                 type: string
   *                 minLength: 8
   *     responses:
   *       200:
   *         description: Password changed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Password changed successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     username:
   *                       type: string
   *                     email:
   *                       type: string
   */
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.changePassword(req.user!.userId, req.body);
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  });
}
