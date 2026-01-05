/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         username:
 *           type: string
 *           example: "john_doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: "john_doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           minLength: 8
 *           example: "Password123"
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         username:
 *           type: string
 *           example: "john_doe"
 *         password:
 *           type: string
 *           example: "Password123"
 *
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         title:
 *           type: string
 *           example: "How to implement authentication?"
 *         body:
 *           type: string
 *           example: "I need help with authentication..."
 *         author:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateQuestionRequest:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           minLength: 10
 *           maxLength: 200
 *           example: "How to use Swagger with Express?"
 *         body:
 *           type: string
 *           minLength: 20
 *           maxLength: 5000
 *           example: "I want to document my API with Swagger..."
 *
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "507f1f77bcf86cd799439013"
 *         body:
 *           type: string
 *           example: "This is a helpful answer!"
 *         authorId:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         questionId:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateCommentRequest:
 *       type: object
 *       required:
 *         - body
 *         - questionId
 *       properties:
 *         body:
 *           type: string
 *           minLength: 5
 *           maxLength: 5000
 *           example: "This is a helpful comment!"
 *         questionId:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "507f1f77bcf86cd799439014"
 *         userId:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         questionId:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         commentId:
 *           type: string
 *           example: "507f1f77bcf86cd799439013"
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message here"
 *
 *   parameters:
 *     QuestionId:
 *       name: questionId
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *       description: Question ID
 *
 *     CommentId:
 *       name: commentId
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *       description: Comment ID
 *
 *     AuthorId:
 *       name: authorId
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *       description: Author ID
 *
 *   responses:
 *     Unauthorized:
 *       description: Not authenticated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             success: false
 *             message: "Authentication required"
 *
 *     Forbidden:
 *       description: Not authorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             success: false
 *             message: "Not authorized to perform this action"
 *
 *     NotFound:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             success: false
 *             message: "Resource not found"
 *
 *     BadRequest:
 *       description: Bad request / Validation error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             success: false
 *             message: "Validation error"
 */
export const swaggerSchemas = {};
