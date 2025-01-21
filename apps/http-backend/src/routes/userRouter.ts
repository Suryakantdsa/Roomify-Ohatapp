import express, { Router } from "express";
import { getAllUser, getUser } from "../controllers/userController";
import { AuthenticateJWT } from "../middlewares/authMiddleware";
const router: Router = express.Router();
router.get("/user", AuthenticateJWT, getUser);
router.get("/all-user", AuthenticateJWT, getAllUser);

export default router;
