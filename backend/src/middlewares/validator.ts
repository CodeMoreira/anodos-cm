import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function validator(validators: any[]) {
  return [
    ...validators,
    (req: Request, res: Response, next: NextFunction) => {
      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      res.status(400).json({ errors: result.array() });
    },
  ];
}
