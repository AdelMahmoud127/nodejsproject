import express from "express";
import { generateQRCode, getPatientByQRCode } from "../controllers/qrCodeController.js";

const router = express.Router();

router.post("/generate/:id", generateQRCode);
router.post("/scan", getPatientByQRCode);

export default router;
