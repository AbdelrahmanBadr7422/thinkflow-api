import { Types, Document } from "mongoose";

export interface IQuestion {
  title: string;
  body: string;
  author: Types.ObjectId;
  comments?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionDocument extends IQuestion, Document {}

export interface ICreateQuestionDTO {
  title: string;
  body: string;
}

export interface IUpdateQuestionDTO {
  title?: string;
  body?: string;
}