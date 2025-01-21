import { prismaClient } from "@repo/db/client";
import { Response, Request } from "express";
import { AuthenticationError } from "../middlewares/errorMiddleware";

const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      res.status(401).json({
        message: "invalid accessToken",
      });
      return;
    }

    const userDetails = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });
    res.status(201).json(userDetails);
  } catch (error) {
    res.status(404).json({
      message: "user not found",
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUserDetails = await prismaClient.user.findMany({
      omit: {
        password: true,
      },
    });
    res.status(201).json(allUserDetails);
  } catch (error) {
    res.status(404).json({
      message: "user not found",
    });
  }
};

export { getUser, getAllUser };
