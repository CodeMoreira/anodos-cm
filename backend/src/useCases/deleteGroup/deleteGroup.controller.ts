import { Request, Response } from "express";
import { DeleteGroupUseCase } from "./deleteGroup.useCase";
import validator from "../../helpers/validator";
import { param } from "express-validator";

export class DeleteGroupController {
  validator = validator([param("id", "Id must be a valid UUID").isUUID()]);

  async handler(req: Request, res: Response) {
    const { id } = req.params;
    const deleteGroupUseCase = new DeleteGroupUseCase();

    await deleteGroupUseCase.execute(id);

    res.sendStatus(204);
  }
}
