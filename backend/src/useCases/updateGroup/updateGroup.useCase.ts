import dbClient from "../../prisma/client";

export interface IUpdateGroupParams {
  id: string;
}

export interface IUpdateGroupBody {
  name: string;
  description: string;
}

export class UpdateGroupUseCase {
  async execute(
    { id }: IUpdateGroupParams,
    { name, description }: IUpdateGroupBody
  ) {
    return await dbClient.contactGroup.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
  }
}
