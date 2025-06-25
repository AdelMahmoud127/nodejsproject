import Medication from "../models/Medication.js";

// ✅ إنشاء دواء جديد
export const createMedication = async (req, res) => {
  try {
    const { patientId, name, dosage, frequency, instructions } = req.body;

    if (!patientId || !name || !dosage || !frequency) {
      return res.status(400).json({ status: "error", message: "يرجى ملء جميع الحقول" });
    }

    const medication = await Medication.create({
      patient: patientId,
      name,
      dosage,
      frequency,
      instructions,
    });

    res.status(201).json({ status: "success", data: medication });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ جلب جميع الأدوية لمريض معين
export const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ patient: req.params.patientId });
    res.status(200).json({ status: "success", data: medications });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ تحديث بيانات دواء
export const updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ status: "error", message: "الدواء غير موجود" });
    }

    const updatedMedication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ status: "success", data: updatedMedication });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ حذف دواء
export const deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ status: "error", message: "الدواء غير موجود" });
    }

    await medication.deleteOne();
    res.status(200).json({ status: "success", message: "تم حذف الدواء بنجاح" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
