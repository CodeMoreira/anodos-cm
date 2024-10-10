import dbClient from "../../prisma/client";

export class GetInvitesUseCase {
  async execute({ user_id }: { user_id: string }) {
    const user = await dbClient.users.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new Error("User not exists");
    }

    const invites = await dbClient.invitation.findMany({
      where: {
        email: user.email,
      },
    });

    return invites;
  }
}
