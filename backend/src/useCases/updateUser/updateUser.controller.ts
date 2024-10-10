import { Request, Response } from "express";
import { UpdateUserUseCase } from "./updateUser.useCase";
import { body, param } from "express-validator";
import validator from "../../helpers/validator";

export class UpdateUserController {
  readonly validator = validator([
    param("id", "Id must be a valid UUID").isUUID(),
    body("email", "Email must be a valid email").optional().isEmail(),
    body("password", "Password must be at least 8 characters long")
      .optional()
      .isLength({ min: 8 }),
    body("role", "Role must be ADMIN or USER")
      .optional()
      .isIn(["ADMIN", "USER"]),
  ]);
  async handler(req: Request, res: Response) {
    const { id } = req.params;
    const { email, password, role } = req.body;

    const updateUserUseCase = new UpdateUserUseCase();

    const user = await updateUserUseCase.execute(
      { id },
      { email, password, role }
    );

    res.json(user);
  }
}
