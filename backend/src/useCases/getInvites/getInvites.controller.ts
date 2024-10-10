import { Request, Response } from "express";
import { GetInvitesUseCase } from "./getInvites.useCase";

export class GetInvitesController {
  validator = [];
  async handler(req: Request, res: Response) {
    const getInvitesUseCase = new GetInvitesUseCase();
    // @ts-ignore
    const invites = await getInvitesUseCase.execute({ user_id: req.user.id });

    res.status(200).json(invites);
  }
}
