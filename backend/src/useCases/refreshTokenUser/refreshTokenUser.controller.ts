import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./refreshTokenUser.useCase";
import validator from "../../helpers/validator";
import { body } from "express-validator";

export class RefreshTokenUserController {
  readonly validator = validator([
    body("refreshToken", "Refresh token is required").isUUID(),
  ]);

  async handler(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const refreshTokenUseCase = new RefreshTokenUserUseCase();

    const token = await refreshTokenUseCase.execute(refreshToken);

    if (!token) {
      res.status(401).json({ message: "Refresh token has expired" });
      return;
    }

    res.json(token);
  }
}
