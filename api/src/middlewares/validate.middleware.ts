import { Response, Request, NextFunction } from "express";
import { ZodType } from "zod";

export const validate = (schema: ZodType ) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "Validation failed",errors: result.error?.issues});
    }
  };
};
