// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import doctorRoutes from "../backend/routes/mainRoutes.js"; // Ensure the .js extension

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // API Routes
// app.use("/api", doctorRoutes);

// // Start Server
// app.listen(PORT, () => { 
//   console.log(`Server running on port ${PORT}`);
// });


import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import doctorRoutes from "../backend/routes/mainRoutes.js"; // Ensure the .js extension

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// API Routes
app.use("/api", doctorRoutes);

// Start Server
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});
