import { UserModel } from "../users/user.model.js";
import { type UserDocument } from "../users/user.types.js";
import { type ILoginDTO } from "./auth.types.js";

export class AuthDAO {
  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email }).select("+password");
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return UserModel.findOne({ username }).select("+password");
  }

  async createUser(userData: ILoginDTO): Promise<UserDocument> {
    return UserModel.create(userData);
  }
}
