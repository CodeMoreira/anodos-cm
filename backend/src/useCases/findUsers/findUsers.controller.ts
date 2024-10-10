import { Request, Response } from "express";
import { FindUsersUseCase } from "./findUsers.useCase";
import { query } from "express-validator";
import validator from "../../helpers/validator";

export class FindUsersController {
  readonly validator = validator([
    query("email", "Email must be a valid email").optional(),
    query("page", "Page must be greater than or equal to 1").isInt({ min: 1 }),
    query("limit", "Limit must be greater than or equal to 1").isInt({
      min: 1,
    }),
  ]);

  async handler(req: Request, res: Response) {
    const { email, page, limit } = req.query;

    const findUsersUseCase = new FindUsersUseCase();

    const users = await findUsersUseCase.execute({
      email: email as string,
      page: Number(page),
      limit: Number(limit),
    });

    res.status(200).json(users);
  }
}
