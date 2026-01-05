import { QuestionModel } from "./question.model.ts";
import {
  type ICreateQuestionDTO,
  type IUpdateQuestionDTO,
  type QuestionDocument,
} from "./question.types.ts";

export class QuestionDAO {
  async create(
    questionData: ICreateQuestionDTO & { author: string }
  ): Promise<QuestionDocument> {
    return QuestionModel.create(questionData);
  }

  async findAll(): Promise<QuestionDocument[]> {
    return QuestionModel.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });
  }

  async findById(questionId: string): Promise<QuestionDocument | null> {
    return QuestionModel.findById(questionId).populate(
      "author",
      "username email"
    );
  }

  async findByAuthor(authorId: string): Promise<QuestionDocument[]> {
    return QuestionModel.find({ author: authorId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });
  }

  async update(
    questionId: string,
    updateData: IUpdateQuestionDTO
  ): Promise<QuestionDocument | null> {
    return QuestionModel.findByIdAndUpdate(
      questionId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("author", "username email");
  }

  async delete(questionId: string): Promise<QuestionDocument | null> {
    return QuestionModel.findByIdAndDelete(questionId);
  }
}
