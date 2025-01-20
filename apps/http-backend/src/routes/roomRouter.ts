import express, { Router } from "express";
import { createRoom, joinRoom } from "../controllers/roomController";
import { AuthenticateJWT } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/room/create", AuthenticateJWT, createRoom);
router.get("/room/:roomId", AuthenticateJWT, joinRoom);

export default router;
