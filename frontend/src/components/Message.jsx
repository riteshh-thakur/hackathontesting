import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';
import RatingComponent from './RatingComponent';

function Message() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showRatingButton, setShowRatingButton] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);

  useEffect(() => {
    console.log("Doctor Name:", doctorName);

    if (doctorName) {
      setMessages([]);
    }
  }, [doctorName]);

  useEffect(() => {
    const socket = initializeSocket(doctorName);

    recievemessage("project-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => socket.disconnect();
  }, [doctorName]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender: "Patient",
        name: "Patient",
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      sendmessage("project-message", newMessage);
      setMessage("");
      setShowRatingButton(true); // Show 'Give Rating' button after message is sent
    }
  };

  const renderMessageText = (text) => {
    const urlPattern = /(http:\/\/localhost:5173\/docdashboard\/room\/\w+)/g;
    return text.replace(urlPattern, (url) => `<a href="${url}" target="_blank" class="text-blue-500 underline">${url}</a>`);
  };

  return (
    <div className="flex justify-end bg-green-100 min-h-screen p-4">
      <div className="mt-5 max-w-3xl w-full p-6 bg-white rounded-2xl shadow-xl border border-green-300">
        <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-200">
          ⬅ Back
        </button>

        <div className="border-b pb-4 mb-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded-lg">
              <p className="font-semibold text-green-700">{msg.name}</p>
              <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: renderMessageText(msg.text) }}></p>
              <p className="text-sm text-gray-500 italic">{msg.time}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-green-700">{doctorName}</h2>
        </div>

        <div>
          <label className="block font-semibold text-green-700 mb-1">Message Input Area</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="border border-green-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              <MdSend />
            </button>
          </div>
        </div>

        {showRatingButton && !showRatingForm && (
          <div className="mt-5 text-center">
            <button
              onClick={() => setShowRatingForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Give Rating
            </button>
          </div>
        )}

        {showRatingForm && (
          <div className="mt-5">
            <RatingComponent doctorName={doctorName} />
          </div>
        )}

        <div className="mt-4 text-right space-x-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Add Attachment
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Request Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;