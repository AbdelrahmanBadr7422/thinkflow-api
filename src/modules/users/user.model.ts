import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { type UserDocument } from "./user.types.js";

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't include password by default in queries
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
        delete transformed.password;
        return transformed;
      },
    },
  }
);

// Hash password before saving (NO NEXT PARAMETER)
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error: any) {
      throw new Error(`Password hashing failed: ${error.message}`);
    }
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Indexes for faster queries
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
