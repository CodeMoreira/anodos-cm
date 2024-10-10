import { Request, Response } from "express";
import { UpdateGroupInviteUseCase } from "./updateGroupInvite.useCase";
import { body, param } from "express-validator";
import validator from "../../helpers/validator";

export class UpdateGroupInviteController {
  validator = validator([
    param("id", "Id must be a valid UUID").isUUID(),
    body("status", "Status must be one of PENDING, ACCEPTED, DECLINED")
      .optional()
      .isIn(["PENDING", "ACCEPTED", "DECLINED"]),
    body("role", "Role must be one of READ_ONLY, READ_WRITE, ADMIN")
      .optional()
      .isIn(["READ_ONLY", "READ_WRITE", "ADMIN"]),
  ]);

  async handler(req: Request, res: Response) {
    const { id } = req.params;
    const { status, role } = req.body;

    const updateGroupInviteUseCase = new UpdateGroupInviteUseCase();
    await updateGroupInviteUseCase.execute({ id }, { status, role });

    res.sendStatus(204);
  }
}
