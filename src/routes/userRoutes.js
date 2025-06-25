/*const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

//module.exports = router;
*/
/*
import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js"; // تأكد من إضافة .js

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
*/
/*
const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ مثال لمسار محمي
router.get("/profile", protect, (req, res) => {
  res.json({ status: "success", user: req.user });
});

// ✅ مثال لمسار للمشرفين فقط
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ status: "success", message: "مرحبًا أيها المشرف!" });
});

module.exports = router;
*/
import express from "express";
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword, 
  verifyResetCodePassword 
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCodePassword);
router.post("/reset-password", resetPassword);
router.get("/profile", protect, (req, res) => {
  res.json({ status: "success", user: req.user });
});

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ status: "success", message: "مرحبًا أيها المشرف!" });
});

export default router; // استخدم export بدلاً من module.exports

