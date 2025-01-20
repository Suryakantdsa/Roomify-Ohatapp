import express, { Router } from "express";
import {
  loginUser,
  logoutUser,
  signinUser,
} from "../controllers/authController";

const router: Router = express.Router();

router.post("/signin", signinUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
