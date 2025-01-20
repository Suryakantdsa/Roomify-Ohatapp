import express, { Router } from "express";
import { getUser } from "../controllers/userController";
import { AuthenticateJWT } from "../middlewares/authMiddleware";
const router: Router = express.Router();
router.get("/user", AuthenticateJWT, getUser);

export default router;
