import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    name: {
      type: String,
      required: [true, "يرجى إدخال اسم الدواء"],
    },
    dosage: {
      type: String,
      required: [true, "يرجى إدخال الجرعة"],
    },
    frequency: {
      type: String,
      required: [true, "يرجى إدخال مواعيد الاستخدام"],
    },
    instructions: {
      type: String,
    },
  },
  { timestamps: true }
);

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;
