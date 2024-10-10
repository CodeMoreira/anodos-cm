import { body } from "express-validator";
import validator from "../../helpers/validator";
import { Request, Response } from "express";
import { CreateContactGroupUseCase } from "./createContactGroup.useCase";

export class CreateContactGroupController {
  validator = validator([
    body("name").isString(),
    body("description").isString(),
  ]);

  async handler(req: Request, res: Response) {
    const { name, description } = req.body;

    // @ts-ignore
    const userId = req.user.id;

    const contactGroupUseCase = new CreateContactGroupUseCase();

    const contactGroup = await contactGroupUseCase.execute({
      name,
      description,
      user_id: userId,
    });

    res.status(201).json(contactGroup);
  }
}
