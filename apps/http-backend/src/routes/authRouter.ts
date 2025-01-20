import express, { Router } from "express";
import { loginUser, signinUser } from "../controllers/authController";

const router: Router = express.Router();

router.post("/signin", signinUser);
router.post("/login", loginUser);

export default router;
