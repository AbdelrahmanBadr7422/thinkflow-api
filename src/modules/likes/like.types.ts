import { Document, Types } from "mongoose";

export interface ILike {
  userId: Types.ObjectId;
  itemId: Types.ObjectId;
  itemType: "question" | "comment";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LikeDocument extends ILike, Document {}
