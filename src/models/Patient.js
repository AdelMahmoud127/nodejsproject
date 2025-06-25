/*
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "يرجى إدخال اسم المريض"],
    },
    age: {
      type: Number,
      required: [true, "يرجى إدخال عمر المريض"],
    },
    gender: {
      type: String,
      enum: ["ذكر", "أنثى"],
      required: true,
    },
    medicalHistory: {
      type: String,
      required: [true, "يرجى إدخال السجل الطبي"],
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

*/



import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "يرجى إدخال اسم المريض"],
    },
    age: {
      type: Number,
      required: [true, "يرجى إدخال عمر المريض"],
    },
    gender: {
      type: String,
      enum: ["ذكر", "أنثى"],
      required: true,
    },
    medicalHistory: {
      type: String,
      required: [true, "يرجى إدخال السجل الطبي"],
    },
    qrCode: {
        type: String, // سيتم تخزين رابط الـ QR Code هنا
      },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient; // ✅ استخدم `export default` بدلاً من `module.exports`
