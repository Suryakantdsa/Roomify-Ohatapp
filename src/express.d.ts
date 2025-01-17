import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      userId: String; // Add user to the Request interface
    }
  }
}
