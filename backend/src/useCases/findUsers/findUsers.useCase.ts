import dbClient from "../../prisma/client";

export interface IFindUsersQuery {
  page: number;
  limit: number;
  email?: string;
}

export class FindUsersUseCase {
  async execute({ page, limit, email }: IFindUsersQuery) {
    const users = await dbClient.users.findMany({
      where: {
        email: email ? { contains: email } : undefined,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return users;
  }
}
