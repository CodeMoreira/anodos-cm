import dbClient from "../../prisma/client";
import bcrypt from "bcrypt";

export class CreateUserUseCase {
  async execute(email: string, password: string) {
    const userExists = await dbClient.users.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await dbClient.users.create({
      data: { email, password: passwordHash },
    });

    return user;
  }
}
