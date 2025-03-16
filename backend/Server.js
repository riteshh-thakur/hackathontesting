import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import doctorRoutes from "./routes/mainRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import connectDB from "./Models/db.js";
import airouter from './Routes/ai.routes.js';
import chatrouter from "./Routes/chat.routes.js";
import chat from "./Models/Chat.model.js";
import messagerouter from "./Routes/message.routes.js";
 
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();
const server = createServer(app); // Create HTTP server instance
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

const io = new Server(server, { // Use the HTTP server instance here
  cors: {
      origin: '*',
  }
});

io.use(async (socket, next) => {
  try {
      const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
      const chatId = socket.handshake.query.chatid;
 
console.log("vvv",chatId);
console.log("sa");
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
          return next(new Error('Invalid chatId'));
      }
    
    
      socket.chat = await chat.findById(chatId);
    
      if (!token) {
          return next(new Error('Authentication error'));
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
          return next(new Error('Authentication error'));
      }

      console.log("as");
      socket.user = decoded;
      next();
  } catch (error) {
      next(error);
  }
});

io.on('connection', (socket) => {
  socket.roomId = socket.chat._id.toString();

  console.log('A user connected');

  socket.join(socket.roomId);

  socket.on('project-message', async (data) => {
    console.log("got",data);
    
      const message = data.message;
      socket.broadcast.to(socket.roomId).emit('project-message', data);
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
      socket.leave(socket.roomId);
  });
});

// API Routes
app.use("/api", doctorRoutes);
app.use("/api/auth", authRoutes);
app.use('/chat', chatrouter);
app.use('/ai', airouter);
app.use('/message',messagerouter);
const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
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
server.listen(PORT, () => { // Start the HTTP server instead of app
  console.log(`🚀 Server running on port ${PORT}`);
});