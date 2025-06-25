import cron from "node-cron";
import Medicine from "../models/Medication.js";
import { sendReminder } from "../utils/sendReminder.js";
import User from "../models/User.js";

const checkMedicineReminders = async () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

  const medicines = await Medicine.find({ reminderTime: currentTime }).populate({
    path: "patient",
    populate: { path: "user" },
  });

  for (const medicine of medicines) {
    const email = medicine.patient?.user?.email;
    if (email) {
      await sendReminder(
        email,
        "تنبيه بتناول الدواء",
        `مرحبًا! هذا تذكير بتناول دوائك: ${medicine.name} (${medicine.dosage}) الآن.`
      );
    }
  }
};

// ⏰ كل دقيقة
cron.schedule("* * * * *", () => {
  checkMedicineReminders();
});
