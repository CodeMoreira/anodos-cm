import dayjs, { ManipulateType } from "dayjs";
import dbClient from "../prisma/client";

export class GenerateRefreshTokenProvider {
  async execute(user_id: string) {
    // regex to replace all characters that are not numbers in JWT_REFRESH_EXPIRES_IN
    const expire_time = Number(
      process.env.JWT_REFRESH_EXPIRES_IN!.replace(/\D/g, "")
    );
    // regex to replace all characters that are numbers in JWT_REFRESH_EXPIRES_IN
    const expire_unit = process.env.JWT_REFRESH_EXPIRES_IN!.replace(
      /\d/g,
      ""
    ) as ManipulateType;

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
