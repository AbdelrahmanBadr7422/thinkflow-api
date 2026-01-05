import { QuestionDAO } from "./question.dao.js";
import { ApiError } from "../../common/errors/ApiError.js";
import {
  type ICreateQuestionDTO,
  type IUpdateQuestionDTO,
  type QuestionDocument,
} from "./question.types.js";

export class QuestionService {
  private questionDAO = new QuestionDAO();

  async createQuestion(
    userId: string,
    questionData: ICreateQuestionDTO
  ): Promise<QuestionDocument> {
    const question = await this.questionDAO.create({
      ...questionData,
      author: userId,
    });

    if (!question) {
      throw new ApiError(500, "Failed to create question");
    }

    return question;
  }

  async getAllQuestions(): Promise<QuestionDocument[]> {
    const questions = await this.questionDAO.findAll();

    if (!questions) {
      throw new ApiError(500, "Failed to fetch questions");
    }

    return questions;
  }

  async getQuestionById(questionId: string): Promise<QuestionDocument> {
    const question = await this.questionDAO.findById(questionId);

    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    return question;
  }

  async getQuestionsByAuthor(authorId: string): Promise<QuestionDocument[]> {
    const questions = await this.questionDAO.findByAuthor(authorId);

    if (!questions) {
      throw new ApiError(500, "Failed to fetch questions");
    }

    return questions;
  }

  async updateQuestion(
    userId: string,
    questionId: string,
    updateData: IUpdateQuestionDTO
  ): Promise<QuestionDocument> {
    const question = await this.questionDAO.findById(questionId);

    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    // Check ownership
    if (question.author._id.toString() !== userId) {
      throw new ApiError(403, "Not authorized to update this question");
    }

    const updatedQuestion = await this.questionDAO.update(
      questionId,
      updateData
    );

    if (!updatedQuestion) {
      throw new ApiError(500, "Failed to update question");
    }

    return updatedQuestion;
  }

  async deleteQuestion(
    userId: string,
    questionId: string
  ): Promise<QuestionDocument> {
    const question = await this.questionDAO.findById(questionId);

    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    // Check ownership
    if (question.author._id.toString() !== userId) {
      throw new ApiError(403, "Not authorized to delete this question");
    }

    const deletedQuestion = await this.questionDAO.delete(questionId);

    if (!deletedQuestion) {
      throw new ApiError(500, "Failed to delete question");
    }

    return deletedQuestion;
  }
}
