import jwt from "jsonwebtoken";

export interface IGenerateTokenProps {
  id: string;
}

export class GenerateTokenProvider {
  async execute(user: IGenerateTokenProps) {
    return jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN!,
    });
  }
}
