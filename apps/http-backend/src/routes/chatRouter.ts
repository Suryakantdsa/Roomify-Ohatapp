import express, { Router } from "express";
import { getChats } from "../controllers/chatsController";

const router: Router = express.Router();
router.get("/chats", getChats);

export { router };
