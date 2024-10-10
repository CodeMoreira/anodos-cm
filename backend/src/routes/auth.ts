import express from "express";
import { AuthController } from "../useCases/auth/auth.controller";
import { CreateUserController } from "../useCases/createUser/createUser.controller";
import { RefreshTokenUserController } from "../useCases/refreshTokenUser/refreshTokenUser.controller";
const auth = express();

const createUserController = new CreateUserController();
const authController = new AuthController();
const refreshTokenUserController = new RefreshTokenUserController();

auth.post(
  "/register",
  ...createUserController.validator,
  createUserController.handler
);
auth.post("/login", ...authController.validator, authController.handler);
auth.post(
  "/refresh-token",
  ...refreshTokenUserController.validator,
  refreshTokenUserController.handler
);

export default auth;
