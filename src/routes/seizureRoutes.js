// routes/seizureRoutes.js
/*
import express from "express";
import { createSeizure } from "../controllers/seizureController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSeizure);
router.get("/:patientId", protect, getSeizuresByPatient);
router.put("/:id", protect, updateSeizure);
router.delete("/:id", protect, deleteSeizure);

export default router;
*/
// routes/seizureRoutes.js
import express from "express";
import { createSeizure, getSeizuresByPatient, updateSeizure, deleteSeizure } from "../controllers/seizureController.js";  // استيراد الدالة getSeizuresByPatient
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSeizure);
router.get("/:patientId", protect, getSeizuresByPatient);  // تأكد من أن هذه الدالة معرفة ومستوردة
router.put("/:id", protect, updateSeizure);
router.delete("/:id", protect, deleteSeizure);

export default router;
