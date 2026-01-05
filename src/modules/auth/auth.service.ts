import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { AuthDAO } from "./auth.dao.ts";
import { ApiError } from "../../common/errors/ApiError.ts";
import { type IRegisterDTO, type ILoginDTO } from "./auth.types.ts";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
  private authDAO = new AuthDAO();

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "30d",
    });
  }

  async register(userData: IRegisterDTO) {
    const existingEmail = await this.authDAO.findByEmail(userData.email);
    if (existingEmail) {
      throw new ApiError(400, "Email already exists");
    }

    const existingUsername = await this.authDAO.findByUsername(
      userData.username
    );
    if (existingUsername) {
      throw new ApiError(400, "Username already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };

    const createdUser = await this.authDAO.createUser(userWithHashedPassword);
    const token = this.generateToken(createdUser._id.toString());

    return {
      user: {
        id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      },
      token,
    };
  }

  async login(credentials: ILoginDTO) {
    let user;

    if (credentials.email) {
      user = await this.authDAO.findByEmail(credentials.email);
    }
    else if (credentials.username) {
      user = await this.authDAO.findByUsername(credentials.username);
    }

    if (!user) {
      throw new ApiError(400, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password!
    );

    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid credentials");
    }

    const token = this.generateToken(user._id.toString());

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  }
}
