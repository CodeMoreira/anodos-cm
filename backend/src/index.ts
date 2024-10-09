import express from "express";
import { config } from "dotenv";
import user from "./routes/user";
import bodyParser from "body-parser";
import auth from "./routes/auth";

config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", auth);
app.use("/user", user);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
