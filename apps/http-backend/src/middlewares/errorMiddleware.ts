import { Request, Response, NextFunction } from "express";
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof AuthenticationError) {
    console.log("herre");
    res.status(401).json({ message: `Unauthorized: ${err.message}` });
  } else {
    res.status(500).json({
      message: `Internal server error: ${err.message}`,
    });
  }
};

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export { errorHandler, AuthenticationError };
