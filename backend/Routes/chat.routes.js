import express from "express";
 import * as chat from '../Controllers/chat.controller.js'
//import * as authMiddleware from "../middleware/authMiddleware.js";
const chatrouter = express.Router();
//chatrouter.post("/chat",authMiddleware.gettoken,chat.createChat);
export default chatrouter;