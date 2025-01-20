import jwt from "jsonwebtoken";
import { Response } from "express";
import bcrypt from "bcryptjs";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const comparePassword = async (enterPassword: string, passowrd: string) => {
  return await bcrypt.compare(enterPassword, passowrd);
};

const generateToken = (res: Response, userId: number) => {
  const jwtSecret = process.env.JWT_SECRET || "surya@1qee";
  const token = jwt.sign(
    {
      userId,
    },
    jwtSecret,
    { expiresIn: "1h" }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  return token;
};

const clearCookies = (res: Response) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export { generateToken, clearCookies, hashPassword, comparePassword };
