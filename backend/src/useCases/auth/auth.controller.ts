import { body } from "express-validator";
import validator from "../../helpers/validator";
import { LoginUseCase } from "./auth.useCase";
import { Request, Response } from "express";

export class AuthController {
  readonly validator = validator([
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ]);

  async handler(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginUseCase = new LoginUseCase();

    const user = await loginUseCase.execute(email, password);

    res.status(200).json(user);
  }
}
