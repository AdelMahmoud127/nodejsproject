import Treatment from "../models/Treatment.js";

// ✅ إضافة علاج جديد
export const createTreatment = async (req, res) => {
  try {
    const { patientId, medicineName, dosage, time, notes } = req.body;

    if (!patientId || !medicineName || !dosage || !time) {
      return res.status(400).json({ status: "error", message: "يرجى ملء جميع الحقول المطلوبة" });
    }

    const treatment = await Treatment.create({ patient: patientId, medicineName, dosage, time, notes });

    res.status(201).json({ status: "success", data: treatment });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ جلب جميع العلاجات الخاصة بمريض
export const getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({ patient: req.params.patientId });
    res.status(200).json({ status: "success", data: treatments });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ تعديل علاج
export const updateTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!treatment) {
      return res.status(404).json({ status: "error", message: "العلاج غير موجود" });
    }

    res.status(200).json({ status: "success", data: treatment });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ حذف علاج
export const deleteTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id);

    if (!treatment) {
      return res.status(404).json({ status: "error", message: "العلاج غير موجود" });
    }

    await treatment.deleteOne();

    res.status(200).json({ status: "success", message: "تم حذف العلاج بنجاح" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
