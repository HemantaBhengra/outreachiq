import { redis } from "../lib/redis";
import { NextFunction, Request, Response } from "express";

export const rateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const clientIp = req.ip;
  const key = `rate-limit:${clientIp}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 60);
  }

  if (count > 100) {
    return res
      .status(429)
      .json({ message: "Too many request. Try again later." });
  }

  next();
};
