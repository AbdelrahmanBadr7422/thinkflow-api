import { CommentModel } from "./comment.model.js";
import {
  type ICreateCommentDTO,
  type IUpdateCommentDTO,
  type CommentDocument,
} from "./comment.types.js";

export class CommentDAO {
  async create(
    commentData: ICreateCommentDTO & { authorId: string }
  ): Promise<CommentDocument> {
    return CommentModel.create(commentData);
  }

  async findById(commentId: string): Promise<CommentDocument | null> {
    return CommentModel.findById(commentId)
      .populate("authorId", "username email")
      .populate("questionId", "title");
  }

  async findByAuthor(authorId: string): Promise<CommentDocument[]> {
    return CommentModel.find({ authorId })
      .populate("authorId", "username email")
      .populate("questionId", "title")
      .sort({ createdAt: -1 });
  }

  async findByQuestion(questionId: string): Promise<CommentDocument[]> {
    return CommentModel.find({ questionId })
      .populate("authorId", "username email")
      .sort({ createdAt: -1 });
  }

  async update(
    commentId: string,
    updateData: IUpdateCommentDTO
  ): Promise<CommentDocument | null> {
    return CommentModel.findByIdAndUpdate(
      commentId,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("authorId", "username email")
      .populate("questionId", "title");
  }

  async delete(commentId: string): Promise<CommentDocument | null> {
    return CommentModel.findByIdAndDelete(commentId);
  }

  async countByAuthor(authorId: string): Promise<number> {
    return CommentModel.countDocuments({ authorId });
  }

  async countByQuestion(questionId: string): Promise<number> {
    return CommentModel.countDocuments({ questionId });
  }
}
