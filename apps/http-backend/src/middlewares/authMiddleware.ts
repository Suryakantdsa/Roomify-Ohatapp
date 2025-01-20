import e, { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./errorMiddleware";
import { prismaClient } from "@repo/db/client";

const AuthenticateJWT: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        throw new AuthenticationError("token not found");
      }
      const jwtSecret = process.env.JWT_SECRET || "surya@1qee";
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      if (!decoded || !decoded.userId) {
        throw new AuthenticationError("userId not found");
      }
      const user = await prismaClient.user.findFirst({
        where: {
          id: decoded.userId,
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
        },
      });
      if (!user) {
        throw new AuthenticationError("User not found");
      }
      req.user = user;
      next();
    } catch (error: any) {
      throw new AuthenticationError(error.message);
    }
  }
);

export { AuthenticateJWT };
