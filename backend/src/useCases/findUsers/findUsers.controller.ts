import { Request, Response } from "express";
import { FindUsersUseCase } from "./findUsers.useCase";
import { query } from "express-validator";
import validator from "../../helpers/validator";
import { Role } from "@prisma/client";

export class FindUsersController {
  readonly validator = validator([
    query("email", "Email must be a valid email").optional(),
    query("role", "Role must be ADMIN or USER").optional(),
    query("page", "Page must be greater than or equal to 1").isInt({ min: 1 }),
    query("limit", "Limit must be greater than or equal to 1").isInt({
      min: 1,
    }),
  ]);

  async handler(req: Request, res: Response) {
    const { email, role, page, limit } = req.query;

    const findUsersUseCase = new FindUsersUseCase();

    const users = await findUsersUseCase.execute({
      email: email as string,
      role: role as Role,
      page: Number(page),
      limit: Number(limit),
    });

    res.json(users);
  }
}
