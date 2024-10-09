// Generate a class for users controller that have the following methods:
// getAllUsers, getUserById, createUser, updateUser, deleteUser

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import validator from "../middlewares/validator";

const prisma = new PrismaClient();

export const register = {
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

export const login = {
  validator: validator([
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ]),
  async handler(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    res.json(user);
  },
};
