import express, { Router } from "express";
import {
  getChatMessages,
  getChats,
  sendMessage,
} from "../controllers/chatsController";
import { AuthenticateJWT } from "../middlewares/authMiddleware";

const router: Router = express.Router();
router.get("/chats", AuthenticateJWT, getChats);
router.get("/chat-messages/:roomId", AuthenticateJWT, getChatMessages);
router.post("/send-message", AuthenticateJWT, sendMessage);

export default router;
