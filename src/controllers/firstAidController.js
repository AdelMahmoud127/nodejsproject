import FirstAid from "../models/FirstAid.js";

// ✅ إنشاء إسعاف أولي جديد
export const createFirstAid = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ status: "error", message: "يرجى ملء جميع الحقول" });
    }

    const firstAid = await FirstAid.create({ title, description, category });

    res.status(201).json({ status: "success", data: firstAid });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ جلب جميع الإرشادات
export const getFirstAids = async (req, res) => {
  try {
    const firstAids = await FirstAid.find();
    res.status(200).json({ status: "success", data: firstAids });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ البحث عن إرشادات وفقًا للفئة
export const getFirstAidsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const firstAids = await FirstAid.find({ category });

    if (firstAids.length === 0) {
      return res.status(404).json({ status: "error", message: "لا توجد إرشادات لهذه الفئة" });
    }

    res.status(200).json({ status: "success", data: firstAids });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ تحديث إرشاد معين
export const updateFirstAid = async (req, res) => {
  try {
    const firstAid = await FirstAid.findById(req.params.id);

    if (!firstAid) {
      return res.status(404).json({ status: "error", message: "الإرشاد غير موجود" });
    }

    const updatedFirstAid = await FirstAid.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ status: "success", data: updatedFirstAid });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ حذف إرشاد معين
export const deleteFirstAid = async (req, res) => {
  try {
    const firstAid = await FirstAid.findById(req.params.id);

    if (!firstAid) {
      return res.status(404).json({ status: "error", message: "الإرشاد غير موجود" });
    }

    await firstAid.deleteOne();
    res.status(200).json({ status: "success", message: "تم حذف الإرشاد بنجاح" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
