import express, { Router } from "express";
import { createRoom } from "../controllers/roomController";
import { AuthenticateJWT } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/room/create", AuthenticateJWT, createRoom);

export default router;
