import { Router } from "express";
import { handleChatMesssage } from "../controllers/chat";

const router = Router();

router.post("/", handleChatMesssage);

export { router };
