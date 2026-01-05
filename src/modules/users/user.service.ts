import bcrypt from "bcrypt";
import { UserDAO } from "./user.dao.ts";
import { ApiError } from "../../common/errors/ApiError.ts";
import {
  type IUpdateProfileDTO,
  type IChangePasswordDTO,
} from "./user.types.ts";

export class UserService {
  private userDAO = new UserDAO();

  async getProfile(userId: string) {
    const user = await this.userDAO.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateProfile(userId: string, updateData: IUpdateProfileDTO) {
    // Check if trying to update anything
    if (!updateData.username && !updateData.email) {
      throw new ApiError(
        400,
        "At least one field (username or email) is required"
      );
    }

    // Check if username already exists (if updating username)
    if (updateData.username) {
      const existingUser = await this.userDAO.findByUsername(
        updateData.username
      );
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new ApiError(400, "Username already exists");
      }
    }

    // Check if email already exists (if updating email)
    if (updateData.email) {
      const existingUser = await this.userDAO.findByEmail(updateData.email);
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new ApiError(400, "Email already exists");
      }
    }

    const updatedUser = await this.userDAO.updateProfile(userId, updateData);

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    return {
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      updatedAt: updatedUser.updatedAt,
    };
  }

  async changePassword(userId: string, passwordData: IChangePasswordDTO) {
    // Get user with password
    const user = await this.userDAO.findByIdWithPassword(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if old password is correct
    const isOldPasswordValid = await bcrypt.compare(
      passwordData.oldPassword,
      user.password
    );

    if (!isOldPasswordValid) {
      throw new ApiError(400, "Incorrect old password");
    }

    // Check if new password is different from old
    if (passwordData.oldPassword === passwordData.newPassword) {
      throw new ApiError(
        400,
        "New password must be different from old password"
      );
    }

    // Update password
    const updatedUser = await this.userDAO.updatePassword(
      userId,
      passwordData.newPassword
    );

    if (!updatedUser) {
      throw new ApiError(500, "Failed to update password");
    }

    return {
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    };
  }
}
