import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export class IsAuthenticatedMiddleware {
  handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "Token is missing" });
      return;
    }

    const [_, tokenValue] = token.split(" ");

    try {
      const payload = verify(tokenValue, process.env.JWT_SECRET as string);
      // @ts-ignore
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
