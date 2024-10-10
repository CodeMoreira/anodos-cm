import { body, param } from "express-validator";
import validator from "../../helpers/validator";
import { Request, Response } from "express";
import { InviteToGroupUseCase } from "./inviteToGroup.useCase";

export class InviteToGroupController {
  readonly validator = validator([
    param("groupId", "groupId must be a valid UUID").isUUID(),
    body("email", "Email must be a valid email").isEmail(),
    body("role", "Role must be one of READ_ONLY, READ_WRITE, ADMIN").isIn([
      "READ_ONLY",
      "READ_WRITE",
      "ADMIN",
    ]),
  ]);

  async handler(req: Request, res: Response) {
    const { groupId } = req.params;
    const { email, role } = req.body;

    const inviteToGroupUseCase = new InviteToGroupUseCase();
    const invite = await inviteToGroupUseCase.execute(
      { groupId },
      // @ts-ignore
      { email, role, user_id: req.user.id }
    );

    res.status(201).json(invite);
  }
}
