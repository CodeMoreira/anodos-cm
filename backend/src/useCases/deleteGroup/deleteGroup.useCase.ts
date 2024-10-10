import dbClient from "../../prisma/client";

export class DeleteGroupUseCase {
  async execute(id: string) {
    return await dbClient.contactGroup.delete({
      where: {
        id,
      },
    });
  }
}
