


import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    licence: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;