import AISuggestion from "../models/AISuggestion.js";
import Seizure from "../models/Seizure.js";

// ✅ دالة تحليل بيانات المريض وتوليد اقتراحات
export const generateAISuggestions = async (patientId) => {
  try {
    const seizures = await Seizure.find({ patient: patientId }).sort({ createdAt: -1 });

    if (!seizures || seizures.length === 0) return;

    // تحليل: عدد النوبات في آخر 3 أيام
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const recentSeizures = seizures.filter(seizure => new Date(seizure.createdAt) >= threeDaysAgo);

    // 🧠 1- النوبات زادت مؤخرًا
    if (recentSeizures.length >= 3) {
      await AISuggestion.create({
        patient: patientId,
        message: "📈 لاحظنا زيادة عدد النوبات في الأيام الأخيرة. ننصح بمراجعة الطبيب.",
        recommendationType: "تنبيه خطر",
      });
    }

    // 🧠 2- وقت النوبة ثابت تقريبًا كل يوم
    const times = recentSeizures.map(seizure => new Date(seizure.createdAt).getHours());
    const isSameTime = times.every((t) => Math.abs(t - times[0]) <= 2);

    if (isSameTime && times.length > 1) {
      await AISuggestion.create({
        patient: patientId,
        message: "🕒 نوباتك تحدث تقريبًا في نفس الوقت يوميًا. حاول تجنب المجهود أو التوتر قبل هذا الوقت.",
        recommendationType: "نصيحة عامة",
      });
    }

    // 🧠 3- نوبة طويلة المدة
    const longSeizure = seizures.find(s => s.duration >= 300); // أكثر من 5 دقائق
    if (longSeizure) {
      await AISuggestion.create({
        patient: patientId,
        message: "⏱️ نوبة واحدة على الأقل استمرت أكثر من 5 دقائق. هذا يستدعي مراجعة طبية عاجلة.",
        recommendationType: "تنبيه خطر",
      });
    }
  } catch (error) {
    console.error("فشل في توليد اقتراحات AI:", error.message);
  }
};
