// routes/chatRoutes.js
import express from "express";
import { chatBot } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, chatBot);

export default router;
