import express from "express";
import {
  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controller/doctorController.js";

const router = express.Router();


// Get all doctors
router.get("/doctors", getDoctors);

// Get a single doctor by ID
router.get("/:id", getDoctorById);

// Create a new doctor
router.post("/doctors", addDoctor); 

// Update an existing doctor by ID
router.put("/:id", updateDoctor);

// Delete a doctor by ID
router.delete("/doctors/:id", deleteDoctor);

export default router;



