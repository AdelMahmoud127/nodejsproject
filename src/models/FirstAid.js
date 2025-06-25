import mongoose from "mongoose";

const firstAidSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "يرجى إدخال عنوان الإسعاف الأولي"],
    },
    description: {
      type: String,
      required: [true, "يرجى إدخال تفاصيل الإسعاف الأولي"],
    },
    category: {
      type: String,
      enum: ["صرع", "إغماء", "حروق", "نزيف", "إصابات أخرى"],
      required: true,
    },
  },
  { timestamps: true }
);

const FirstAid = mongoose.model("FirstAid", firstAidSchema);

export default FirstAid;
