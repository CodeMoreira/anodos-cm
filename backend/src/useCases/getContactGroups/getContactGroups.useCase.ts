import dbClient from "../../prisma/client";

export interface IGetContactGroupsParams {
  user_id: string;
}

export interface IGetContactGroupsQuery {
  page: number;
  limit: number;
  name: string;
}

export class GetContactGroupsUseCase {
  async execute(
    { user_id }: IGetContactGroupsParams,
    { page, limit, name }: IGetContactGroupsQuery
  ) {
    // get user
    const user = await dbClient.users.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const contactGroups = await dbClient.contactGroup.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        OR: [
          {
            user_id,
          },
          {
            Invitation: {
              some: {
                email: user.email,
                status: "ACCEPTED",
              },
            },
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return contactGroups;
  }
}
