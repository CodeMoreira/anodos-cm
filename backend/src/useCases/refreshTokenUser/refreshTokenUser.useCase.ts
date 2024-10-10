import dayjs from "dayjs";
import dbClient from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/generateToken.provider";

export class RefreshTokenUserUseCase {
  async execute(refreshToken: string) {
    const refreshTokenExists = await dbClient.refreshToken.findUnique({
      where: {
        id: refreshToken,
      },
    });

    if (!refreshTokenExists) {
      throw new Error("Refresh token does not exists");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshTokenExists.expire_in)
    );

    if (refreshTokenExpired) {
      return { token: null };
    }

    // Generate JWT
    const generateToken = new GenerateTokenProvider();
    const token = await generateToken.execute({
      id: refreshTokenExists.user_id,
    });

    return { token };
  }
}
