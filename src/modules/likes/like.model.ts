import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    itemType: {
      type: String,
      enum: ["question", "comment"],
      required: true,
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

LikeSchema.index({ userId: 1, itemId: 1, itemType: 1 }, { unique: true });

LikeSchema.index({ itemId: 1, itemType: 1 });
LikeSchema.index({ userId: 1 });

export const LikeModel = mongoose.model("Like", LikeSchema);
