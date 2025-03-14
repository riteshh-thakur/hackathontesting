// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["doctor", "patient", "admin"], required: true },
//     age: { type: Number, required: function () { return this.role === "patient"; } },
//     bloodGroup: { type: String, required: function () { return this.role === "patient"; } },
//     licenseNumber: { type: String, required: function () { return this.role === "doctor"; } },
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);


import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient", "doctor"], required: true },
    age: { type: Number },
    bloodGroup: { type: String },
    licenseNumber: { type: String } 
});

export const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
