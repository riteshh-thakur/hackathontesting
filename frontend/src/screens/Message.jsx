import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';

function Message() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState(location.state?.name || "paras");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(location.state?.chatId || "");

  useEffect(() => {
    if (patientName) {
      setMessages([]);
    }
  }, [patientName]);

  useEffect(() => {
    if (!chatId.trim()) return; // Prevent socket initialization if chatId is empty

    const socket = initializeSocket(chatId);
    
    recievemessage("project-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.disconnect();
  }, [chatId]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender: "Doctor", // Adjust this if sender roles need to change dynamically
        name: "Doctor",
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      sendmessage("project-message", { chatId, message: newMessage }); // Corrected sendmessage
      setMessage("");
    }
  };

  return (
    <div>
      <div className="mt-5 max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100"
        >
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
          <h2 className="text-lg font-bold">{patientName}</h2>
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
            Suggest Prescription
          </button>
          <button className="ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">
            Suggest Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
