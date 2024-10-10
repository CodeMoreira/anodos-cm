import dbClient from "../../prisma/client";

export interface ICreateContactGroupBody {
  user_id: string;
  name: string;
  description: string;
}

export class CreateContactGroupUseCase {
  async execute({ user_id, name, description }: ICreateContactGroupBody) {
    const contactGroup = await dbClient.contactGroup.create({
      data: {
        user_id,
        name,
        description,
      },
    });

    return contactGroup;
  }
}
