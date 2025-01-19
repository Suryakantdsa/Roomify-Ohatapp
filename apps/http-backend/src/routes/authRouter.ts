import express from "express";
import { loginUser, signinUser } from "../controllers/authController";

const router = express.Router();

router.post("/signin", signinUser);
router.post("/login", loginUser);

export default router;
