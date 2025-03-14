import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';

function Message() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
  const [chatId, setChatId] = useState(location.state?.id || "");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Chat ID:", chatId);

    if (doctorName) {
      setMessages([]);
    }
  }, [doctorName]);

  useEffect(() => {
    if (!chatId) return; // Prevent initializing socket with an undefined chatId

    const socket = initializeSocket(chatId);
    
    // Use `recievemessage` for better message handling
    recievemessage("project-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => socket.disconnect();
  }, [chatId]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender: "Patient",
        name: "Patient",
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      sendmessage("project-message", newMessage); // Corrected the sendmessage function
      setMessage("");
    }
  };

  return (
    <div className="flex justify-end">
      <div className="mt-5 max-w-3xl w-full p-6 bg-gray-50 rounded-lg shadow-md">
        <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100">
          ⬅ Back
        </button>

        <div className="border-b pb-4 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold">{msg.name}</p>
              <p className="text-gray-700">{msg.text}</p>
              <p className="text-sm text-gray-500">{msg.time}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{doctorName}</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
            Video Call
          </button>
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
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              <MdSend />
            </button>
          </div>
        </div>

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
