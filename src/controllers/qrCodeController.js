import QRCode from "qrcode";
import Patient from "../models/Patient.js";

// ✅ توليد QR Code لمريض معين
export const generateQRCode = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ status: "error", message: "المريض غير موجود" });
    }

    // رابط البيانات التي سيتم تشفيرها داخل الـ QR Code
    const qrData = `https://yourwebsite.com/patient/${patient._id}`;

    // توليد QR Code
    const qrCode = await QRCode.toDataURL(qrData);

    // حفظ الـ QR Code في قاعدة البيانات
    patient.qrCode = qrCode;
    await patient.save();

    res.status(200).json({ status: "success", data: qrCode });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ استعراض بيانات مريض عبر QR Code
export const getPatientByQRCode = async (req, res) => {
  try {
    const { qrCode } = req.body;

    if (!qrCode) {
      return res.status(400).json({ status: "error", message: "يرجى إدخال كود QR صالح" });
    }

    // البحث عن المريض باستخدام الـ QR Code
    const patient = await Patient.findOne({ qrCode });

    if (!patient) {
      return res.status(404).json({ status: "error", message: "لا يوجد مريض مطابق" });
    }

    res.status(200).json({ status: "success", data: patient });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
