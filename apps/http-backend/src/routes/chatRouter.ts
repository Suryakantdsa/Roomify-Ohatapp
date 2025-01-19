import express from "express";
import { getChats } from "../controllers/chatsController";

const router = express.Router();
router.get("/chats", getChats);

export { router };
