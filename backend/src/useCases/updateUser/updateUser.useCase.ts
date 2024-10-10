import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import dbClient from "../../prisma/client";

export interface UpdateUserQuery {
  id: string;
}

export interface UpdateUserBody {
  email?: string;
  password?: string;
  role?: Role;
}

export class UpdateUserUseCase {
  async execute(
    { id }: UpdateUserQuery,
    { email, password, role }: UpdateUserBody
  ) {
    const userExists = await dbClient.users.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("User with this email already exists");
    }

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const user = await dbClient.users.update({
      where: { id },
      data: { email, password, role },
    });

    return user;
  }
}
