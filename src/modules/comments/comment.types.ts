import { Types, Document } from "mongoose";

export interface IComment {
  body: string;
  authorId: Types.ObjectId;
  questionId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentDocument extends IComment, Document {}

export interface ICreateCommentDTO {
  body: string;
  questionId: string;
}

export interface IUpdateCommentDTO {
  body: string;
}
