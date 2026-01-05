import mongoose, { Schema } from "mongoose";
import { type CommentDocument } from "./comment.types.js";

const commentSchema = new Schema<CommentDocument>(
  {
    body: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 5000,
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        const transformed = { ...ret } as any;
        transformed.id = transformed._id?.toString();
        delete transformed._id;
        delete transformed.__v;
        return transformed;
      },
    },
  }
);

commentSchema.index({ authorId: 1 });
commentSchema.index({ questionId: 1 });
commentSchema.index({ createdAt: -1 });

export const CommentModel = mongoose.model<CommentDocument>(
  "Comment",
  commentSchema
);
