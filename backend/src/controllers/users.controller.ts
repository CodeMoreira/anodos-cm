// Generate a class for users controller that have the following methods:
// getAllUsers, getUserById, createUser, updateUser, deleteUser

import { Request, Response } from "express";
import { PrismaClient, Users } from "@prisma/client";
import bcrypt from "bcrypt";
import { body, param, query } from "express-validator";
import validator from "../middlewares/validator";

const prisma = new PrismaClient();

export const getAllUsers = {
  validator: validator([
    query("email").optional().isEmail(),
    query("role").optional().isIn(["USER", "ADMIN"]),
  ]),
  async handler(req: Request, res: Response) {
    // filter users by name, email and role
    const { email, role } = req.query as Pick<Users, "email" | "role">;
    const users = await prisma.users.findMany({
      where: {
        email: email ? { contains: email } : undefined,
        role: role ? { equals: role } : undefined,
      },
    });
    res.json(users);
  },
};

export const getUserById = {
  validator: validator([param("id").isUUID()]),
  async handler(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: { id },
    });
    res.json(user);
  },
};

export const registerUser = {
  validator: validator([
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ]),
  async handler(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log("entrou no controller");
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: { email, password: passwordHash, role: "USER" },
    });
    res.json(user);
  },
};

export const updateUser = {
  validator: validator([
    body("id").isUUID(),
    body("email").optional().isEmail(),
    body("password").optional().isLength({ min: 8 }),
    body("role").optional().isIn(["USER", "ADMIN"]),
  ]),
  async handler(req: Request, res: Response) {
    const { id, ...data } = req.body;
    const user = await prisma.users.update({
      where: { id },
      data,
    });
    res.json(user);
  },
};

export const deleteUser = {
  validator: validator([param("id").isUUID()]),
  async handler(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prisma.users.delete({
      where: { id },
    });
    res.json(user);
  },
};
