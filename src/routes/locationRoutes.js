// routes/locationRoutes.js
import express from "express";
import { saveLocation, getLocationsForPatient } from "../controllers/locationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveLocation);
router.get("/:patientId", protect, getLocationsForPatient);

export default router;
