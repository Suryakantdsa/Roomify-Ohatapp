import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { loginUserSchema, signupUserSchema } from "@repo/zod/src/userSchema";
import { fromZodError } from "@repo/zod/node_modules/zod-validation-error";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";
import { AuthenticationError } from "../middlewares/errorMiddleware";

const signinUser = async (req: Request, res: Response) => {
  try {
    const parsedData = signupUserSchema.safeParse(req.body);

    if (!parsedData.success) {
      //   console.log(parsedData.error);
      const validationError = fromZodError(parsedData.error);
      res.status(422).json({ message: validationError.toString() });
      return;
    }

    const { data } = parsedData;
    const user = await prismaClient.user.create({
      data: {
        email: data?.email,
        name: data?.name,
        password: await hashPassword(data?.password),
        avatar: data?.avatar,
      },
    });
    res.status(201).json({
      message: "user register sucessfully",
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (error: any) {
    res.status(411).json({
      message: "user already exist with this email",
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  try {
    const parsedData = loginUserSchema.safeParse(req.body);
    if (!parsedData.success) {
      const validationError = fromZodError(parsedData.error);
      res.status(422).json(validationError.toString());
    }

    const { data } = parsedData;
    const userDetails = await prismaClient.user.findFirst({
      where: {
        email: data?.email,
        password: data?.password,
      },
    });
    if (
      userDetails &&
      data?.password &&
      (await comparePassword(data?.password, userDetails.password))
    ) {
      const accessToken = generateToken(res, userDetails.id);
      res.status(201).json({
        accessToken,
        user: {
          ...userDetails,
          password: undefined,
        },
      });
    } else {
      res.status(401).json({ message: "User not found / password incorrect" });
    }
  } catch (error) {
    throw new AuthenticationError("Login failed");
  }
};

export { signinUser, loginUser };
