import Doctor from "../models/doctorModel.js";

/**
 * Get all doctors
 */
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

/**
 * Get doctor by ID
 */
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};




// ✅ Add Doctor Controller
export const addDoctor = async (req, res) => {
  try {
      console.log("🔹 Received Data from Frontend:", req.body); // ✅ Debugging

      const { name, experience, licence, specialization } = req.body;

      // ✅ Check if all required fields are present
      if (!name || !experience || !licence || !specialization) {
          return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // ✅ Ensure correct data types (optional)
      // if (typeof experience !== "number") {
      //     return res.status(400).json({ success: false, message: "Experience must be a number" });
      // }

      const newDoctor = new Doctor({ name, experience, licence, specialization });
      await newDoctor.save();

      console.log("✅ Doctor added successfully:", newDoctor); // ✅ Debugging log
      res.status(201).json({ success: true, message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
      console.error("❌ Error in Backend:", error); // ✅ Debugging log
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * Update doctor details
 */
export const updateDoctor = async (req, res) => {
  try {
    const { name, experience, licence, specialization } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, experience, licence, specialization },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, data: doctor, message: "Doctor updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

/**
 * Delete a doctor
 */
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};




// DELETE a doctor by ID
// const deleteDoctor = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if the doctor exists
//     const doctor = await Doctor.findById(id);
//     if (!doctor) {
//       return res.status(404).json({ success: false, message: "Doctor not found" });
//     }

//     // Delete the doctor
//     await Doctor.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "Doctor deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting doctor:", error);
//     res.status(500).json({ success: false, message: "Server error", error });
//   }
// };

// module.exports = { deleteDoctor };





