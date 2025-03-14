// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import doctorRoutes from "../backend/routes/mainRoutes.js"; // Ensure the .js extension

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // app.use(express.json());
// // app.use(cors());

// // // API Routes
// // app.use("/api", doctorRoutes);

// // // Start Server
// // app.listen(PORT, () => { 
// //   console.log(`Server running on port ${PORT}`);
// // });


// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import doctorRoutes from "../backend/routes/mainRoutes.js"; // Ensure the .js extension

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Connection Error:", err));

// // API Routes
// app.use("/api", doctorRoutes);

// // Start Server
// app.listen(PORT, () => { 
//   console.log(`Server running on port ${PORT}`);
// });



// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect Database
// connectDB();

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import doctorRoutes from "./routes/mainRoutes.js"; 
// import authRoutes from "./Routes/authRoutes.js"; 
// import authMiddleware from "./middleware/authMiddleware.js";
// // import patientRoutes from "./Routes/PatientRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;
// const MONGO_URI = process.env.MONGO_URI;

// // Middleware
// app.use(express.json());
// app.use(cors());

// //Connect to MongoDB
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // API Routes
// app.use("/api", doctorRoutes);
// app.use("/api/auth", authRoutes);
// // app.use("/api/patient", patientRoutes);

// const router = express.Router();

// router.get("/profile", authMiddleware, async (req, res) => {
//   try {
//       // Ensure you have `req.user.id` from authentication middleware
//       const patient = await Patient.findById(req.user.id);
//       if (!patient) return res.status(404).json({ message: "Patient not found" });

//       res.json({
//           name: patient.name,
//           age: patient.age,
//           bloodGroup: patient.bloodGroup,
//       });
//   } catch (error) {
//       console.error("Error fetching patient profile:", error);
//       res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });



// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// // Start Server
// app.listen(PORT, () => { 
//   console.log(`🚀 Server running on port ${PORT}`);
// });



// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to DB
// connectDB();

// // Routes
// app.use("/api/auth", authRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import doctorRoutes from "./routes/mainRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import connectDB from "./Models/db.js";
// import patientRoutes from "./routes/PatientRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api", doctorRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/patient", patientRoutes);

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
      // Ensure you have `req.user.id` from authentication middleware
      const patient = await Patient.findById(req.user.id);
      if (!patient) return res.status(404).json({ message: "Patient not found" });

      res.json({
          name: patient.name,
          age: patient.age,
          bloodGroup: patient.bloodGroup,
      });
  } catch (error) {
      console.error("Error fetching patient profile:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => { 
  console.log(`🚀 Server running on port ${PORT}`);
});
