import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const decoder = verifyToken(token);

  if (!decoder) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.userId = decoder.userId;
  next();
};
