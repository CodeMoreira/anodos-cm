import { Request, Response } from "express";
import { DeleteUserUseCase, IDeleteUserQuery } from "./deleteUser.useCase";
import { param } from "express-validator";
import validator from "../../helpers/validator";

export class DeleteUserController {
  readonly validator = validator([
    param("id", "Id must be a valid UUID").isUUID(),
  ]);
  async handler(req: Request, res: Response) {
    const { id } = req.params as unknown as IDeleteUserQuery;

    const deleteUserUseCase = new DeleteUserUseCase();

    await deleteUserUseCase.execute({ id });

    res.sendStatus(204);
  }
}
