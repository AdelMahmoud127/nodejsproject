// controllers/seizureController.js
import Seizure from "../models/Seizure.js";
import { generateAISuggestions } from "../utils/aiSuggestionEngine.js";

// ✅ إنشاء نوبة جديدة مع الموقع الجغرافي
export const createSeizure = async (req, res) => {
  try {
    const { patientId, seizureType, startTime, latitude, longitude } = req.body;

    if (!patientId || !seizureType || !startTime || !latitude || !longitude) {
      return res.status(400).json({ status: "error", message: "البيانات غير مكتملة" });
    }

    const newSeizure = await Seizure.create({
      patient: patientId,
      seizureType,
      startTime,
      location: { latitude, longitude },
    });

    await generateAISuggestions(newSeizure.patient);

    res.status(201).json({ status: "success", data: newSeizure });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};



// داخل createSeizure بعد تسجيل النوبة:
//await generateAISuggestions(seizure.patient);


// ✅ عرض كل النوبات لمريض معيّن
export const getSeizuresByPatient = async (req, res) => {
  try {
    const seizures = await Seizure.find({ patient: req.params.patientId }).sort({ timestamp: -1 });
    res.status(200).json({ status: "success", data: seizures });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ✅ تعديل نوبة
export const updateSeizure = async (req, res) => {
  try {
    const seizure = await Seizure.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!seizure) {
      return res.status(404).json({ status: "error", message: "النوبة غير موجودة" });
    }

    res.status(200).json({ status: "success", data: seizure });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ✅ حذف نوبة
export const deleteSeizure = async (req, res) => {
  try {
    const seizure = await Seizure.findByIdAndDelete(req.params.id);

    if (!seizure) {
      return res.status(404).json({ status: "error", message: "النوبة غير موجودة" });
    }

    res.status(200).json({ status: "success", message: "تم الحذف بنجاح" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};