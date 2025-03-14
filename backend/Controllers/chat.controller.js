import express from 'express';
import Chat from '../Models/Chat.model.js';
  

export const createChat = async (req, res, model) => {
    try {
        const userIdOne = req.user.id; 
        const userTwoName = req.query.user; 

        const userd = await model.findOne({ name: userTwoName });
        if (!userd) {
            return res.status(404).json({ message: "User not found" });
        }

        const userIdTwo = userd._id;

        if (!userIdOne || !userIdTwo) {
            console.log("User IDs missing:", userIdOne, userIdTwo);
            return res.status(400).json({ message: "User IDs are required" });
        }           

        const existingChat = await Chat.findOne({
            $or: [
                { userone: userIdOne, usertwo: userIdTwo },
                { userone: userIdTwo, usertwo: userIdOne }
            ]
        });

        if (existingChat) {
            return res.json({ chatId: existingChat._id });
        }

        const newChat = await Chat.create({
            users: [userIdOne, userIdTwo]
        });

        return res.json({ chatId: newChat._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
