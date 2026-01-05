import { type Request, type Response } from "express";
import { QuestionService } from "./question.service.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";

const questionService = new QuestionService();

/**
 * @swagger
 * tags:
 *   - name: Questions
 *     description: Question management
 */
export class QuestionController {
  /**
   * @swagger
   * /api/v1/questions:
   *   get:
   *     summary: Get all questions
   *     tags: [Questions]
   *     responses:
   *       200:
   *         description: List of all questions
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
   *                   example: "Questions retrieved successfully"
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       title:
   *                         type: string
   *                       body:
   *                         type: string
   *                       author:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: string
   *                           username:
   *                             type: string
   *                           email:
   *                             type: string
   */
  getAllQuestions = asyncHandler(async (_req: Request, res: Response) => {
    const questions = await questionService.getAllQuestions();
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  });

  /**
   * @swagger
   * /api/v1/questions/{questionId}:
   *   get:
   *     summary: Get question by ID
   *     tags: [Questions]
   *     parameters:
   *       - name: questionId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Question retrieved successfully
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
   *                   example: "Question retrieved successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     title:
   *                       type: string
   *                     body:
   *                       type: string
   *                     author:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         username:
   *                           type: string
   *                         email:
   *                           type: string
   */
  getQuestionById = asyncHandler(async (req: Request, res: Response) => {
    const question = await questionService.getQuestionById(
      req.params.questionId
    );
    res.status(200).json({
      success: true,
      message: "Question retrieved successfully",
      data: question,
    });
  });

  /**
   * @swagger
   * /api/v1/questions/author/{authorId}:
   *   get:
   *     summary: Get questions by author
   *     tags: [Questions]
   *     parameters:
   *       - name: authorId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Author's questions retrieved successfully
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
   *                   example: "Questions retrieved successfully"
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       title:
   *                         type: string
   *                       body:
   *                         type: string
   */
  getQuestionsByAuthor = asyncHandler(async (req: Request, res: Response) => {
    const questions = await questionService.getQuestionsByAuthor(
      req.params.authorId
    );
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  });

  /**
   * @swagger
   * /api/v1/questions:
   *   post:
   *     summary: Create a new question
   *     tags: [Questions]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - body
   *             properties:
   *               title:
   *                 type: string
   *                 minLength: 10
   *                 maxLength: 200
   *                 example: "How to implement authentication?"
   *               body:
   *                 type: string
   *                 minLength: 20
   *                 maxLength: 5000
   *                 example: "I need help with implementing JWT authentication..."
   *     responses:
   *       201:
   *         description: Question created successfully
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
   *                   example: "Question created successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     title:
   *                       type: string
   *                     body:
   *                       type: string
   */
  createQuestion = asyncHandler(async (req: Request, res: Response) => {
    const question = await questionService.createQuestion(
      req.user!.userId,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  });

  /**
   * @swagger
   * /api/v1/questions/{questionId}:
   *   put:
   *     summary: Update a question
   *     tags: [Questions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: questionId
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
   *             properties:
   *               title:
   *                 type: string
   *                 minLength: 10
   *                 maxLength: 200
   *               body:
   *                 type: string
   *                 minLength: 20
   *                 maxLength: 5000
   *     responses:
   *       200:
   *         description: Question updated successfully
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
   *                   example: "Question updated successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     title:
   *                       type: string
   *                     body:
   *                       type: string
   */
  updateQuestion = asyncHandler(async (req: Request, res: Response) => {
    const question = await questionService.updateQuestion(
      req.user!.userId,
      req.params.questionId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: question,
    });
  });

  /**
   * @swagger
   * /api/v1/questions/{questionId}:
   *   delete:
   *     summary: Delete a question
   *     tags: [Questions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: questionId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Question deleted successfully
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
   *                   example: "Question deleted successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     title:
   *                       type: string
   *                     body:
   *                       type: string
   */
  deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
    const question = await questionService.deleteQuestion(
      req.user!.userId,
      req.params.questionId
    );
    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
      data: question,
    });
  });
}
