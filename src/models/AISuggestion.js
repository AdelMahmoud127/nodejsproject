import mongoose from "mongoose";

const aiSuggestionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    recommendationType: {
      type: String,
      enum: ["نصيحة عامة", "تنبيه خطر", "اقتراح متابعة"],
      default: "نصيحة عامة",
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const AISuggestion = mongoose.model("AISuggestion", aiSuggestionSchema);
export default AISuggestion;
