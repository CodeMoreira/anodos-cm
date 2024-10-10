import dbClient from "../../prisma/client";

export interface IDeleteUserQuery {
  id: string;
}

export class DeleteUserUseCase {
  async execute({ id }: IDeleteUserQuery) {
    const user = await dbClient.users.delete({ where: { id } });
    return user;
  }
}
