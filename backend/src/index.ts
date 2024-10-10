import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import user from "./routes/user";
import bodyParser from "body-parser";
import cors from "cors";
import auth from "./routes/auth";
import { IsAuthenticatedMiddleware } from "./middlewares/isAuthenticated";

const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware();

config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

// Routes
app.use("/auth", auth);
app.use("/user", isAuthenticatedMiddleware.handle, user);

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
