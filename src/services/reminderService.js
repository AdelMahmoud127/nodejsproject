import cron from "node-cron";
import Medication from "../models/Medication.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js"; // دالة لإرسال البريد الإلكتروني

const scheduleMedicationReminders = () => {
  // جدولة التذكير كل ساعة
  cron.schedule("0 * * * *", async () => {
    console.log("🔔 تشغيل نظام التذكير بالأدوية...");

    try {
      const now = new Date();
      const medications = await Medication.find();

      for (const medication of medications) {
        const user = await User.findById(medication.patient.user);
        if (!user) continue;

        const message = `مرحبًا ${user.name}، حان وقت تناول دوائك: ${medication.name} (${medication.dosage}).`;

        // إرسال بريد إلكتروني للتذكير
        await sendEmail({
          to: user.email,
          subject: "🔔 تذكير بموعد الدواء",
          text: message,
        });

        console.log(`📩 تم إرسال تذكير إلى ${user.email}`);
      }
    } catch (error) {
      console.error("❌ خطأ في إرسال التذكيرات:", error);
    }
  });
};

export default scheduleMedicationReminders;
