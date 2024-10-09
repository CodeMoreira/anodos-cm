import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from "../controllers/users.controller";

const user = express();

user.get("/all", ...getAllUsers.validator, getAllUsers.handler);
user.get("/unique/:id", ...getUserById.validator, getUserById.handler);
user.post("/register", ...registerUser.validator, registerUser.handler);
user.put("/update", ...updateUser.validator, updateUser.handler);
user.delete("/:id", ...deleteUser.validator, deleteUser.handler);

export default user;
