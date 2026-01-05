import mongoose, { Schema } from "mongoose";
import { type CommentDocument } from "./comment.types.ts";

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
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
commentSchema.index({ authorId: 1 });
commentSchema.index({ questionId: 1 });
commentSchema.index({ createdAt: -1 });

export const CommentModel = mongoose.model<CommentDocument>(
  "Comment",
  commentSchema
);
