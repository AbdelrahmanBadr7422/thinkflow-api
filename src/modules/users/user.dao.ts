import { UserModel } from "./user.model.js";
import { type IUpdateProfileDTO, type UserDocument } from "./user.types.js";

export class UserDAO {
  async findById(userId: string): Promise<UserDocument | null> {
    return UserModel.findById(userId);
  }

  async findByIdWithPassword(userId: string): Promise<UserDocument | null> {
    return UserModel.findById(userId).select("+password");
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email });
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return UserModel.findOne({ username });
  }

  async updateProfile(
    userId: string,
    updateData: IUpdateProfileDTO
  ): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async updatePassword(
    userId: string,
    newPassword: string
  ): Promise<UserDocument | null> {
    const user = await UserModel.findById(userId);

    if (!user) {
      return null;
    }

    user.password = newPassword;
    await user.save();

    return UserModel.findById(userId);
  }
}
