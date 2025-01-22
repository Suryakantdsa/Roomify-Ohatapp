import jwt from "jsonwebtoken";

export function checkUserToken(token: string): string | null {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret);

    if (typeof decoded === "string") {
      return null;
    }
    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (error) {}

  return null;
}
