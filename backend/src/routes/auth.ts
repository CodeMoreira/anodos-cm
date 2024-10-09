import express from "express";
import { login, register } from "../controllers/auth.controller";
const auth = express();

auth.post("/register", ...register.validator, register.handler);
auth.post("/login", ...login.validator, login.handler);

export default auth;
