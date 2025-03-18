import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';
import RatingComponent from './RatingComponent';

function Message() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
  const [chatId, setChatId] = useState(location.state?.id || "");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showRatingForm, setShowRatingForm] = useState(false);

  useEffect(() => {
    console.log("Chat ID:", chatId);

    if (doctorName) {
      setMessages([]);
    }
  }, [doctorName]);

  useEffect(() => {
    if (!chatId) return;

    const socket = initializeSocket(chatId);
    socket.emit("join-room", chatId); // Join the chat room

    recievemessage("project-message", (data) => {
      console.log("Received message:", data);  // Verify incoming data
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => socket.disconnect();
  }, [chatId]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        chatId,
        sender: "Patient",
        name: "Patient",
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      sendmessage("project-message", newMessage);
      setMessage("");
      setShowRatingForm(true); // Show rating form after sending a message
    }
  };

  return (
    <div className="ml-40 flex justify-center items-center min-h-screen bg-green-50">
      <div className="mt-5 max-w-3xl w-full p-6 bg-white rounded-2xl shadow-lg border border-green-300">
        <button
          onClick={() => navigate(-1)}
          className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100"
        >
          ⬅ Back
        </button>

        <div className="border-b pb-4 mb-4 max-h-60 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-md ${msg.sender === "Patient"
                ? "bg-green-100 text-right"
                : "bg-blue-100 text-left"}`
              }
            >
              <p className="font-semibold">{msg.name}</p>
              <p className="text-gray-700">{msg.text}</p>
              <p className="text-sm text-gray-500">{msg.time}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{doctorName}</h2>
        </div>

        <div>
          <label className="block font-semibold mb-1">Message Input Area</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="border rounded-md px-3 py-2 w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <MdSend />
            </button>
          </div>
        </div>

        {showRatingForm && (
          <div className="mt-4">
            <RatingComponent doctorName={doctorName} />
          </div>
        )}

        <div className="mt-4 text-right">
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md">
            Request Prescription
          </button>
          <button className="ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">
            Request Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
