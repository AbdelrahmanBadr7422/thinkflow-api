import { CommentDAO } from "./comment.dao.ts";
import { ApiError } from "../../common/errors/ApiError.ts";
import {
  type ICreateCommentDTO,
  type IUpdateCommentDTO,
  type CommentDocument,
} from "./comment.types.ts";
import { QuestionModel } from "../questions/question.model.ts";

export class CommentService {
  private commentDAO = new CommentDAO();

  async createComment(
    userId: string,
    commentData: ICreateCommentDTO
  ): Promise<CommentDocument> {
    const question = await QuestionModel.findById(commentData.questionId);
    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    const comment = await this.commentDAO.create({
      ...commentData,
      authorId: userId,
    });

    if (!comment) {
      throw new ApiError(500, "Failed to create comment");
    }

    await QuestionModel.findByIdAndUpdate(commentData.questionId, {
      $push: { comments: comment._id },
    });

    return comment;
  }

  async getCommentById(commentId: string): Promise<CommentDocument> {
    const comment = await this.commentDAO.findById(commentId);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    return comment;
  }

  async getCommentsByAuthor(authorId: string): Promise<CommentDocument[]> {
    const comments = await this.commentDAO.findByAuthor(authorId);

    if (!comments) {
      throw new ApiError(500, "Failed to fetch comments");
    }

    return comments;
  }

  async getCommentsByQuestion(questionId: string): Promise<CommentDocument[]> {
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    const comments = await this.commentDAO.findByQuestion(questionId);

    if (!comments) {
      throw new ApiError(500, "Failed to fetch comments");
    }

    return comments;
  }

  async updateComment(
    userId: string,
    commentId: string,
    updateData: IUpdateCommentDTO
  ): Promise<CommentDocument> {
    const comment = await this.commentDAO.findById(commentId);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (comment.authorId._id.toString() !== userId) {
      throw new ApiError(403, "Not authorized to update this comment");
    }

    const updatedComment = await this.commentDAO.update(commentId, updateData);

    if (!updatedComment) {
      throw new ApiError(500, "Failed to update comment");
    }

    return updatedComment;
  }

  async deleteComment(
    userId: string,
    commentId: string
  ): Promise<CommentDocument> {
    const comment = await this.commentDAO.findById(commentId);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (comment.authorId._id.toString() !== userId) {
      throw new ApiError(403, "Not authorized to delete this comment");
    }

    const deletedComment = await this.commentDAO.delete(commentId);

    if (!deletedComment) {
      throw new ApiError(500, "Failed to delete comment");
    }

    await QuestionModel.findByIdAndUpdate(comment.questionId, {
      $pull: { comments: commentId },
    });

    return deletedComment;
  }

  async countCommentsByAuthor(authorId: string): Promise<number> {
    return await this.commentDAO.countByAuthor(authorId);
  }

  async countCommentsByQuestion(questionId: string): Promise<number> {
    return await this.commentDAO.countByQuestion(questionId);
  }
}
