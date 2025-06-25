import express from "express";
import { getAISuggestions } from "../controllers/aiSuggestionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:patientId", protect, getAISuggestions);

export default router;
