import express from "express";
import { FindUsersController } from "../useCases/findUsers/findUsers.controller";
import { UpdateUserController } from "../useCases/updateUser/updateUser.controller";
import { DeleteUserController } from "../useCases/deleteUser/deleteUser.controller";

const findUsersController = new FindUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const user = express();

user.get("/all", ...findUsersController.validator, findUsersController.handler);
user.put(
  "/update/:id",
  ...updateUserController.validator,
  updateUserController.handler
);
user.delete(
  "/:id",
  ...deleteUserController.validator,
  deleteUserController.handler
);

export default user;
