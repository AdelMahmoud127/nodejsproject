//const jwt = require("jsonwebtoken");
//const User = require("../models/User");
import jwt from "jsonwebtoken";
import User from "../models/User.js";



const protect = async (req, res, next) => {
  let token;

  // التحقق من وجود التوكن في الـ Header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // فك تشفير التوكن للحصول على بيانات المستخدم
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ status: "error", message: "غير مصرح لك بالوصول، التوكن غير صالح" });
    }
  }

  if (!token) {
    res.status(401).json({ status: "error", message: "غير مصرح لك بالوصول، لا يوجد توكن" });
  }
};

// التحقق من أن المستخدم هو "admin" فقط
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ status: "error", message: "غير مصرح لك، هذه الميزة مخصصة للمشرفين فقط" });
  }
};


//module.exports = { protect, adminOnly };
export { protect, adminOnly };


