import { Role } from "@prisma/client";
import dbClient from "../../prisma/client";

export interface IFindUsersQuery {
  page: number;
  limit: number;
  email?: string;
  role?: Role;
}

export class FindUsersUseCase {
  async execute({ page, limit, email, role }: IFindUsersQuery) {
    const users = await dbClient.users.findMany({
      where: {
        email: email ? { contains: email } : undefined,
        role: role ? { equals: role } : undefined,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return users;
  }
}
