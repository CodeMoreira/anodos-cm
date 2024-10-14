import dayjs from "dayjs";
import dbClient from "../prisma/client";
import splitExpiresInEnv from "../helpers/splitExpiresInEnv";

export class GenerateRefreshTokenProvider {
  async execute(user_id: string) {
    const { expire_time, expire_unit } = splitExpiresInEnv();

    const expire_in = dayjs().add(expire_time, expire_unit).unix();

    const generateRefreshToken = await dbClient.refreshToken.create({
      data: {
        user_id,
        expire_in,
      },
    });

    return generateRefreshToken;
  }
}
