import express, { Router } from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/authController";

const router: Router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
