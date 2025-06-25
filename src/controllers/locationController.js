// controllers/locationController.js
import Location from "../models/Location.js";

// ✅ حفظ موقع جديد
export const saveLocation = async (req, res) => {
  try {
    const { patientId, latitude, longitude } = req.body;

    if (!patientId || !latitude || !longitude) {
      return res.status(400).json({ status: "error", message: "البيانات غير مكتملة" });
    }

    const newLocation = await Location.create({
      patient: patientId,
      latitude,
      longitude,
    });

    res.status(201).json({ status: "success", data: newLocation });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ جلب المواقع الخاصة بمريض
export const getLocationsForPatient = async (req, res) => {
  try {
    const locations = await Location.find({ patient: req.params.patientId }).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: locations });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
