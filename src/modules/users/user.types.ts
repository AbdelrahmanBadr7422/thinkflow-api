import { Document } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUpdateProfileDTO {
  username?: string;
  email?: string;
}

export interface IChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}
