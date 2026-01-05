import { LikeDAO } from "./like.dao.js";
import { ApiError } from "../../common/errors/ApiError.js";
import { QuestionModel } from "../questions/question.model.js";
import { CommentModel } from "../comments/comment.model.js";

export class LikeService {
  private likeDAO = new LikeDAO();

  async toggleLike(userId: string, itemId: string, itemType: string) {
    // Validate item exists
    if (itemType === "question") {
      const question = await QuestionModel.findById(itemId);
      if (!question) throw new ApiError(404, "Question not found");
    } else if (itemType === "comment") {
      const comment = await CommentModel.findById(itemId);
      if (!comment) throw new ApiError(404, "Comment not found");
    } else {
      throw new ApiError(400, "itemType must be 'question' or 'comment'");
    }

    // Check if already liked
    const existingLike = await this.likeDAO.findLike(userId, itemId, itemType);

    if (existingLike) {
      // Unlike
      await this.likeDAO.deleteLike(existingLike._id.toString());
      const totalLikes = await this.likeDAO.countLikes(itemId, itemType);
      return { liked: false, totalLikes };
    } else {
      // Like
      const newLike = await this.likeDAO.createLike({
        userId,
        itemId,
        itemType,
      });
      const totalLikes = await this.likeDAO.countLikes(itemId, itemType);
      return { liked: true, like: newLike, totalLikes };
    }
  }

  async checkIfLiked(userId: string, itemId: string, itemType: string) {
    const like = await this.likeDAO.findLike(userId, itemId, itemType);
    return !!like;
  }

  async getLikesForQuestion(questionId: string) {
    const question = await QuestionModel.findById(questionId);
    if (!question) throw new ApiError(404, "Question not found");

    const likes = await this.likeDAO.getLikes(questionId, "question");
    const totalLikes = await this.likeDAO.countLikes(questionId, "question");

    return {
      totalLikes,
      likes: likes.map((like) => ({
        id: like._id,
        user: like.userId,
        createdAt: like.createdAt,
      })),
    };
  }

  async getLikesForComment(commentId: string) {
    const comment = await CommentModel.findById(commentId);
    if (!comment) throw new ApiError(404, "Comment not found");

    const likes = await this.likeDAO.getLikes(commentId, "comment");
    const totalLikes = await this.likeDAO.countLikes(commentId, "comment");

    return {
      totalLikes,
      likes: likes.map((like) => ({
        id: like._id,
        user: like.userId,
        createdAt: like.createdAt,
      })),
    };
  }

  async getUserLikedQuestions(userId: string) {
    const likes = await this.likeDAO.getUserLikes(userId, "question");

    // Get question details for each like
    const questions = await Promise.all(
      likes.map(async (like) => {
        const question = await QuestionModel.findById(like.itemId).populate(
          "author",
          "username"
        );
        return {
          id: question?._id,
          title: question?.title,
          body: question?.body?.substring(0, 100), // Preview only
          author: question?.author,
          likedAt: like.createdAt,
        };
      })
    );

    return questions.filter((q) => q.id);
  }

  async getUserLikedComments(userId: string) {
    const likes = await this.likeDAO.getUserLikes(userId, "comment");

    // Get comment details for each like
    const comments = await Promise.all(
      likes.map(async (like) => {
        const comment = await CommentModel.findById(like.itemId)
          .populate("authorId", "username")
          .populate("questionId", "title");
        return {
          id: comment?._id,
          body: comment?.body?.substring(0, 100), // Preview only
          author: comment?.authorId,
          question: {
            id: comment?.questionId?._id,
            title: (comment?.questionId as any).title,
          },
          likedAt: like.createdAt,
        };
      })
    );

    return comments.filter((c) => c.id);
  }
}
