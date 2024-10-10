import { body } from "express-validator";
import validator from "../../helpers/validator";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./createUser.useCase";

export class CreateUserController {
  readonly validator = validator([
    body("email", "Email must be a valid email").isEmail(),
    body("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ]);

  async handler(req: Request, res: Response) {
    const { email, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute(email, password);

    res.json(user);
  }
}
