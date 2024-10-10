import dbClient from "../../prisma/client";
import bcrypt from "bcrypt";
import { GenerateRefreshTokenProvider } from "../../provider/genereteRefreshToken.provider";
import { GenerateTokenProvider } from "../../provider/generateToken.provider";

export class LoginUseCase {
  async execute(email: string, password: string) {
    const user = await dbClient.users.findUnique({
      select: { id: true, email: true, password: true, role: true },
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT
    const generateToken = new GenerateTokenProvider();
    const token = await generateToken.execute({ id: user.id });

    await dbClient.refreshToken.deleteMany({
      where: {
        user_id: user.id,
      },
    });

    // Generate Refresh Token
    const generateRefreshToken = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshToken.execute(user.id);

    return { token, refreshToken };
  }
}
