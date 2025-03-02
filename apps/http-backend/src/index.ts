import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import { errorHandler } from "./middlewares/errorMiddleware";
import { AuthenticateJWT } from "./middlewares/authMiddleware";
import router from "./routes";

interface UserBasicInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();
const PORT = process.env.PORT || "8000";
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.use("/api/v1", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
