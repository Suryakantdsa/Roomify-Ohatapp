import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "skjd";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1] ?? "";

  if (!token) {
    res.status(403).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, JWT_SECRET) as any;
  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
