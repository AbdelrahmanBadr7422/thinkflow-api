import { type Request, type Response } from "express";
import { CommentService } from "./comment.service.ts";
import { asyncHandler } from "../../common/middlewares/asyncHandler.ts";

const commentService = new CommentService();

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Comment management
 */
export class CommentController {
  /**
   * @swagger
   * /api/v1/comments:
   *   post:
   *     summary: Create a new comment
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - body
   *               - questionId
   *             properties:
   *               body:
   *                 type: string
   *                 minLength: 5
   *                 maxLength: 5000
   *                 example: "This is a helpful comment!"
   *               questionId:
   *                 type: string
   *                 example: "507f1f77bcf86cd799439011"
   *     responses:
   *       201:
   *         description: Comment created successfully
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
   *                   example: "Comment created successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     body:
   *                       type: string
   *                     authorId:
   *                       type: string
   *                     questionId:
   *                       type: string
   */
  createComment = asyncHandler(async (req: Request, res: Response) => {
    const comment = await commentService.createComment(
      req.user!.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  });

  /**
   * @swagger
   * /api/v1/comments/{commentId}:
   *   get:
   *     summary: Get a comment by ID
   *     tags: [Comments]
   *     parameters:
   *       - name: commentId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Comment retrieved successfully
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
   *                   example: "Comment retrieved successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     body:
   *                       type: string
   *                     authorId:
   *                       type: string
   *                     questionId:
   *                       type: string
   */
  getCommentById = asyncHandler(async (req: Request, res: Response) => {
    const comment = await commentService.getCommentById(req.params.commentId);
    res.status(200).json({
      success: true,
      message: "Comment retrieved successfully",
      data: comment,
    });
  });

  /**
   * @swagger
   * /api/v1/comments/{commentId}:
   *   put:
   *     summary: Update a comment
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: commentId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - body
   *             properties:
   *               body:
   *                 type: string
   *                 minLength: 5
   *                 maxLength: 5000
   *                 example: "Updated comment text"
   *     responses:
   *       200:
   *         description: Comment updated successfully
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
   *                   example: "Comment updated successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     body:
   *                       type: string
   */
  updateComment = asyncHandler(async (req: Request, res: Response) => {
    const comment = await commentService.updateComment(
      req.user!.userId,
      req.params.commentId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  });

  /**
   * @swagger
   * /api/v1/comments/{commentId}:
   *   delete:
   *     summary: Delete a comment
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: commentId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Comment deleted successfully
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
   *                   example: "Comment deleted successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     body:
   *                       type: string
   */
  deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const comment = await commentService.deleteComment(
      req.user!.userId,
      req.params.commentId
    );

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      data: comment,
    });
  });

  /**
   * @swagger
   * /api/v1/comments/author/{authorId}:
   *   get:
   *     summary: Get comments by author
   *     tags: [Comments]
   *     parameters:
   *       - name: authorId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Author comments retrieved successfully
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
   *                   example: "Comments retrieved successfully"
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       body:
   *                         type: string
   *                       questionId:
   *                         type: string
   */
  getCommentsByAuthor = asyncHandler(async (req: Request, res: Response) => {
    const comments = await commentService.getCommentsByAuthor(
      req.params.authorId
    );

    res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      data: comments,
    });
  });

  /**
   * @swagger
   * /api/v1/comments/question/{questionId}:
   *   get:
   *     summary: Get comments by question
   *     tags: [Comments]
   *     parameters:
   *       - name: questionId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Question comments retrieved successfully
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
   *                   example: "Comments retrieved successfully"
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       body:
   *                         type: string
   *                       authorId:
   *                         type: string
   */
  getCommentsByQuestion = asyncHandler(async (req: Request, res: Response) => {
    const comments = await commentService.getCommentsByQuestion(
      req.params.questionId
    );

    res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      data: comments,
    });
  });

  /**
   * @swagger
   * /api/v1/comments/author/{authorId}/count:
   *   get:
   *     summary: Count comments by author
   *     tags: [Comments]
   *     parameters:
   *       - name: authorId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Comment count retrieved successfully
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
   *                   example: "Comment count retrieved successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     count:
   *                       type: integer
   *                       example: 15
   */
  countCommentsByAuthor = asyncHandler(async (req: Request, res: Response) => {
    const count = await commentService.countCommentsByAuthor(
      req.params.authorId
    );

    res.status(200).json({
      success: true,
      message: "Comment count retrieved successfully",
      data: { count },
    });
  });

  /**
   * @swagger
   * /api/v1/comments/question/{questionId}/count:
   *   get:
   *     summary: Count comments by question
   *     tags: [Comments]
   *     parameters:
   *       - name: questionId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Comment count retrieved successfully
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
   *                   example: "Comment count retrieved successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     count:
   *                       type: integer
   *                       example: 8
   */
  countCommentsByQuestion = asyncHandler(
    async (req: Request, res: Response) => {
      const count = await commentService.countCommentsByQuestion(
        req.params.questionId
      );

      res.status(200).json({
        success: true,
        message: "Comment count retrieved successfully",
        data: { count },
      });
    }
  );
}
