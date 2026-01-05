import { LikeModel } from "./like.model.js";

export class LikeDAO {
  async createLike(data: { userId: string; itemId: string; itemType: string }) {
    return LikeModel.create(data);
  }

  async findLike(userId: string, itemId: string, itemType: string) {
    return LikeModel.findOne({ userId, itemId, itemType });
  }

  async deleteLike(likeId: string) {
    return LikeModel.findByIdAndDelete(likeId);
  }

  async getLikes(itemId: string, itemType: string) {
    return LikeModel.find({ itemId, itemType })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
  }

  async countLikes(itemId: string, itemType: string) {
    return LikeModel.countDocuments({ itemId, itemType });
  }

  async getUserLikes(userId: string, itemType: string) {
    return LikeModel.find({ userId, itemType }).sort({ createdAt: -1 });
  }
}
