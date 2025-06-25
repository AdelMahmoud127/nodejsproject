import express from "express";
import { 
  createFirstAid, 
  getFirstAids, 
  getFirstAidsByCategory, 
  updateFirstAid, 
  deleteFirstAid 
} from "../controllers/firstAidController.js";

const router = express.Router();

router.post("/", createFirstAid);
router.get("/", getFirstAids);
router.get("/:category", getFirstAidsByCategory);
router.put("/:id", updateFirstAid);
router.delete("/:id", deleteFirstAid);

export default router;
