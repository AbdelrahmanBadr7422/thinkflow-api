import { type Request, type Response } from "express";
import { AuthService } from "./auth.service.ts";
import { asyncHandler } from "../../common/middlewares/asyncHandler.ts";

const authService = new AuthService();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication endpoints
 */
export class AuthController {
  /**
   * @swagger
   * /api/v1/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 example: "johndoe"
   *               email:
   *                 type: string
   *                 example: "john@example.com"
   *               password:
   *                 type: string
   *                 example: "Password123"
   *     responses:
   *       201:
   *         description: User registered successfully
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
   *                   example: "User registered successfully"
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
  register = asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await authService.register(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });

  /**
   * @swagger
   * /api/v1/auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: "john@example.com"
   *               username:
   *                 type: string
   *                 example: "johndoe"
   *               password:
   *                 type: string
   *                 example: "Password123"
   *     responses:
   *       200:
   *         description: Login successful
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
   *                   example: "User logged in successfully"
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
  login = asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await authService.login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  });

  /**
   * @swagger
   * /api/v1/auth/logout:
   *   post:
   *     summary: Logout current user
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logged out successfully
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
   *                   example: "Logged out successfully"
   */
  logout = asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
}
