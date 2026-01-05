import mongoose, { Schema } from "mongoose";
import { type QuestionDocument } from "./question.types.js";

const QuestionSchema = new Schema<QuestionDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 200,
    },

    body: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 5000,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
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

// Indexes
QuestionSchema.index({ author: 1 });
QuestionSchema.index({ createdAt: -1 });

export const QuestionModel = mongoose.model<QuestionDocument>(
  "Question",
  QuestionSchema
);
