//const Patient = require("../models/Patient");
import Patient from "../models/Patient.js"; // ✅ استخدم `import` مع `.js`

// ✅ إنشاء مريض جديد
const createPatient = async (req, res) => {
  try {
    const { name, age, gender, medicalHistory } = req.body;

    if (!name || !age || !gender || !medicalHistory) {
      return res.status(400).json({ status: "error", message: "يرجى ملء جميع الحقول" });
    }

    const patient = await Patient.create({
      user: req.user.id,
      name,
      age,
      gender,
      medicalHistory,
    });

    res.status(201).json({ status: "success", data: patient });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ جلب جميع المرضى للمستخدم المسجل
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ user: req.user.id });
    res.status(200).json({ status: "success", data: patients });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ تحديث بيانات مريض
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ status: "error", message: "المريض غير موجود" });
    }

    if (patient.user.toString() !== req.user.id) {
      return res.status(403).json({ status: "error", message: "ليس لديك الصلاحية لتعديل هذا المريض" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ status: "success", data: updatedPatient });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ حذف مريض
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ status: "error", message: "المريض غير موجود" });
    }

    if (patient.user.toString() !== req.user.id) {
      return res.status(403).json({ status: "error", message: "ليس لديك الصلاحية لحذف هذا المريض" });
    }

    await patient.deleteOne();
    res.status(200).json({ status: "success", message: "تم حذف المريض بنجاح" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

//module.exports = { createPatient, getPatients, updatePatient, deletePatient };
export { createPatient, getPatients, updatePatient, deletePatient };
