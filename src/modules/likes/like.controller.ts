import { type Request, type Response } from "express";
import { LikeService } from "./like.service.ts";
import { asyncHandler } from "../../common/middlewares/asyncHandler.ts";

const likeService = new LikeService();

/**
 * @swagger
 * tags:
 *   - name: Likes
 *     description: Like management
 */
export class LikeController {
  /**
   * @swagger
   * /api/v1/likes/toggle:
   *   post:
   *     summary: Like or unlike an item
   *     description: Toggle like on a question or comment
   *     tags: [Likes]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - itemId
   *               - itemType
   *             properties:
   *               itemId:
   *                 type: string
   *                 description: ID of question or comment
   *               itemType:
   *                 type: string
   *                 enum: [question, comment]
   *                 description: Type of item to like
   *     responses:
   *       200:
   *         description: Like toggled successfully
   */
  toggleLike = asyncHandler(async (req: Request, res: Response) => {
    const { itemId, itemType } = req.body;
    const result = await likeService.toggleLike(
      req.user!.userId,
      itemId,
      itemType
    );

    res.status(200).json({
      success: true,
      message: result.liked ? "Liked successfully" : "Unliked successfully",
      data: result,
    });
  });

  /**
   * @swagger
   * /api/v1/likes/check:
   *   get:
   *     summary: Check if user liked an item
   *     tags: [Likes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: itemId
   *         in: query
   *         required: true
   *         schema:
   *           type: string
   *       - name: itemType
   *         in: query
   *         required: true
   *         schema:
   *           type: string
   *           enum: [question, comment]
   *     responses:
   *       200:
   *         description: Check completed
   */
  checkIfLiked = asyncHandler(async (req: Request, res: Response) => {
    const { itemId, itemType } = req.query;

    if (!itemId || !itemType) {
      return res.status(400).json({
        success: false,
        message: "itemId and itemType are required",
      });
    }

    const liked = await likeService.checkIfLiked(
      req.user!.userId,
      itemId as string,
      itemType as string
    );

    res.status(200).json({
      success: true,
      message: "Check completed successfully",
      data: { liked },
    });
  });

  /**
   * @swagger
   * /api/v1/likes/questions/{questionId}:
   *   get:
   *     summary: Get likes for a question
   *     tags: [Likes]
   *     parameters:
   *       - name: questionId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Question likes retrieved
   */
  getQuestionLikes = asyncHandler(async (req: Request, res: Response) => {
    const { questionId } = req.params;
    const result = await likeService.getLikesForQuestion(questionId);

    res.status(200).json({
      success: true,
      message: "Question likes retrieved successfully",
      data: result,
    });
  });

  /**
   * @swagger
   * /api/v1/likes/comments/{commentId}:
   *   get:
   *     summary: Get likes for a comment
   *     tags: [Likes]
   *     parameters:
   *       - name: commentId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Comment likes retrieved
   */
  getCommentLikes = asyncHandler(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const result = await likeService.getLikesForComment(commentId);

    res.status(200).json({
      success: true,
      message: "Comment likes retrieved successfully",
      data: result,
    });
  });

  /**
   * @swagger
   * /api/v1/likes/users/{userId}/questions:
   *   get:
   *     summary: Get user's liked questions
   *     tags: [Likes]
   *     parameters:
   *       - name: userId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User's liked questions retrieved
   */
  getUserLikedQuestions = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const questions = await likeService.getUserLikedQuestions(userId);

    res.status(200).json({
      success: true,
      message: "User's liked questions retrieved successfully",
      data: {
        count: questions.length,
        questions,
      },
    });
  });

  /**
   * @swagger
   * /api/v1/likes/users/{userId}/comments:
   *   get:
   *     summary: Get user's liked comments
   *     tags: [Likes]
   *     parameters:
   *       - name: userId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User's liked comments retrieved
   */
  getUserLikedComments = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const comments = await likeService.getUserLikedComments(userId);

    res.status(200).json({
      success: true,
      message: "User's liked comments retrieved successfully",
      data: {
        count: comments.length,
        comments,
      },
    });
  });
}
