/*import dotenv from "dotenv";
dotenv.config();

//require("dotenv").config();
//const express = require("express");

import express from "express";

import "./config/db.js";

//const mongoose = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// الصفحة الرئيسية للتأكد أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("🚀 Epilepsy Care Backend is Running...");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
*/

/*


import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

//import "./config/db.js"; // تأكد أن `db.js` لا يحتوي على `module.exports`
import connectDB from "./config/db.js";
connectDB();

import cors from 'cors';
app.use(cors());


import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

//app.use("/api/users", require("./routes/userRoutes"));

//const patientRoutes = require("./routes/patientRoutes");
//app.use("/api/patients", patientRoutes);
import patientRoutes from "./routes/patientRoutes.js";
app.use("/api/patients", patientRoutes);


import medicationRoutes from "./routes/medicationRoutes.js";
app.use("/api/medications", medicationRoutes);

import scheduleMedicationReminders from "./services/reminderService.js";

import firstAidRoutes from "./routes/firstAidRoutes.js";
app.use("/api/first-aid", firstAidRoutes);

import chatRoutes from "./routes/chatRoutes.js";
app.use("/api/chat", chatRoutes);


import qrCodeRoutes from "./routes/qrCodeRoutes.js";
app.use("/api/qrcode", qrCodeRoutes);

import "./cronJobs/medicineReminder.js";


import locationRoutes from "./routes/locationRoutes.js";
app.use("/api/locations", locationRoutes);

import seizureRoutes from "./routes/seizureRoutes.js";
app.use("/api/seizures", seizureRoutes);

import aiSuggestionRoutes from "./routes/aiSuggestionRoutes.js";
app.use("/api/ai-suggestions", aiSuggestionRoutes);


// الصفحة الرئيسية للتأكد أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("🚀 Epilepsy Care Backend is Running...");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
scheduleMedicationReminders();
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
*/

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// تحميل البيئة وتشغيل قاعدة البيانات
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // بيفترض أن الفرونت شغال على بورت 3000
  credentials: true
}));
app.use(morgan("dev"));
app.use(helmet());

// المسارات
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import firstAidRoutes from "./routes/firstAidRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import qrCodeRoutes from "./routes/qrCodeRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import seizureRoutes from "./routes/seizureRoutes.js";
import aiSuggestionRoutes from "./routes/aiSuggestionRoutes.js";
import scheduleMedicationReminders from "./services/reminderService.js";

// استخدام المسارات
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/first-aid", firstAidRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/qrcode", qrCodeRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/seizures", seizureRoutes);
app.use("/api/ai-suggestions", aiSuggestionRoutes);

// Jobs
import "./cronJobs/medicineReminder.js";

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("🚀 Epilepsy Care Backend is Running...");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
scheduleMedicationReminders();
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
