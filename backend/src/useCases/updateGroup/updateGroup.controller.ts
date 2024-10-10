import { Request, Response } from "express";
import { UpdateGroupUseCase } from "./updateGroup.useCase";
import validator from "../../helpers/validator";
import { body, param } from "express-validator";

export class UpdateGroupController {
  validator = validator([
    param("id", "Id must be a valid UUID").isUUID(),
    body("name", "Name must be a string").optional().isString(),
    body("description", "Description must be a string").optional().isString(),
  ]);

  async handler(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateGroupUseCase = new UpdateGroupUseCase();

    await updateGroupUseCase.execute({ id }, { name, description });

    res.sendStatus(204);
  }
}
