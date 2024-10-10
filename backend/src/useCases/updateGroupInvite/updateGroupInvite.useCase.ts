import { Role, Status } from "@prisma/client";
import dbClient from "../../prisma/client";

export interface IUpdateGroupInviteParams {
  id: string;
}

export interface IUpdateGroupInviteBody {
  role?: Role;
  status?: Status;
}

export class UpdateGroupInviteUseCase {
  async execute(
    { id }: IUpdateGroupInviteParams,
    { status, role }: IUpdateGroupInviteBody
  ) {
    const group = await dbClient.invitation.update({
      where: { id },
      data: { status, role },
    });
    return group;
  }
}
