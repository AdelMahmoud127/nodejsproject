/*
const express = require("express");
const { createPatient, getPatients, updatePatient, deletePatient } = require("../controllers/patientController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPatient);
router.get("/", protect, getPatients);
router.put("/:id", protect, updatePatient);
router.delete("/:id", protect, deletePatient);

module.exports = router;

*/


import express from "express";
import { createPatient, getPatients, updatePatient, deletePatient } from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPatient);
router.get("/", protect, getPatients);
router.put("/:id", protect, updatePatient);
router.delete("/:id", protect, deletePatient);

// ✅ استخدم `export default router` بدلًا من `module.exports = router`
export default router;
