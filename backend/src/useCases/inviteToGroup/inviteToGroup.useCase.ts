import { Role } from "@prisma/client";
import dbClient from "../../prisma/client";

export interface IInviteToGroupParams {
  groupId: string;
}

export interface IInviteToGroupBody {
  role: Role;
  email: string;
  user_id: string;
}

export class InviteToGroupUseCase {
  async execute(
    { groupId }: IInviteToGroupParams,
    { role, email, user_id }: IInviteToGroupBody
  ) {
    const userExists = await dbClient.users.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error("User with this email does not exist");
    }

    if (userExists.id === user_id) {
      throw new Error("You cannot invite yourself");
    }

    const inviteExists = await dbClient.invitation.findFirst({
      where: {
        contact_group_id: groupId,
        email,
      },
    });

    if (["ACCEPTED", "PENDING"].includes(inviteExists?.status ?? "")) {
      throw new Error("You have already invited this user");
    }

    if (inviteExists && ["REJECTED"].includes(inviteExists.status ?? "")) {
      const invite = await dbClient.invitation.update({
        where: {
          id: inviteExists.id,
        },
        data: {
          status: "PENDING",
        },
      });

      return invite;
    }

    const invite = await dbClient.invitation.create({
      data: {
        role,
        email,
        contact_group_id: groupId,
        status: "PENDING",
      },
    });

    return invite;
  }
}
