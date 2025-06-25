import AISuggestion from "../models/AISuggestion.js";

// ✅ جلب التوصيات الخاصة بمريض
export const getAISuggestions = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const suggestions = await AISuggestion.find({ patient: patientId }).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      data: suggestions,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
