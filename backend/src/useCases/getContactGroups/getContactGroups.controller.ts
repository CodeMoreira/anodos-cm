import { Request, Response } from "express";
import validator from "../../helpers/validator";
import { param, query } from "express-validator";
import { GetContactGroupsUseCase } from "./getContactGroups.useCase";

export class GetContactGroupsController {
  readonly validator = validator([
    query("page", "Page must be greater than or equal to 1").isInt({
      min: 1,
    }),
    query("limit", "Limit must be greater than or equal to 1").isInt({
      min: 1,
    }),
    query("name", "Name must be a string").optional().isString(),
  ]);

  async handler(req: Request, res: Response) {
    const { page, limit, name } = req.query;

    // @ts-ignore
    const { id } = req.user;

    const getContactGroupsUseCase = new GetContactGroupsUseCase();

    const contactGroups = await getContactGroupsUseCase.execute(
      { user_id: id },
      {
        page: Number(page),
        limit: Number(limit),
        name: name as string,
      }
    );

    res.status(200).json(contactGroups);
  }
}
